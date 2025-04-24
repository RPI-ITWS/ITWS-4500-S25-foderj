import { initializeApp } from 'https://www.gstatic.com/firebasejs/11.4.0/firebase-app.js';
    import { signInAnonymously, getAuth, GoogleAuthProvider, signInWithPopup, getRedirectResult, signInWithRedirect } from 'https://www.gstatic.com/firebasejs/11.4.0/firebase-auth.js';
    import { getFirestore, addDoc, collection, serverTimestamp, query, orderBy, onSnapshot, doc } from 'https://www.gstatic.com/firebasejs/11.4.0/firebase-firestore.js';

    // Your Firebase config object
    const firebaseConfig = {
        apiKey: "AIzaSyBxPOJzh_bZNE9uW8xb7-2X4TVWN_ogXc0",
        authDomain: "team1-484aa.firebaseapp.com",
        projectId: "team1-484aa",
        storageBucket: "team1-484aa.firebasestorage.app",
        messagingSenderId: "915574774101",
        appId: "1:915574774101:web:193ab8b6575794bdb537dc",
        measurementId: "G-CSV7PB4XKQ"
    };

    const app = initializeApp(firebaseConfig);

    const auth = getAuth(app);
    const provider = new GoogleAuthProvider();
    const db = getFirestore(app);
  
    console.log(app.name);

    window.firebaseAuth = auth;
    window.firebaseProvider = provider;
    window.signInWithPopup = signInWithPopup; 
    window.signInWithRedirect = signInWithRedirect;
    window.getRedirectResult = getRedirectResult; 
    window.db = db;
    window.collection = collection;
    window.doc = doc;
    window.query = query;
    window.addDoc = addDoc;
    window.serverTimestamp = serverTimestamp;
    window.orderBy = orderBy;
    window.onSnapshot = onSnapshot;
    window.signInAnonymously = signInAnonymously;