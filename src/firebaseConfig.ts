import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getFunctions } from "firebase/functions";
import { getStorage } from "firebase/storage";
import Constants, { ExecutionEnvironment } from "expo-constants";

// `true` when running in Expo Go.
const isExpoGo = Constants.executionEnvironment === ExecutionEnvironment.StoreClient;

let analytics: any;
if (!isExpoGo) {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  analytics = require("@react-native-firebase/analytics").default;
}

export async function logEvent(event: string, id: string) {
  if (isExpoGo) {
    console.log("Analytics event: ", event, "{id: " + id + "}");
  } else {
    await analytics().logEvent(event, { id: id });
  }
}

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

export const auth = getAuth(firebase);
export const fireStore = getFirestore(firebase);
export const storage = getStorage(firebase);
// export const analytics = getAnalytics(firebase);
// export const functions = getFunctions(firebase);

export default firebase;
