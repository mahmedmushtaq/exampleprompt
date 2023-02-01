// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { GoogleAuthProvider, getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBEq0yOUg6Gj1Ko8c10UFDaZrg-yOTZzc0",
  authDomain: "exampleprompt-82e87.firebaseapp.com",
  projectId: "exampleprompt-82e87",
  storageBucket: "exampleprompt-82e87.appspot.com",
  messagingSenderId: "687350508917",
  appId: "1:687350508917:web:e0f991de945021cdba373c",
  measurementId: "G-20QCXCL5XE",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const db = getFirestore(app);
const provider = new GoogleAuthProvider();
const auth = getAuth();

export { db, provider, auth };
