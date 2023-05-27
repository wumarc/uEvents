import { Timestamp } from "firebase/firestore";
import { Organizer } from "./Organizer";
import { Student } from "./Student";

export type EventObject = {
  id: string;
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
  id: "1",
  name: "Fall Hiking",
  description: "",
  attendees: [{name: "Bella", studentId: 360}, {name: "Normin", studentId: 293}, {name: "Cora", studentId: 44492}],
  date: new Date("TUE, MAR 28 08:00 EDT"),
  time: null,
  location: "Morisset Library",
  organizer: {
    name: "uOttawa Outdoors Club",
    events: [],
  },
};

export const mockEventPainting: EventObject = {
  id: "1",
  name: "Fall Painting",
  description: "",
  attendees: [{name: "Ola", studentId: 1111}],
  date: new Date("TUE, MAR 28 08:00 EDT"),
  time: null,
  location: "Morisset Library",
  organizer: {
    name: "Faculty of Arts",
    events: [],
  },
};

export const mockEventGaming: EventObject = {
  id: "1",
  name: "Game Night",
  description: "",
  attendees: [{name: "Mars", studentId: 10324}, {name: "Carmin", studentId: 93}, {name: "Hermin", studentId: 932}, {name: "Barty", studentId: 8345}],
  date: new Date("TUE, MAR 28 08:00 EDT"),
  time: null,
  location: "Morisset Library",
  organizer: {
    name: "uOttawa Outdoors Club",
    events: [],
  },
};

export const defaultEvent: EventObject = {
  id: "1",
  name: "",
  description: "",
  attendees: [],
  date: null,
  time: null,
  location: "",
  organizer: {
    name: "",
    events: [],
  },
};
