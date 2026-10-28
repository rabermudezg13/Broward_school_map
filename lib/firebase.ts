import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
const app = initializeApp({
  "apiKey": "AIzaSyAny5ehQ6D7-rEaRsKkjGGDNCHQjgp22Qc",
  "appId": "1:845878589326:web:48ed399d59bc16071116df",
  "authDomain": "subparty.firebaseapp.com",
  "databaseURL": "",
  "measurementId": "G-T7S2PRJRQF",
  "messagingSenderId": "845878589326",
  "projectId": "subparty",
  "storageBucket": "subparty.firebasestorage.app"
});
export const auth = getAuth(app);
export const db = getFirestore(app);
