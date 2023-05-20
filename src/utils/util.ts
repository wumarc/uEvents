// import { auth } from "../../firebaseConfig";

// export function getFirebaseUserID(): string | undefined {
//   let id = auth.currentUser?.uid;
//   return id;
// }

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
    "SUN",
    "MON",
    "TUE",
    "WED",
    "THU",
    "FRI",
    "SAT",
  ];
  static monthsOfYear: string[] = [
    "JAN",
    "FEB",
    "MAR",
    "APR",
    "MAY",
    "JUN",
    "JUL",
    "AUG",
    "SEP",
    "OCT",
    "NOV",
    "DEC",
  ];
}

const convertDate = (date: Date) => {
  const dayOfWeek = StaticVariables.daysOfWeek[date.getUTCDay()];
  const month = StaticVariables.monthsOfYear[date.getUTCMonth()];
  const dayOfMonth = date.getUTCDate();
  const hours = date.getUTCHours().toString().padStart(2, "0");
  const minutes = date.getUTCMinutes().toString().padStart(2, "0");

  return `${dayOfWeek}, ${month} ${dayOfMonth} • ${hours}:${minutes}`;
};

export default convertDate;
