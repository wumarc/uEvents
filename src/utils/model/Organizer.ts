import { EventObject } from "./EventObject";

export type Organizer = {
  id: string;
  type: "organizer";
  name: string;
  image: string;
  email: string;
  instagram: string;
  description: string;
  approved: boolean;
};

export const defaultOrganizer: Organizer = {
  type: "organizer",
  name: "",
  image: "",
  email: "",
  instagram: "",
  description: "",
  id: "",
  approved: false,
};
