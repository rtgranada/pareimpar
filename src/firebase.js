import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = initializeApp ({
  apiKey: "AIzaSyAZ557gyMzfAXsmIbT7Toc6I32-YT2hsVk",
    authDomain: "pareimpar-c724c.firebaseapp.com",
    projectId: "pareimpar-c724c",
    storageBucket: "pareimpar-c724c.appspot.com",
    messagingSenderId: "259806426801",
    appId: "1:259806426801:web:8d55f1f214394275425490",
    measurementId: "G-LYK72HZH7T"
});

// Initialize Firebase
export const auth = getAuth(firebaseConfig);
export const db = getFirestore(firebaseConfig)

