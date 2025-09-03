// client/report.js
import { db, storage, auth } from "./firebase.js";
import { collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-firestore.js";
import { ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-storage.js";

const form = document.getElementById("report-form");
const responseMessage = document.getElementById("response-message");

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const description = document.getElementById("description").value;
    const location = document.getElementById("location").value;
    const file = document.getElementById("image").files[0];

    try {
        let imageUrl = "";
        if (file) {
            const storageRef = ref(storage, `issues/${Date.now()}_${file.name}`);
            await uploadBytes(storageRef, file);
            imageUrl = await getDownloadURL(storageRef);
        }

        await addDoc(collection(db, "issues"), {
            description,
            location,
            imageUrl,
            status: "Pending",
            createdAt: serverTimestamp(),
            createdBy: localStorage.getItem("uid") || "anonymous"
        });

        responseMessage.textContent = "Report submitted successfully!";
        form.reset();
    } catch (err) {
        console.error(err);
        responseMessage.textContent = "Failed to submit report.";
    }
});

