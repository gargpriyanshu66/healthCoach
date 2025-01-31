// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage";
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD4HaX_k1OhRIcCsQXx5HY2fnPKdw_Clu4",
  authDomain: "healthcoach-d13f4.firebaseapp.com",
  projectId: "healthcoach-d13f4",
  storageBucket: "healthcoach-d13f4.appspot.com",
  messagingSenderId: "136360039908",
  appId: "1:136360039908:web:f9f0da94e571b5750863f1",
  measurementId: "G-CHKV6C39HP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app)
const db = getFirestore(app)
const storage = getStorage(app)
export { app, analytics, auth, db, storage }