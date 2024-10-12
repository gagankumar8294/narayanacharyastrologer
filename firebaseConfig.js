import { initializeApp } from "firebase/app";
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

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);


export { db, storage };
