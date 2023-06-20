import { EventObject } from "./EventObject";

export type Organizer = {
  type: "organizer";
  name: string;
};

export const defaultOrganizer: Organizer = {
  type: "organizer",
  name: "",
};