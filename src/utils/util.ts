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

const convertDate = (date: Date) => {
  const dayOfWeek = StaticVariables.daysOfWeek[date.getUTCDay()];
  const month = StaticVariables.monthsOfYear[date.getUTCMonth()];
  const dayOfMonth = date.getUTCDate();
  const hours = date.getUTCHours().toString().padStart(2, "0");
  const minutes = date.getUTCMinutes().toString().padStart(2, "0");
  const ampm = hours >= "12" ? "P.M." : "A.M.";

  return `${dayOfWeek}, ${month} ${dayOfMonth} • ${hours}:${minutes} ${ampm} `;
};

export default convertDate;
