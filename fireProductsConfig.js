// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const fireProductConfig = {
//   apiKey: "AIzaSyD9HjLUdhy4K8QRdn6J53Wz6DnK52JXTUU",
//   authDomain: "narayanacharyastrologer.firebaseapp.com",
//   projectId: "narayanacharyastrologer",
//   storageBucket: "narayanacharyastrologer.firebasestorage.app",
//   messagingSenderId: "182859597008",
//   appId: "1:182859597008:web:74da9ace9546120c1f8ad5",
//   measurementId: "G-RK5C153KY6"
// };

// Initialize Firebase
// const allproducts = initializeApp(fireProductConfig);
// const analytics = getAnalytics(allproducts);

// fireProductsConfig.js
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const fireProductConfig = {
  apiKey: "AIzaSyD9HjLUdhy4K8QRdn6J53Wz6DnK52JXTUU",
  authDomain: "narayanacharyastrologer.firebaseapp.com",
  projectId: "narayanacharyastrologer",
  storageBucket: "narayanacharyastrologer.appspot.com",
  messagingSenderId: "182859597008",
  appId: "1:182859597008:web:74da9ace9546120c1f8ad5",
  measurementId: "G-RK5C153KY6",
};

// Check if Firebase app is already initialized for this config
// const productApp = getApps().find(app => app.name === "productApp")
//   ? getApp("productApp")
//   : initializeApp(fireProductConfig, "productApp");

// const db = getFirestore(productApp);

// export { productApp, db };

const productApp = getApps().some(app => app.name === "productApp")
  ? getApp("productApp")
  : initializeApp(fireProductConfig, "productApp");

const db = getFirestore(productApp);

export { productApp, db };