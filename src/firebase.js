import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC7Y0-SbogUWbjbYp94STMDxSycFqw4J8A",
  authDomain: "kidopia-54aae.firebaseapp.com",
  projectId: "kidopia-54aae",
  storageBucket: "kidopia-54aae.firebasestorage.app",
  messagingSenderId: "545339197281",
  appId: "1:545339197281:web:a0be14612ab8eeda49a720"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);