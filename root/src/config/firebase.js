// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from 'firebase/auth'


const firebaseConfig = {
  apiKey: "AIzaSyBIFnE9a5XGHULxSfXgqdzvluNPSc-Wsic",
  authDomain: "listenhere-1bebf.firebaseapp.com",
  projectId: "listenhere-1bebf",
  storageBucket: "listenhere-1bebf.appspot.com",
  messagingSenderId: "404894424858",
  appId: "1:404894424858:web:bd3e2690bcf8349f2816a3",
  measurementId: "G-CHXGTREFE6"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const googleProvider = new GoogleAuthProvider()