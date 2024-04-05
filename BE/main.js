// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDI--wa2gXeIZMnj3uzrXKBOOL_27hQhm8",
  authDomain: "nha-xe-hanh-phuc.firebaseapp.com",
  databaseURL: "https://nha-xe-hanh-phuc-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "nha-xe-hanh-phuc",
  storageBucket: "nha-xe-hanh-phuc.appspot.com",
  messagingSenderId: "1035428250023",
  appId: "1:1035428250023:web:bfffbcfcf2cda58c793682",
  measurementId: "G-R79JGTRH6F"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);