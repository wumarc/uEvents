import { Timestamp } from "firebase/firestore";
import { daysOfWeekBrief, daysOfWeekArray } from "../util";

/// Event object
/// Optional fields are marked with a question mark. They can be undefined or empty to represent no value
export type EventObject = {
  // Unique id for each event
  id: string;

  // True if event is fake and intended only for admins
  // If this field is true, it does not guarantee that the event is fake. Only for reference
  // The true marker for fake events is where it is stored in the database. Either "events" or "events-test"
  fake: boolean;

  // Draft: Event is created but not submitted for approval. Pending: Event is submitted for approval. Published: Event is approved and published
  state: "Draft" | "Pending" | "Published" | "Rejected" | "Reported";

  rejectReason: string;

  // CHAR LIMIT: 35
  name: string;

  // If no max price is specified, this is the exact price
  priceMin: number;

  priceMax?: number;

  // CHAR LIMIT: 750
  description: string;

  // If empty: TBD. In case of on campus, this is the building name. Else, building name
  location?: string;

  // If empty: TBD. In case of on campus, this is the building address. Else, building address
  address?: string;

  // If empty: TBD. Optional
  roomNumber?: string;

  // This is not a good name, but too late to change now since it is in the database
  // If manually added, it means this field corresponds to the name of the organizer (not the id)
  // This option is deprecated.
  // If organizer added, it means this field corresponds to the id of the organizer (not the name)
  // To know if an event is manually added or organizer added, check the authentic field of the organizer
  organizerType: "Manually Added" | "Organizer Added";

  // If manually added, this is the name of the organizer. If organizer added, this is the id of the organizer
  organizer: string;

  startTime: Timestamp;

  // End time doesn't have to be specified
  // If Epoch time is 0, it means the event has no end time
  endTime?: Timestamp;

  // Not being used right now
  categories: string[];

  onCampus?: boolean | "TBD";

  images: string[];

  emoji: string;

  // If undefined, no sign up link
  signUpLink?: string;

  // TODO: Investigate why this is mandatory. Better document
  originalLink: string;

  recurrenceType: "None" | "Weekly" | "Custom Weekly" | "Specific Dates";

  // Only used for custom weekly
  recurrenceCustomDays?: daysOfWeekBrief[];

  // Only used for specific dates
  recurrenceCustomDates?: Timestamp[];

  // Used for all recurrence types
  recurrenceEnd?: Timestamp;

  // Used for all recurrence types
  recurrenceExceptions?: Timestamp[];

  // priceDescription?: string; // If needed, a description of the different prices
  // food?: string;
  // attire?: string;
  // toBring?: string;
  // includes?: string;
  // transportation?: string;
};

export type recurrenceType = "None" | "Weekly" | "Custom Weekly" | "Specific Dates";

export const recurrenceTypeArray: recurrenceType[] = ["None", "Weekly", "Custom Weekly", "Specific Dates"];

export class recurrence {
  type: recurrenceType;
  customDays?: daysOfWeekBrief[];
  customDates?: Timestamp[];
  end?: Timestamp; // If current > end, event is no longer recurring
  exceptions?: Timestamp[]; // If current in exceptions, event is not happening on that day

  constructor(type: recurrenceType, customDays?: daysOfWeekBrief[], customDates?: Timestamp[], end?: Timestamp) {
    this.type = type;
    this.customDays = customDays ?? [];
    this.customDates = customDates ?? [];
    this.end = end;
  }
}

export const daysToInt = (days: daysOfWeekBrief[]): number[] => {
  if (!days) {
    return [];
  }
  let intDays: number[] = [];
  for (let i = 0; i < days.length; i++) {
    intDays.push(daysOfWeekArray.indexOf(days[i] as daysOfWeekBrief));
  }
  return intDays;
};

export const nextStartTime = (startTime: Timestamp, recurrence: recurrence): Timestamp | undefined => {
  let today = new Date();

  let startDate = startTime.toDate();
  let foundDate = new Date();
  if (!recurrence) {
    return startTime;
  }
  switch (recurrence.type) {
    case "None":
      foundDate = startDate;
      break;
    case "Weekly":
      let nextWeekDate = new Date(today.getFullYear(), today.getMonth(), today.getDate(), startDate.getHours(), startDate.getMinutes());
      while (nextWeekDate.getDay() !== startDate.getDay()) {
        nextWeekDate.setDate(nextWeekDate.getDate() + 1);
      }
      foundDate = nextWeekDate;
      break;
    case "Custom Weekly":
      let nextCustomWeekDate = new Date(today.getFullYear(), today.getMonth(), today.getDate(), startDate.getHours(), startDate.getMinutes());

      while (!recurrence.customDays?.includes(daysOfWeekArray[nextCustomWeekDate.getDay()] as daysOfWeekBrief) || nextCustomWeekDate < today) {
        nextCustomWeekDate.setDate(nextCustomWeekDate.getDate() + 1);
      }

      foundDate = nextCustomWeekDate;
      break;
    case "Specific Dates":
      let foundSpecificDate = new Date();
      for (let i = 0; i < recurrence.customDates!.length; i++) {
        if ((recurrence.customDates![i] as Timestamp).toDate() > today) {
          foundSpecificDate = (recurrence.customDates![i] as Timestamp).toDate();
          break;
        }
      }
      foundDate = foundSpecificDate;
      break;
  }

  if (foundDate < today) {
    return undefined;
  }
  return Timestamp.fromDate(foundDate);
};

