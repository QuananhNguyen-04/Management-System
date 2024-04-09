//! NEED EMAIL TO ACCESS THE DATABASE
//! DO NOT CLEAR ANOTHER'S DATA

//! DO XAI FREE NEN HINH NHU CHI TAO DUOC 1 CAI DATABASE THI PHAI =)))))

// Import the functions you need from the SDKs you need
const { initializeApp } = require("firebase/app");
const { getAnalytics } = require("firebase/analytics");
const { getDatabase } = require("firebase/database");
const { getDoc, setDoc, doc, addDoc, getFirestore, collection } = require("firebase/firestore");
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
let analytics; let firestore;
if (firebaseConfig?.projectId) {
    // Initialize Firebase
    app = initializeApp(firebaseConfig);

    // ERROR: window is not defined (cookies or similar), analytics is not supported
    if (app.name && typeof window !== 'undefined') {
        analytics = getAnalytics(app);
    }
}
const store = getFirestore();

// need async function to use await getDoc, or else synchronous will overload the output
const get = async function () {
    const cityRef = doc(store, 'users', 'Tam');

    const output = await getDoc(cityRef);
    console.log(output.data());
}

// const push = async function () {
//     await addDoc(doc(store, 'users', "Quan"))({
//         Age: 21, Job: "student"
//     });
// }

const push = async function () {
    const colRef = doc(store, 'users', 'Quan'); // Adjust the collection name
    try {
        await setDoc(colRef, { Age: 21, Job: 'student' });
        console.log('Document successfully written!');
    } catch (error) {
        console.error('Error adding document:', error);
    }
};

get();
push();