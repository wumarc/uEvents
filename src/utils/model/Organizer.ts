import { EventObject } from "./EventObject";

export type Organizer = {
  id: string;
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
  id: "",
};
