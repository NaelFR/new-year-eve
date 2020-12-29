// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
import firebase from "firebase/app";

// Add the Firebase services that you want to use
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCVfFaRnrOo78K66KzgDi2pofuuIZ0520Y",
    authDomain: "new-year-eve-forfeit.firebaseapp.com",
    projectId: "new-year-eve-forfeit",
    storageBucket: "new-year-eve-forfeit.appspot.com",
    messagingSenderId: "191341746666",
    appId: "1:191341746666:web:16086531f63599d7057a93"
};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const googleProvider = new firebase.auth.GoogleAuthProvider();

export const db = firebase.firestore();