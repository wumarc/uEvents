import { Timestamp } from "firebase/firestore";
import { auth } from "../firebaseConfig";
import emojiUnicode from "emoji-unicode";
import { EventObject, recurrenceType } from "./model/EventObject";

export function getFirebaseUserID(): string | undefined {
  let id = auth.currentUser?.uid;
  return id;
}

export function getFirebaseUserIDOrEmpty(): string {
  let id = auth.currentUser?.uid;
  return id ? id : "";
}

export function isLogged(): boolean {
  return auth.currentUser != null;
}

/**
 * Returns a unique uid
 * TODO: I am not sure this is unique. Could use the GCP one instead
 * @returns
 */
export function uid() {
  return (performance.now().toString(36) + Math.random().toString(36)).replace(/\./g, "");
}

export type daysOfWeekBrief = "Sun" | "Mon" | "Tue" | "Wed" | "Thu" | "Fri" | "Sat";
export const daysOfWeekArray: daysOfWeekBrief[] = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export const eventDate = ["Today", "Tomorrow", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

export function toPrecision(value: number, precision: number) {
  let valueStr = value.toString();
  let final = "";
  let i = 0;
  for (let j = 0; j < valueStr.length; j++) {
    final += valueStr[j];
    i++;
  }
  for (; i < precision; i++) {
    final = "0" + final;
  }
  return final;
}

export function emojiUrl(emoji: string) {
  if (emoji == undefined) {
    return "";
  }
  let unicodeStringRaw = emojiUnicode(emoji) as string;
  if (unicodeStringRaw.length == 0) {
    return "";
  }
  if (unicodeStringRaw == undefined) {
    return "";
  }
  for (let i = 0; i < unicodeStringRaw.length; i++) {
    if (unicodeStringRaw[i] == " ") {
      // replace with "-"
      unicodeStringRaw = unicodeStringRaw.slice(0, i) + "-" + unicodeStringRaw.slice(i + 1);
    }
  }
  return "https://openmoji.org/data/color/svg/" + unicodeStringRaw.toUpperCase() + ".svg";
}

export function getNextDate(event: EventObject): [Date, Date, boolean] {
  let startDate = event.startTime.toDate();
  let endDate = (event.endTime ?? event.startTime).toDate();
  let hasEnd = event.endTime != undefined;
  let recurrenceType = event.recurrenceType;

  if (!recurrenceType) {
    return [startDate, endDate, hasEnd];
  }

  switch (recurrenceType) {
    case "None":
      return [startDate, endDate, hasEnd];
    case "Weekly":
      let today = new Date();
      let limit = event.recurrenceEnd?.toDate();
      let exceptions = event.recurrenceExceptions;

      while (endDate < today) {
        // Increment the start and end date by 7 days
        let startEpoch = startDate.getTime();
        let endEpoch = endDate.getTime();
        startDate = new Date(startEpoch + 7 * 24 * 60 * 60 * 1000);
        endDate = new Date(endEpoch + 7 * 24 * 60 * 60 * 1000);
      }

      // Check if the start date is an exception
      let flag = true;
      while (flag) flag = false;
      if (exceptions) {
        for (let i = 0; i < exceptions.length; i++) {
          let exception = (exceptions[i] as Timestamp).toDate();
          // Set exception time to startDate
          exception.setHours(startDate.getHours(), startDate.getMinutes(), startDate.getSeconds(), startDate.getMilliseconds());
          if (exception.getTime() == startDate.getTime()) {
            // Increment the start and end date by 7 days
            let startEpoch = startDate.getTime();
            let endEpoch = endDate.getTime();
            startDate = new Date(startEpoch + 7 * 24 * 60 * 60 * 1000);
            endDate = new Date(endEpoch + 7 * 24 * 60 * 60 * 1000);
            flag = true;
          }
        }
      }

      // Make sure today is not over limit
      if (limit) {
        limit = limit;
        limit.setHours(23, 59, 59, 999);
      }
      if (limit && endDate > limit) {
        // Return start date Epoch 0
        return [new Date(0), new Date(0), hasEnd];
      }

      // Return the right date
      return [startDate, endDate, hasEnd];
    default:
      console.error("Unsupported recurrence type: " + recurrenceType);
      return [startDate, endDate, hasEnd];
  }
}
