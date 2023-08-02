// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBDtIEEWidJlohVndtDuqWicR5_VCIYpSk",
  authDomain: "car-rental-project-246ee.firebaseapp.com",
  projectId: "car-rental-project-246ee",
  storageBucket: "car-rental-project-246ee.appspot.com",
  messagingSenderId: "845241485062",
  appId: "1:845241485062:web:8f2c51f4373e85ca798087",
  measurementId: "G-5ZD4FJE10D",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Create a Firestore instance
const db = getFirestore(app);

export { app, db };
