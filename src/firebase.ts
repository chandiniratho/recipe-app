// firebase.ts
import { initializeApp } from "firebase/app";
import { getFirestore, enableIndexedDbPersistence } from "firebase/firestore";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAzgWkJOp406feo_LG1hZlR3VkjPvEFrmg",
  authDomain: "recipe-app-776e8.firebaseapp.com",
  projectId: "recipe-app-776e8",
  storageBucket: "recipe-app-776e8.firebasestorage.app",
  messagingSenderId: "298978607920",
  appId: "1:298978607920:web:d121c022f86166ced67ef5",
  measurementId: "G-F9VECFFJM8",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Enable offline persistence (optional)
enableIndexedDbPersistence(db).catch((err) => {
  if (err.code === "failed-precondition") {
    console.log("Offline persistence is not allowed in multiple tabs.");
  } else if (err.code === "unimplemented") {
    console.log("Offline persistence is not supported by this browser.");
  }
});

export { db };
