import { Timestamp } from "firebase/firestore";
import { Organizer } from "./Organizer";
import { Student } from "./Student";

export enum EventCategory {
  SPORTS = "Sports",
  ARTS = "Arts",
  ACADEMICS = "Academics",
  PARTY = "Party",
  FACULTY = "Faculty",
  CULTURAL = "Cultural",
  TEAM = "Team",
}

export type EventObject = {
  id: string;
  name: string;
  price: number;
  description: string;
  saved: string[]; // Ids of students who saved this event
  tickets: string[]; // Ids of students who bought tickets
  location: string; // Building name and room number
  address: string;
  organizer: string; // Organizer name //TODO: Replace for id
  time: Timestamp;
  categories: EventCategory[];
  onCampus: boolean;
  food?: string;
  attire?: string;
  toBring?: string;
  includes?: string;
  transportation?: string;
  images: string[];
  signUpLink?: string; // If undefined, no sign up link
  originalLink: string;
};

export const defaultEvent: EventObject = {
  id: "1",
  name: "",
  description: "",
  saved: [],
  tickets: [],
  time: new Timestamp(0, 0),
  location: "",
  organizer: "",
  categories: [],
  onCampus: false,
  images: [],
  price: 0,
  originalLink: "",
  address: "",
};

// Utility functions
export const extractMonth = (timestamp: Timestamp) => {
  const date = timestamp.toDate();
  const month = date.getMonth();
  return monthsOfYear[month];
}

export const extractDay = (timestamp: Timestamp) => {
  const date = timestamp.toDate();
  const day = date.getDate();
  return day.toString();
}

export const extractDayOfWeek = (timestamp: Timestamp) => {
  const date = timestamp.toDate();
  const day = date.getDay();
  return daysOfWeek[day];
}

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
