// import { initializeApp, getApps, getApp } from "firebase/app";
// import { getFirestore } from "firebase/firestore";
// import { getStorage } from "firebase/storage";

// Firebase configuration for blog data
// const firebaseConfigBlogs = {
//   apiKey: "AIzaSyDKC2KCUP9OM8yRebstpKUsJoHktWDnHrI",
//   authDomain: "narayana-astrologer.firebaseapp.com",
//   projectId: "narayana-astrologer",
//   storageBucket: "narayana-astrologer.appspot.com",
//   messagingSenderId: "885505641811",
//   appId: "1:885505641811:web:b73c6a75041782f92325a6"
// };

// Firebase configuration for matrimonial data
// const firebaseConfigMatrimonial = {
//   apiKey: "AIzaSyDmzCydC5ELpweeyW2YXzkAIuwat1B3TEM",
//   authDomain: "matrimonialdata-debb1.firebaseapp.com",
//   projectId: "matrimonialdata-debb1",
//   storageBucket: "matrimonialdata-debb1.firebasestorage.app",
//   messagingSenderId: "1086934703817",
//   appId: "1:1086934703817:web:ac675a14f554f7fc577718",
//   measurementId: "G-8MJ9LK3Y9J"
// };

// Initialize Firebase apps
// const blogApp = getApps().find(app => app.name === 'blogApp') 
//   ? getApp('blogApp') 
//   : initializeApp(firebaseConfigBlogs, 'blogApp');

// const matrimonialApp = getApps().find(app => app.name === 'matrimonialApp') 
//   ? getApp('matrimonialApp') 
//   : initializeApp(firebaseConfigMatrimonial, 'matrimonialApp');


// // Get Firestore instances for each app
// const blogDb = getFirestore(blogApp);
// const matrimonialDb = getFirestore(matrimonialApp);

// // Get Storage instances for each app
// const blogStorage = getStorage(blogApp);
// const matrimonialStorage = getStorage(matrimonialApp);

// Exporting for usage in components
// export {
//   blogDb,
//   blogStorage,
//   matrimonialDb,
//   matrimonialStorage
// };

// import { initializeApp } from "firebase/app";
// import { getFirestore } from "firebase/firestore";
// import { getStorage } from "firebase/storage";

// const firebaseConfig = {
//   apiKey: "AIzaSyDKC2KCUP9OM8yRebstpKUsJoHktWDnHrI",
//   authDomain: "narayana-astrologer.firebaseapp.com",
//   projectId: "narayana-astrologer",
//   storageBucket: "narayana-astrologer.appspot.com",
//   messagingSenderId: "885505641811",
//   appId: "1:885505641811:web:b73c6a75041782f92325a6"
// };

// Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const db = getFirestore(app);
// const storage = getStorage(app);

// export { db, storage };

import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDKC2KCUP9OM8yRebstpKUsJoHktWDnHrI",
  authDomain: "narayana-astrologer.firebaseapp.com",
  projectId: "narayana-astrologer",
  storageBucket: "narayana-astrologer.appspot.com",
  messagingSenderId: "885505641811",
  appId: "1:885505641811:web:b73c6a75041782f92325a6"
};

// let app;
// if (!getApps().length) {
//   app = initializeApp(firebaseConfig);
// } else {
//   app = getApp();
// }

// Check if Firebase is already initialized
// const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

const db = getFirestore(app);
const storage = getStorage(app);

export { db, storage };
