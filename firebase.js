import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAvrek_lB_bSjUH3R6qxzcAZRkyc0bNltE",
  authDomain: "kenyan-trade--oscarian.firebaseapp.com",
  projectId: "kenyan-trade--oscarian",
  storageBucket: "kenyan-trade--oscarian.firebasestorage.app",
  messagingSenderId: "85470695350",
  appId: "1:85470695350:web:668a17252da0fac9347b17",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
