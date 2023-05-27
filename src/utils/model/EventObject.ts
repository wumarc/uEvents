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
  description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur quis commodo elit. Etiam tincidunt dui quis sapien sagittis porttitor. Suspendisse ullamcorper, massa id volutpat sagittis, odio neque feugiat nibh, nec laoreet felis elit vel sem. Sed aliquet scelerisque pretium. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Maecenas mi felis, egestas eu accumsan in, mollis ac nibh. Aenean et libero ut nunc molestie ullamcorper non sed urna. Sed placerat varius fringilla. Nulla facilisi.",
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
  description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur quis commodo elit. Etiam tincidunt dui quis sapien sagittis porttitor. Suspendisse ullamcorper, massa id volutpat sagittis, odio neque feugiat nibh, nec laoreet felis elit vel sem. Sed aliquet scelerisque pretium. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Maecenas mi felis, egestas eu accumsan in, mollis ac nibh. Aenean et libero ut nunc molestie ullamcorper non sed urna. Sed placerat varius fringilla. Nulla facilisi.",
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
  description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur quis commodo elit. Etiam tincidunt dui quis sapien sagittis porttitor. Suspendisse ullamcorper, massa id volutpat sagittis, odio neque feugiat nibh, nec laoreet felis elit vel sem. Sed aliquet scelerisque pretium. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Maecenas mi felis, egestas eu accumsan in, mollis ac nibh. Aenean et libero ut nunc molestie ullamcorper non sed urna. Sed placerat varius fringilla. Nulla facilisi.",
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
