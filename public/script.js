// Replace with your actual Firebase config
const firebaseConfig = {
    apiKey: "AIzaSyAg1kHsSGczfiFFWJwQd6wgP_f0m9tDZHs",
    authDomain: "im-cooked-660f7.firebaseapp.com",
    projectId: "im-cooked-660f7",
    storageBucket: "im-cooked-660f7.firebasestorage.app",
    messagingSenderId: "114194734668",
    appId: "1:114194734668:web:fcaa7032ac3a129473dee9",
    measurementId: "G-2TQP91K6V2"
  };  

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

console.log("Firebase connected successfully!");
