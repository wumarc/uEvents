import { logEvent } from "firebase/analytics";
import Constants, { ExecutionEnvironment } from "expo-constants";
import { Platform } from "react-native";
import { analytics } from "../firebaseConfig";
import { getFirebaseUserID, getFirebaseUserIDOrEmpty } from "./util";

// `true` when running in Expo Go.
const isExpoGo = Constants.executionEnvironment === ExecutionEnvironment.StoreClient;

let analyticsModule: any;
if (!isExpoGo && Platform.OS != "web") {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  analyticsModule = require("@react-native-firebase/analytics").default;
}

type customLogParams = {
  eventId?: string;
  organizer?: string;
};

// Function to log an event
// Only works outside expo
export async function customLogEvent(event: string, param?: customLogParams) {
  let id = getFirebaseUserIDOrEmpty();
  if (id == "") {
    id = "anonymous";
  }

  if (Platform.OS === "web") {
    console.log("Analytics event (sending): ", event, "{id: " + id + "}");
    logEvent(analytics, event, { ...param, id: id });
  } else {
    if (isExpoGo) {
      console.log("Analytics event (won't send. not expo): ", event, "{id: " + id + "}");
    } else {
      console.log("Analytics event (sending): ", event, "{id: " + id + "}");
      await analyticsModule().logEvent(event, { ...param, id: id });
    }
  }
}
