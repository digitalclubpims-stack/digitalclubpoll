// Firebase SDK Imports
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

// Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyCsuOcZ86B55VnOXQA4Pa3O03n2XQn1_Rk",
  authDomain: "pims-poll.firebaseapp.com",
  databaseURL: "https://pims-poll-default-rtdb.firebaseio.com",
  projectId: "pims-poll",
  storageBucket: "pims-poll.firebasestorage.app",
  messagingSenderId: "14637440444",
  appId: "1:14637440444:web:3444173f31a6c43a809fb9",
  measurementId: "G-FP42MFB2WR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Services
const auth = getAuth(app);
const db = getFirestore(app);

// Export Services
export { auth, db };
