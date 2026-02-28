import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "bd13ac6fe638c8c1015fc56ccdb4e56c",
  authDomain: "ecommerce-vanillajs.firebaseapp.com",
  projectId: "ecommerce-vanillajs",
  storageBucket: "ecommerce-vanillajs.appspot.com",
  messagingSenderId: "905106759312",
  appId: "1:905106759312:web:a3386bbc3a518cec218215",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
