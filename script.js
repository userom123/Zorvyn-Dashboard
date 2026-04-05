import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

import {
  getFirestore,
  setDoc,
  doc
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";


const firebaseConfig = {
  apiKey: "AIzaSyDvhd6hh0vlqDou4uqMIKoHezK88xT2QSs",
  authDomain: "zoryndashbord-financial.firebaseapp.com",
  projectId: "zoryndashbord-financial",
  storageBucket: "zoryndashbord-financial.firebasestorage.app",
  messagingSenderId: "503964490858",
  appId: "1:503964490858:web:620e070b0323be06e0be13",
  measurementId: "G-Z19ZXYQ878"
};
// ==============================

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);


// ===== SIGNUP =====
const signupBtn = document.getElementById("signupBtn");
if (signupBtn) {
  signupBtn.addEventListener("click", async () => {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
      const userCred = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCred.user;

      await setDoc(doc(db, "users", user.uid), {
        email: user.email,
        uid: user.uid
      });

      document.getElementById("msg").innerText = "Signup Successful";
    } catch (error) {
      document.getElementById("msg").innerText = error.message;
    }
  });
}


// ===== LOGIN =====
const loginBtn = document.getElementById("loginBtn");
if (loginBtn) {
  loginBtn.addEventListener("click", async () => {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
      await signInWithEmailAndPassword(auth, email, password);
      window.location.href = "index.html";
    } catch (error) {
      document.getElementById("msg").innerText = error.message;
    }
  });
}


// ===== GOOGLE LOGIN =====
const googleBtn = document.getElementById("googleBtn");
if (googleBtn) {
  googleBtn.addEventListener("click", async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      window.location.href = "login.html";
    } catch (error) {
      document.getElementById("msg").innerText = error.message;
    }
  });
}


// ===== FORGOT PASSWORD =====
const forgotBtn = document.getElementById("forgotBtn");
if (forgotBtn) {
  forgotBtn.addEventListener("click", async () => {
    const email = document.getElementById("email").value;
    try {
      await sendPasswordResetEmail(auth, email);
      document.getElementById("msg").innerText = "Password Reset Email Sent";
    } catch (error) {
      document.getElementById("msg").innerText = error.message;
    }
  });
}


// ===== LOGOUT =====
const logoutBtn = document.getElementById("logoutBtn");
if (logoutBtn) {
  logoutBtn.addEventListener("click", async () => {
    await signOut(auth);
    window.location.href = "login.html";
  });
}


// ===== SESSION CHECK =====
onAuthStateChanged(auth, (user) => {
  if (user) {
    if (document.getElementById("userEmail")) {
      document.getElementById("userEmail").innerText = "Logged in as: " + user.email;
    }
  } else {
    if (window.location.pathname.includes("login.html")) {
      window.location.href = "login.html";
    }
  }
});

// start gsap animations

gsap.from(".container",{
delay:0.4,
opacity:0,
duration: 0.9,
y: -20,
})
