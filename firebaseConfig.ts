import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getFunctions } from "firebase/functions";
import {
  API_KEY,
  AUTH_DOMAIN,
  PROJECT_ID,
  STORAGE_BUCKET,
  MESSAGING_SENDER_ID,
  APP_ID,
} from "@env";

// // Initialize Firebase
// export const firebaseConfig = {
//   apiKey: API_KEY,
//   authDomain: AUTH_DOMAIN,
//   projectId: PROJECT_ID,
//   storageBucket: STORAGE_BUCKET,
//   messagingSenderId: MESSAGING_SENDER_ID,
//   appId: APP_ID,
// };

const firebaseConfig = {
  apiKey: "AIzaSyDts2XvSO0IPgiQLjcPbDfndElj8JSNOrE",
  authDomain: "uevents-a9365.firebaseapp.com",
  projectId: "uevents-a9365",
  storageBucket: "uevents-a9365.appspot.com",
  messagingSenderId: "799088132023",
  appId: "1:799088132023:web:0ee1b80999fca685cd7232",
  measurementId: "G-ZFBY5Q68ZZ",
};

const firebase = initializeApp(firebaseConfig);

// export const auth = getAuth(firebase);
export const fireStore = getFirestore(firebase);
// export const functions = getFunctions(firebase);

export default firebase;
