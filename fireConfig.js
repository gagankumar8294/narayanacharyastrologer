import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const fireConfig = {
    apiKey: "AIzaSyDmzCydC5ELpweeyW2YXzkAIuwat1B3TEM",
    authDomain: "matrimonialdata-debb1.firebaseapp.com",
    projectId: "matrimonialdata-debb1",
    storageBucket: "matrimonialdata-debb1.firebasestorage.app",
    messagingSenderId: "1086934703817",
    appId: "1:1086934703817:web:ac675a14f554f7fc577718",
    measurementId: "G-8MJ9LK3Y9J"
};

// Check if Firebase apps are already initialized
const matrimonialDb = getApps().length === 0 ? initializeApp(fireConfig) : getApp(); // Get existing app or initialize a new one

const db = getFirestore(matrimonialDb);

export { matrimonialDb, db };


// import { initializeApp, getApps, getApp } from "firebase/app";
// import { getFirestore } from "firebase/firestore";

// const fireConfig = {
//   apiKey: "AIzaSyDmzXXXXX",
//   authDomain: "matrimonialdata.firebaseapp.com",
//   projectId: "matrimonialdata",
//   storageBucket: "matrimonialdata.appspot.com",
//   messagingSenderId: "1086934703817",
//   appId: "1:1086934703817:web:ac675a14f554f7fc577718",
//   measurementId: "G-8MJ9LK3Y9J",
// };

// // Check if Firebase app is already initialized for this config
// const matrimonialApp = getApps().find(app => app.name === "matrimonialApp")
//   ? getApp("matrimonialApp")
//   : initializeApp(fireConfig, "matrimonialApp");

// const db = getFirestore(matrimonialApp);

// export { matrimonialApp, db };