export const nextEndTime = (originalStartTime: Timestamp, nextStartTime: Timestamp, endTime?: Timestamp): Timestamp => {
  let delta = nextStartTime.toDate().getTime() - originalStartTime.toDate().getTime();
  let nextEndTime = new Date(nextStartTime.toDate().getTime() + delta);
  return Timestamp.fromDate(nextEndTime);
};

let startTime = new Date();
startTime.setHours(13, 0, 0, 0);

export const defaultEvent: EventObject = {
  state: "Draft",
  fake: false,
  id: "1",
  name: "",
  description: "",
  startTime: Timestamp.fromDate(startTime),
  location: "",
  organizer: "",
  categories: [],
  onCampus: true,
  images: [],
  priceMin: 0,
  originalLink: "",
  address: "",
  recurrenceType: "None",
  organizerType: "Manually Added",
  emoji: "",
  rejectReason: "",
};

// Utility functions
export const getTimeInAMPM = (date: any) => {
  let hours = date.getHours();
  let minutes = date.getMinutes();
  const ampm = hours >= 12 ? " PM" : " AM";

  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? "0" + minutes : minutes;

  return hours + ":" + minutes + "" + ampm;
};

export const formattedDate = (firebaseTimestamp: Timestamp, firebaseTimestampEnd?: Timestamp) => {
  /* ---------------------------- Initialize dates ---------------------------- */

  if (firebaseTimestampEnd?.seconds === 0) {
    firebaseTimestampEnd = undefined;
  }

  let eventDate = firebaseTimestamp.toDate();
  let eventDateEnd = firebaseTimestampEnd?.toDate();
  let today = new Date();
  let todayFlat = new Date();
  todayFlat.setHours(0, 0, 0, 0);
  let eventDateFlat = firebaseTimestamp.toDate();
  eventDateFlat.setHours(0, 0, 0, 0);
  let daysDifference = Math.floor((eventDateFlat.getTime() - todayFlat.getTime()) / (1000 * 3600 * 24));

  /* -------------------------------- Constants ------------------------------- */

  let weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  let weekdaysShort = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  /* ------------------------- Case where event is now ------------------------ */

  if (eventDateEnd && firebaseTimestamp.toDate() <= new Date() && eventDateEnd >= new Date()) {
    if (!eventDateEnd) {
      return "Now";
    } else if (eventDateEnd.getDate() === today.getDate()) {
      // Case where event ends today
      return "Now" + " · " + "Until " + getTimeInAMPM(eventDateEnd);
      // case where event ends tomorrow
    } else if (daysDifference == 1) {
      return "Now" + " · " + "Until Tomorrow " + getTimeInAMPM(eventDateEnd);
      // case where event ends this week
    } else if (daysDifference <= 7) {
      return "Now" + " · " + "Until " + weekdaysShort[eventDateEnd.getDay()] + " " + getTimeInAMPM(eventDateEnd);
    } else {
      // Default case
      return "Now";
    }
  }

  /* ------------------------------ Default case ------------------------------ */

  let endTimeString = "";
  if (eventDateEnd) {
    endTimeString = " - " + getTimeInAMPM(eventDateEnd);
  }

  if (daysDifference === 0) {
    return "Today" + " · " + getTimeInAMPM(eventDate) + endTimeString;
  } else if (daysDifference === 1) {
    return "Tomorrow" + " · " + getTimeInAMPM(eventDate) + endTimeString;
  } else if (daysDifference > 1 && daysDifference <= 7) {
    return weekdays[eventDate.getDay()] + " · " + getTimeInAMPM(eventDate) + endTimeString;
  } else {
    let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    let day = eventDate.getDate();
    let daySuffix = ["th", "st", "nd", "rd", "th", "th", "th", "th", "th", "th"];
    let suffix = day % 10 < 10 && day > 20 ? daySuffix[day % 10] : "th";

    return days[eventDate.getDay()] + " " + months[eventDate.getMonth()] + " " + day + suffix + " · " + getTimeInAMPM(eventDate);
  }
};

// Old event category enum
// export enum EventCategory {
//   ALL = "All", // Not a real category, used to represent all categories. Don't assign to an event
//   ARTS = "Arts",
//   DESIGN = "Design",
//   BUSINESS = "Business",
//   SCIENCE = "Science",
//   SPORTS = "Sports",
//   GAMES = "Games",
//   SOCIAL_SCI = "Social Sci",
//   NIGHTLIFE = "Nightlife",
// }
