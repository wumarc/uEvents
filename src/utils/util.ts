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
