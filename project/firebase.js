import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

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

// Initialize Firebase
const app2 = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);