// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBZfNhhlI0h-_LLHtHR1uHHWIuWdtx8WIA", 
  authDomain: "studybuddy-ed5b8.firebaseapp.com",
  projectId: "studybuddy-ed5b8",
  storageBucket: "studybuddy-ed5b8.appspot.com",
  messagingSenderId: "496915824091",
  appId: "1:496915824091:web:2ff55633eaa69c88743bfe",
  measurementId: "G-4PKCGY7032"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Set up auth and provider
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };
