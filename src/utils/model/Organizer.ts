import { EventObject } from "./EventObject";

export type Organizer = {
  type: "organizer";
  name: string;
  image: string;
  email: string;
  instagram: string;
  description: string;
};

export const defaultOrganizer: Organizer = {
  type: "organizer",
  name: "",
  image: "",
  email: "",
  instagram: "",
  description: "",
};
