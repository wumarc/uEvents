import { Timestamp } from "firebase/firestore";
import { Organizer } from "./Organizer";
import { Student } from "./Student";

export type EventObject = {
  id: string;
  name: string;
  description: string;
  attendees: string[];
  saved: string[]; // Ids of students who saved this event
  tickets: string[]; // Ids of students who bought tickets
  location: string;
  organizer: string; // Id of the organizer
  date: Date | null;
  time?: Timestamp | null;
};

// Mock data

export const mockEventClimbing: EventObject = {
  id: "1",
  name: "Adele concert viewing",
  description:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur quis commodo elit. Etiam tincidunt dui quis sapien sagittis porttitor. Suspendisse ullamcorper, massa id volutpat sagittis, odio neque feugiat nibh, nec laoreet felis elit vel sem. Sed aliquet scelerisque pretium. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Maecenas mi felis, egestas eu accumsan in, mollis ac nibh. Aenean et libero ut nunc molestie ullamcorper non sed urna. Sed placerat varius fringilla. Nulla facilisi.",
  attendees: [],
  saved: [],
  tickets: [],
  date: new Date("TUE, MAR 28 08:00 EDT"),
  time: null,
  location: "Hamelin Hall, uOttawa",
  organizer: "",
};

export const mockEventPainting: EventObject = {
  id: "1",
  name: "Fall Painting",
  description:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur quis commodo elit. Etiam tincidunt dui quis sapien sagittis porttitor. Suspendisse ullamcorper, massa id volutpat sagittis, odio neque feugiat nibh, nec laoreet felis elit vel sem. Sed aliquet scelerisque pretium. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Maecenas mi felis, egestas eu accumsan in, mollis ac nibh. Aenean et libero ut nunc molestie ullamcorper non sed urna. Sed placerat varius fringilla. Nulla facilisi.",
  attendees: [],
  saved: [],
  tickets: [],
  date: new Date("TUE, MAR 28 08:00 EDT"),
  time: null,
  location: "Morisset Library",
  organizer: "",
};

export const mockEventGaming: EventObject = {
  id: "1",
  name: "Game Night",
  description:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur quis commodo elit. Etiam tincidunt dui quis sapien sagittis porttitor. Suspendisse ullamcorper, massa id volutpat sagittis, odio neque feugiat nibh, nec laoreet felis elit vel sem. Sed aliquet scelerisque pretium. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Maecenas mi felis, egestas eu accumsan in, mollis ac nibh. Aenean et libero ut nunc molestie ullamcorper non sed urna. Sed placerat varius fringilla. Nulla facilisi.",
  attendees: [],
  saved: [],
  tickets: [],
  date: new Date("TUE, MAR 28 08:00 EDT"),
  time: null,
  location: "Morisset Library",
  organizer: "",
};

export const defaultEvent: EventObject = {
  id: "1",
  name: "",
  description: "",
  attendees: [],
  saved: [],
  tickets: [],
  date: null,
  time: null,
  location: "",
  organizer: "",
};
