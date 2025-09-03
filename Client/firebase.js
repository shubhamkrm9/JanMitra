// client/firebase.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-firestore.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-storage.js";

const firebaseConfig = {
    apiKey: "AIzaSyBHhDWIT1-mFn-pFZoABXw3qzR4iF2dXfo",
    authDomain: "janmitra-b2b0b.firebaseapp.com",
    projectId: "janmitra-b2b0b",
    storageBucket: "janmitra-b2b0b.appspot.com",
    messagingSenderId: "1048437663470",
    appId: "1:1048437663470:web:7e4e9da0e9d7616f6fb5ff",
    measurementId: "G-MSY0BBZX1G"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };
