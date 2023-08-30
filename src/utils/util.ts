import { Timestamp } from "firebase/firestore";
import { auth } from "../firebaseConfig";

export function getFirebaseUserID(): string | undefined {
  let id = auth.currentUser?.uid;
  return id;
}

export function getFirebaseUserIDOrEmpty(): string {
  let id = auth.currentUser?.uid;
  return id ? id : "";
}

/**
 * Returns a unique uid
 * TODO: I am not sure this is unique. Could use the GCP one instead
 * @returns
 */
export function uid() {
  return (performance.now().toString(36) + Math.random().toString(36)).replace(
    /\./g,
    ""
  );
}

export type daysOfWeekBrief =
  | "Sun"
  | "Mon"
  | "Tue"
  | "Wed"
  | "Thu"
  | "Fri"
  | "Sat";
export const daysOfWeekArray: daysOfWeekBrief[] = [
  "Sun",
  "Mon",
  "Tue",
  "Wed",
  "Thu",
  "Fri",
  "Sat",
];

export const eventDate = [
  "Today",
  "Tomorrow",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
]

function describeDate(eventDate: any) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const inTwoWeeks = new Date(today);
  inTwoWeeks.setDate(inTwoWeeks.getDate() + 14);

  eventDate = new Date(eventDate);
  eventDate.setHours(0, 0, 0, 0);

  if (eventDate.getTime() === tomorrow.getTime()) {
    return 'tomorrow';
  }

  if (eventDate > tomorrow && eventDate <= inTwoWeeks) {
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const dayString = daysOfWeek[eventDate.getDay()];

    if (eventDate.getTime() - today.getTime() <= 7 * 24 * 60 * 60 * 1000) {
      return dayString;
    }

    return 'Next ' + dayString;
  }

  // Format the date for dates beyond two weeks
  const day = String(eventDate.getDate()).padStart(2, '0');
  const month = String(eventDate.getMonth() + 1).padStart(2, '0');
  const year = eventDate.getFullYear();
  return `${day}/${month}/${year}`;
}

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
  let unicodeString = "";
  for (let i = 0; i < emoji.length; i+= 1) {
    if (i > 1) unicodeString += "-"
    if (i != 1) {
      unicodeString += emoji.codePointAt(i)?.toString(16).toUpperCase();
    }
  }
  return "https://openmoji.org/data/color/svg/" + unicodeString + ".svg"
}