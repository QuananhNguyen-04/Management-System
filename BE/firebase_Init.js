//! NEED EMAIL TO ACCESS THE DATABASE
//! DO NOT CLEAR ANOTHER'S DATA

//! DO XAI FREE NEN HINH NHU CHI TAO DUOC 1 CAI DATABASE THI PHAI =)))))

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAFfRTomodMfFqP3JkXPTu34W3vYnKwtmY",
    authDomain: "nha-xe-hanh-phuc-ltnc.firebaseapp.com",
    databaseURL:"https://nha-xe-hanh-phuc-ltnc-default-rtdb.asia-southeast1.firebasedatabase.app/",
    projectId: "nha-xe-hanh-phuc-ltnc",
    storageBucket: "nha-xe-hanh-phuc-ltnc.appspot.com",
    messagingSenderId: "260388398077",
    appId: "1:260388398077:web:2d2149e08a20947333af94",
    measurementId: "G-ZF1G64YNDE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const database = getDatabase(app);

