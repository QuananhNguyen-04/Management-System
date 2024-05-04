//! NEED EMAIL TO ACCESS THE DATABASE
//! DO NOT CLEAR ANOTHER'S DATA


// Import the functions you need from the SDKs you need
import { initializeApp }
    from "https://www.gstatic.com/firebasejs/10.10.0/firebase-app.js";
import { getAnalytics }
    from "https://www.gstatic.com/firebasejs/10.10.0/firebase-analytics.js";
// import { getDatabase } from "";
import { getDocs, getDoc, setDoc, doc, addDoc, getFirestore, collection, Timestamp }
    from "https://www.gstatic.com/firebasejs/10.10.0/firebase-firestore.js"; 
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, sendPasswordResetEmail, updatePassword }
    from "https://www.gstatic.com/firebasejs/10.10.0/firebase-auth.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAFfRTomodMfFqP3JkXPTu34W3vYnKwtmY",
    authDomain: "nha-xe-hanh-phuc-ltnc.firebaseapp.com",
    databaseURL: "https://nha-xe-hanh-phuc-ltnc-default-rtdb.asia-southeast1.firebasedatabase.app/",
    projectId: "nha-xe-hanh-phuc-ltnc",
    storageBucket: "nha-xe-hanh-phuc-ltnc.appspot.com",
    messagingSenderId: "260388398077",
    appId: "1:260388398077:web:2d2149e08a20947333af94",
    measurementId: "G-ZF1G64YNDE"
};

// Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
// TODO: do the export for firestore, app, ... and hide the config
var app;
let analytics;
let firestore;
if (firebaseConfig?.projectId) {
    // Initialize Firebase
    app = initializeApp(firebaseConfig);

    // ERROR: window is not defined (cookies or similar), analytics is not supported
    if (app.name && typeof window !== 'undefined') {
        analytics = getAnalytics(app);
    }
}
const db = getFirestore();
const auth = getAuth();
//!//////////////////////////////////////////////////////////////////////////////////
// DO NOT CHANGE THE CODE ABOVE
//!//////////////////////////////////////////////////////////////////////////////////


// need async function to use await getDoc, or else synchronous will overload the output

//Example functions, use node "file_add" to run


const get = async function () {
    const cityRef = doc(db, 'users', 'Tam');

    const output = await getDoc(cityRef);
    console.log(output.data());
}

// const push = async function () {
//     await addDoc(doc(store, 'users', "Quan"))({
//         Age: 21, Job: "student"
//     });
// }

const push = async function () {
    const colRef = doc(db, 'users', 'Quan'); // Adjust the collection name
    try {
        await setDoc(colRef, { Age: 21, Job: 'student' });
        console.log('Document successfully written!');
    } catch (error) {
        console.error('Error adding document:', error);
    }
};

// get();
// temp();
export default { db };
export { db, auth, signInWithEmailAndPassword, updatePassword,
    createUserWithEmailAndPassword, sendPasswordResetEmail, setDoc, getDoc, doc,
    Timestamp };
// push();