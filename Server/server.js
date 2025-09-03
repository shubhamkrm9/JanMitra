// Server/server.js
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

// Fix __dirname in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

let reports = [];

// 1. Serve static files
app.use(express.static(path.join(__dirname, "../Client")));

app.use(cors());
app.use(bodyParser.json());

// 2. Serve index.html at root
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../Client/login.html"));
});

app.get("/new-issue",(req,res)=>{
  res.sendFile(path.join(__dirname, "../Client/report.html"));
})

app.get("/user",(req,res)=>{
  res.sendFile(path.join(__dirname, "../Client/userui.html"));
})
// 3. Start server
const PORT = 3000;
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT})`));