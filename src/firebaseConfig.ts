import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics, logEvent } from "firebase/analytics";
import { getFunctions } from "firebase/functions";
import { getStorage } from "firebase/storage";
import Constants, { ExecutionEnvironment } from "expo-constants";
import { Platform } from "react-native";

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

// `true` when running in Expo Go.
const isExpoGo = Constants.executionEnvironment === ExecutionEnvironment.StoreClient;

let analyticsModule: any;
if (!isExpoGo) {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  analyticsModule = require("@react-native-firebase/analytics").default;
}

export const auth = getAuth(firebase);
export const fireStore = getFirestore(firebase);
export const storage = getStorage(firebase);
export const analytics = getAnalytics(firebase);
// export const functions = getFunctions(firebase);

export default firebase;

// Function to log an event
// Only works outside expo
export async function customLogEvent(event: string, id: string) {
  if (Platform.OS === "web") {
    logEvent(analytics, event, { id: id });
  } else {
    if (isExpoGo) {
      console.log("Analytics event (won't send. not expo): ", event, "{id: " + id + "}");
    } else {
      console.log("Analytics event (sending): ", event, "{id: " + id + "}");
      await analyticsModule().logEvent(event, { id: id });
    }
  }
}
