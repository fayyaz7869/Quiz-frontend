// src/auth/firebase.js

import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyAUfAfnS89vKP0O7MSUZa8siGZ3qmwQPFE",
  authDomain: "quiz-app-422a0.firebaseapp.com",
  projectId: "quiz-app-422a0",
  storageBucket: "quiz-app-422a0.firebasestorage.app",
  messagingSenderId: "751422319032",
  appId: "1:751422319032:web:dca492d5a7575d4e82474d"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const googleProvider = new GoogleAuthProvider();
