// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import {getAuth} from "firebase/auth"
import {getFirestore} from "firebase/firestore"
const firebaseConfig = {
  apiKey: "AIzaSyA6P7BCF7cDxdYKD7vWFv2emdFph83sL-0",
  authDomain: "trial-67894.firebaseapp.com",
  projectId: "trial-67894",
  storageBucket: "trial-67894.appspot.com",
  messagingSenderId: "778171999965",
  appId: "1:778171999965:web:2cb17f82c4a64fdfa25d34",
  measurementId: "G-0XRXXRY84W"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = getFirestore(app)