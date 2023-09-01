import { Timestamp } from "firebase/firestore";
import { Organizer } from "./Organizer";
import { Student } from "./Student";
import { daysOfWeekBrief, daysOfWeekArray } from "../util";

export enum EventCategory {
  ALL = "All", // Not a real category, used to represent all categories. Don't assign to an event
  ARTS = "Arts",
  DESIGN = "Design",
  BUSINESS = "Business",
  SCIENCE = "Science",
  SPORTS = "Sports",
  GAMES = "Games",
  SOCIAL_SCI = "Social Sci",
  NIGHTLIFE = "Nightlife",
}

export type recurrenceType =
  | "None"
  | "Weekly"
  | "Custom Weekly"
  | "Specific Dates";

export const recurrenceTypeArray: recurrenceType[] = [
  "None",
  "Weekly",
  "Custom Weekly",
  "Specific Dates",
];

export class recurrence {
  type: recurrenceType;
  customDays?: daysOfWeekBrief[];
  customDates?: Timestamp[];
  end?: Timestamp; // If current > end, event is no longer recurring
  exceptions?: Timestamp[]; // If current in exceptions, event is not happening on that day

  constructor(
    type: recurrenceType,
    customDays?: daysOfWeekBrief[],
    customDates?: Timestamp[],
    end?: Timestamp
  ) {
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

/// Event object
/// Optional fields are marked with a question mark. They can be undefined or empty to represent no value
export type EventObject = {
  id: string; // Unique id for each event
  state: "Draft" | "Pending" | "Published" | "Rejected" | "Reported"; // Draft: Event is created but not submitted for approval. Pending: Event is submitted for approval. Published: Event is approved and published
  rejectReason: string;
  name: string;
  priceMin: number; // If no max price is specified, this is the exact price
  priceMax?: number;
  // priceDescription?: string; // If needed, a description of the different prices
  description: string; // 750 characters max TODO change it to 400?
  location: string; // Building name and room number
  address: string;
  roomNumber?: string;
  organizerType: "Manually Added" | "Organizer Added";
  organizer: string; // If manually added, this is the name of the organizer. If organizer added, this is the id of the organizer
  startTime: Timestamp;
  endTime?: Timestamp; // End time doesn't have to be specified
  categories: string[];
  onCampus: boolean;
  // food?: string;
  // attire?: string;
  // toBring?: string;
  // includes?: string;
  // transportation?: string;
  images: string[];
  emoji: string;
  signUpLink?: string; // If undefined, no sign up link
  originalLink: string;
  recurrence: recurrence;
};

export const nextStartTime = (
  startTime: Timestamp,
  recurrence: recurrence
): Timestamp | undefined => {
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
      let nextWeekDate = new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate(),
        startDate.getHours(),
        startDate.getMinutes()
      );
      while (nextWeekDate.getDay() !== startDate.getDay()) {
        nextWeekDate.setDate(nextWeekDate.getDate() + 1);
      }
      foundDate = nextWeekDate;
      break;
    case "Custom Weekly":
      let nextCustomWeekDate = new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate(),
        startDate.getHours(),
        startDate.getMinutes()
      );

      while (
        !recurrence.customDays?.includes(
          daysOfWeekArray[nextCustomWeekDate.getDay()] as daysOfWeekBrief
        ) ||
        nextCustomWeekDate < today
      ) {
        nextCustomWeekDate.setDate(nextCustomWeekDate.getDate() + 1);
      }

      foundDate = nextCustomWeekDate;
      break;
    case "Specific Dates":
      let foundSpecificDate = new Date();
      for (let i = 0; i < recurrence.customDates!.length; i++) {
        if ((recurrence.customDates![i] as Timestamp).toDate() > today) {
          foundSpecificDate = (
            recurrence.customDates![i] as Timestamp
          ).toDate();
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

export const nextEndTime = (
  originalStartTime: Timestamp,
  nextStartTime: Timestamp,
  endTime?: Timestamp
): Timestamp => {
  let delta =
    nextStartTime.toDate().getTime() - originalStartTime.toDate().getTime();
  let nextEndTime = new Date(nextStartTime.toDate().getTime() + delta);
  return Timestamp.fromDate(nextEndTime);
};

export const defaultEvent: EventObject = {
  state: "Draft",
  id: "1",
  name: "",
  description: "",
  startTime: new Timestamp(0, 0),
  location: "",
  organizer: "",
  categories: [],
  onCampus: true,
  images: [],
  priceMin: 0,
  originalLink: "",
  address: "",
  recurrence: new recurrence("None"),
  organizerType: "Manually Added",
  emoji: "",
  rejectReason: "",
};

// Utility functions
export const getTimeInAMPM = (date: any) => {
  let hours = date.getHours();
  let minutes = date.getMinutes();
  const ampm = hours >= 12 ? ' PM' : ' AM';

  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? '0' + minutes : minutes;

  return hours + ':' + minutes + '' + ampm;;
}

export const relativeDate = (firebaseTimestamp: any) => {
  let eventDate = firebaseTimestamp.toDate();
  eventDate.setHours(0, 0, 0, 0);  // Reset time to midnight

  let today = new Date();
  today.setHours(0, 0, 0, 0);  // Reset time to midnight

  let daysDifference = (eventDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24);

  let weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  if (daysDifference === 0) {
    return "Today";
  } else if (daysDifference === 1) {
    return "Tomorrow";
  } else if (daysDifference > 1 && daysDifference <= 7) {
    return weekdays[eventDate.getDay()];
  } else {
    let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    
    let day = eventDate.getDate();
    let daySuffix = ["th", "st", "nd", "rd", "th", "th", "th", "th", "th", "th"];
    let suffix = (day % 10 < 10 && day > 20) ? daySuffix[day % 10] : "th";
    
    return days[eventDate.getDay()] + " " + months[eventDate.getMonth()] + " " + day + suffix;
  }
}