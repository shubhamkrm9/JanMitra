import { db } from './firebase.js';
import { collection, getDocs } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-firestore.js";

const reportsList = document.getElementById('reports-list');

async function fetchReports() {
    const snapshot = await getDocs(collection(db, "issues"));
    snapshot.forEach(doc => {
        const data = doc.data();
        const div = document.createElement('div');
        div.style.border = '1px solid #ccc';
        div.style.padding = '10px';
        div.style.margin = '10px 0';
        div.innerHTML = `
            <strong>Description:</strong> ${data.description} <br>
            <strong>Location:</strong> ${data.location} <br>
            <strong>Status:</strong> ${data.status} <br>
            ${data.imageUrl ? `<img src="${data.imageUrl}" width="150">` : ''}
        `;
        reportsList.appendChild(div);
    });
}

fetchReports();
