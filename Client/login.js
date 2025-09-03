// client/login.js
import { auth } from "./firebase.js";
import { GoogleAuthProvider, signInWithPopup, signOut } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-auth.js";

const loginBtn = document.getElementById("google-login");
const userInfo = document.getElementById("user-info");

loginBtn.addEventListener("click", async () => {
    const provider = new GoogleAuthProvider();
    try {
        const result = await signInWithPopup(auth, provider);
        const user = result.user;
        userInfo.textContent = `Logged in as: ${user.displayName}`;
        // Save UID to localStorage to use later for reporting/admin
        localStorage.setItem("uid", user.uid);
    } catch (err) {
        console.error(err);
        userInfo.textContent = "Login failed!";
    }
});
