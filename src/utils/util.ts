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

class StaticVariables {
  static daysOfWeek: string[] = [
    "Sunday",
    "Monday",
    "Tueday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  static monthsOfYear: string[] = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
}

export const convertDate = (date: Date) => {
  let dayOfWeek = StaticVariables.daysOfWeek[date.getDay()];
  let month = StaticVariables.monthsOfYear[date.getMonth()];
  let dayOfMonth = date.getDate();
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let ampm = hours >= 12 ? "pm" : "am";

  return `${dayOfWeek}, ${month} ${dayOfMonth} • ${hours}:${minutes} ${ampm} `;
};