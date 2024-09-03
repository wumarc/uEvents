import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "",
  authDomain: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: "",
  measurementId: "",
};

const firebase = initializeApp(firebaseConfig);

export const auth = getAuth(firebase);
export const fireStore = getFirestore(firebase);
export const storage = getStorage(firebase);
export const analytics = getAnalytics(firebase);
// export const functions = getFunctions(firebase);

export default firebase;
