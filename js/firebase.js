// ======================================================
// PIMS DIGITAL CLUB POLL SYSTEM
// Firebase Configuration & Global Services
// Version 1.0 (Final)
// ======================================================

import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";

import {
    getAuth,
    setPersistence,
    browserLocalPersistence,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signOut
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";

import {
    getFirestore
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

import {
    getStorage
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-storage.js";

import {
    getDatabase
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-database.js";



// ======================================================
// FIREBASE CONFIGURATION
// ======================================================

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


// ======================================================
// INITIALIZE FIREBASE
// ======================================================

export const app = initializeApp(firebaseConfig);


// ======================================================
// SERVICES
// ======================================================

export const auth = getAuth(app);

export const db = getFirestore(app);

export const storage = getStorage(app);

export const rtdb = getDatabase(app);


// ======================================================
// KEEP USER LOGGED IN
// ======================================================

await setPersistence(
    auth,
    browserLocalPersistence
);


// ======================================================
// LOGIN
// ======================================================

export async function login(email, password) {

    return await signInWithEmailAndPassword(
        auth,
        email,
        password
    );

}


// ======================================================
// LOGOUT
// ======================================================

export async function logout() {

    return await signOut(auth);

}


// ======================================================
// CURRENT USER
// ======================================================

export function getCurrentUser() {

    return auth.currentUser;

}


// ======================================================
// AUTH LISTENER
// ======================================================

export function onUserChanged(callback) {

    return onAuthStateChanged(
        auth,
        callback
    );

}


// ======================================================
// REQUIRE LOGIN
// Redirects to login page if user is not authenticated
// ======================================================

export function requireManagerAuth() {

    onAuthStateChanged(auth, user => {

        if (!user) {

            window.location.replace("../login.html");

        }

    });

}


// ======================================================
// REQUIRE GUEST
// Redirects logged-in manager to dashboard
// Used on login page
// ======================================================

export function requireGuest() {

    onAuthStateChanged(auth, user => {

        if (user) {

            window.location.replace("manager/dashboard.html");

        }

    });

}


// ======================================================
// USER DISPLAY NAME
// ======================================================

export function getUserName() {

    if (!auth.currentUser) {

        return "";

    }

    return auth.currentUser.displayName
        || auth.currentUser.email
        || "";

}


// ======================================================
// USER EMAIL
// ======================================================

export function getUserEmail() {

    if (!auth.currentUser) {

        return "";

    }

    return auth.currentUser.email;

}


// ======================================================
// USER UID
// ======================================================

export function getUserUID() {

    if (!auth.currentUser) {

        return "";

    }

    return auth.currentUser.uid;

}


// ======================================================
// USER LOGGED IN?
// ======================================================

export function isLoggedIn() {

    return auth.currentUser !== null;

}


// ======================================================
// EXPORT DEFAULT
// ======================================================

export default app;
