// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// import { getAuth, GoogleAuthProvider } from "firebase/auth";
// import { getFirestore } from "firebase/firestore";
import { initializeApp } from 'https://www.gstatic.com/firebasejs/11.4.0/firebase-app.js';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'https://www.gstatic.com/firebasejs/11.4.0/firebase-auth.js';
import { getFirestore } from 'https://www.gstatic.com/firebasejs/11.4.0/firebase-firestore.js';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBxPOJzh_bZNE9uW8xb7-2X4TVWN_ogXc0",
  authDomain: "team1-484aa.firebaseapp.com",
  projectId: "team1-484aa",
  storageBucket: "team1-484aa.firebasestorage.app",
  messagingSenderId: "915574774101",
  appId: "1:915574774101:web:193ab8b6575794bdb537dc",
  measurementId: "G-CSV7PB4XKQ"
};

//const defaultProject = firebase.initializeApp(firebaseConfig);

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const firestore = getFirestore(app);

console.log(app.name);



// Initialize Firebase
// const app = initializeApp(firebaseConfig);
// export const auth = getAuth(app);
// export const provider = GoogleAuthProvider(app);
//export const db = getFirestore(app);