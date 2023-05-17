import { Timestamp } from "firebase/firestore";
import { Organizer } from "./Organizer";
import { Student } from "./Student";

export type EventObject = {
  name: string;
  description: string;
  attendees: Student[];
  location: string;
  organizer: Organizer;
  date: Date | null;
  time?: Timestamp | null;
};

// Mock data

export const mockEventClimbing: EventObject = {
  name: "Fall Hiking and Climbing",
  description: "",
  attendees: [],
  date: new Date("TUE, MAR 28 08:00 EDT"),
  time: null,
  location: "Morisset Library, University of Ottawa",
  organizer: {
    name: "uOttawa Outdoors Club",
    events: [],
  },
};
