import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBCyqXSL_e1EjLTZorrh6NKnaD9g6FwOk8",
  authDomain: "myodogrulama1.firebaseapp.com",
  projectId: "myodogrulama1",
  storageBucket: "myodogrulama1.firebasestorage.app",
  messagingSenderId: "836238037089",
  appId: "1:836238037089:web:72c3cd0d133660d10d9a20",
  measurementId: "G-V9WH1YRCP6"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider(); 