import { Timestamp } from "firebase/firestore";
import { Organizer } from "./Organizer";
import { Student } from "./Student";

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

/// Event object
/// Optional fields are marked with a question mark. They can be undefined or empty to represent no value
export type EventObject = {
  id: string; // Unique id for each event
  name: string;
  priceMin: number; // If no max price is specified, this is the exact price
  priceMax?: number;
  priceDescription?: string; // If needed, a description of the different prices
  description: string; // 750 characters max
  saved: string[]; // Ids of students who saved this event
  tickets: string[]; // Ids of students who bought tickets
  location: string; // Building name and room number
  address: string;
  organizer: string; // Organizer name //TODO: Replace for id
  startTime: Timestamp;
  endTime?: Timestamp; // End time doesn't have to be specified
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
