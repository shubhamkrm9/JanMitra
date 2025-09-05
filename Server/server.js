// server.js (replace your existing file with this)
// Enhanced to accept JSON payloads (including photo.dataUrl base64) and store in in-memory `reports` array.

import express from "express";
import cors from "cors";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// ----------------- Middleware (must be before routes) -----------------
app.use(cors());
// parse JSON bodies (includes large base64 images if present)
app.use(express.json({ limit: "20mb" }));
app.use(express.urlencoded({ extended: true, limit: "20mb" }));

// Serve client static files (keep the location you already used)
app.use(express.static(path.join(__dirname, "../Client")));

// ----------------- Simple in-memory store -----------------
let reports = [
  { id: 1, title: "Pothole in Ward 5", description: "Large pothole near market", status: "New", location: { lat: 23.61, lng: 85.28 }, createdAt: new Date().toISOString() },
  { id: 2, title: "Broken Streetlight", description: "Lamp not working at main road", status: "In Progress", location: { lat: 23.615, lng: 85.285 }, createdAt: new Date().toISOString() },
];
let nextId = reports.length + 1;

// ----------------- Uploads folder (for saving base64 images) -----------------
const UPLOADS_DIR = path.join(__dirname, "../uploads");
if (!fs.existsSync(UPLOADS_DIR)) fs.mkdirSync(UPLOADS_DIR, { recursive: true });
// serve saved uploads
app.use("/uploads", express.static(UPLOADS_DIR));

// ----------------- Helper -----------------
function saveDataUrlToFile(dataUrl, filenameHint = "img") {
  if (!dataUrl || typeof dataUrl !== "string") return null;
  const matches = dataUrl.match(/^data:(.+?);base64,(.+)$/);
  if (!matches) return null;
  const mime = matches[1];
  const b64 = matches[2];
  const ext = mime.split("/")[1] || "bin";
  const filename = `${Date.now()}-${filenameHint.replace(/[^a-z0-9._-]/gi, "_")}.${ext}`;
  const filepath = path.join(UPLOADS_DIR, filename);
  fs.writeFileSync(filepath, Buffer.from(b64, "base64"));
  return `/uploads/${filename}`;
}

// ----------------- Unified handler -----------------
async function handleReportCreate(req, res) {
  try {
    // Accept either JSON body or URL-encoded fields.
    // Expected JSON shape from your form:
    // { title, description, location, lat, lng, address, photo: { filename, type, dataUrl } }
    const body = req.body || {};
    const title = body.title;
    const description = body.description;
    let location = body.location; // may be object or string
    const lat = body.lat;
    const lng = body.lng;
    const address = body.address;

    // If location is provided as JSON-string, try parse
    if (typeof location === "string") {
      try { location = JSON.parse(location); } catch (e) { /* leave it as string */ }
    }

    // If lat/lng provided, ensure location object
    if ((!location || typeof location === "string") && lat && lng) {
      location = { lat: Number(lat), lng: Number(lng) };
    }

    // Basic validation
    if (!title || !description || !location) {
      return res.status(400).json({ message: "Title, description and location are required." });
    }

    // If photo was included as base64 in body.photo.dataUrl -> save and set photoUrl
    let photoUrl = null;
    if (body.photo && body.photo.dataUrl) {
      const saved = saveDataUrlToFile(body.photo.dataUrl, body.photo.filename || "img");
      if (saved) photoUrl = saved;
    }

    const newReport = {
      id: nextId++,
      title,
      description,
      location,
      address: address || (typeof location === "string" ? location : undefined),
      photoUrl,
      status: "New",
      createdAt: new Date().toISOString(),
    };

    reports.push(newReport);
    console.log("New report added:", newReport);
    console.log("All reports:", reports);

    return res.status(201).json({ message: "Report received successfully!", report: newReport });
  } catch (err) {
    console.error("Error creating report:", err);
    return res.status(500).json({ message: "Server error" });
  }
}

// ----------------- Routes -----------------

// Keep your existing POST /api/reports but now it will receive JSON correctly
app.post("/api/reports", handleReportCreate);

// Also accept POST /api/reports-json as alias (your frontend can post to either)
app.post("/api/reports-json", handleReportCreate);

// GET all reports (for the frontend to fetch and show)
app.get("/api/reports", (req, res) => {
  res.json(reports);
});

// Keep your existing app.get routes for client pages
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../Client/login.html"));
});
app.get("/user", (req, res) => {
  res.sendFile(path.join(__dirname, "../Client/userui.html"));
});

// ----------------- Start server -----------------
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
