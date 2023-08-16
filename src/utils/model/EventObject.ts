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
  | "Daily"
  | "Weekly"
  | "Monthly"
  | "Custom Weekly"
  | "Specific Dates";

export const recurrenceTypeArray: recurrenceType[] = [
  "None",
  "Daily",
  "Weekly",
  "Monthly",
  "Custom Weekly",
  "Specific Dates",
];

export class recurrence {
  type: recurrenceType;
  customDays?: daysOfWeekBrief[];
  customDates?: Timestamp[];
  end?: Timestamp; // If current > end, event is no longer recurring

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
  state: "Created" | "Pending" | "Published"; // Created: Event is created but not submitted for approval. Pending: Event is submitted for approval. Published: Event is approved and published
  name: string;
  priceMin: number; // If no max price is specified, this is the exact price
  priceMax?: number;
  // priceDescription?: string; // If needed, a description of the different prices
  description: string; // 750 characters max
  location: string; // Building name and room number
  address: string;
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
    case "Daily":
      let nextDate = new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate(),
        startDate.getHours(),
        startDate.getMinutes()
      );
      foundDate = nextDate;
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
    case "Monthly":
      let nextMonthDate = new Date(
        today.getFullYear(),
        today.getMonth(),
        startDate.getDate(),
        startDate.getHours(),
        startDate.getMinutes()
      );
      if (nextMonthDate < today) {
        nextMonthDate.setMonth(nextMonthDate.getMonth() + 1);
      }
      foundDate = nextMonthDate;
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
  state: "Created",
  id: "1",
  name: "",
  description: "",
  startTime: new Timestamp(0, 0),
  location: "",
  organizer: "",
  categories: [],
  onCampus: false,
  images: [],
  priceMin: 0,
  originalLink: "",
  address: "",
  recurrence: new recurrence("None"),
  organizerType: "Manually Added",
};

// Utility functions
export const extractMonth = (timestamp: Timestamp) => {
  const date = timestamp.toDate();
  const month = date.getMonth();
  return monthsOfYear[month];
};

export const extractDay = (timestamp: Timestamp) => {
  const date = timestamp.toDate();
  const day = date.getDate();
  return day.toString();
};

export const extractDayOfWeek = (timestamp: Timestamp) => {
  const date = timestamp.toDate();
  const day = date.getDay();
  return daysOfWeek[day];
};

// Extract time in format HH:MM AM/PM
export const extractTime = (timestamp: Timestamp) => {
  const date = timestamp.toDate();
  const hour = date.getHours();
  const minute = date.getMinutes();
  const ampm = hour >= 12 ? "PM" : "AM";
  const hour12 = hour % 12 || 12;
  return `${hour12}:${minute} ${ampm}`;
};

const daysOfWeek: string[] = [
  "Sunday",
  "Monday",
  "Tueday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const monthsOfYear: string[] = [
  "January",
  "Febuary",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September ",
  "October",
  "November",
  "December",
];
