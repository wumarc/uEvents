export type Organizer = {
  id: string;
  type: "organizer";
  name: string;
  email: string;
  instagram: string;
  description: string;
  approved: boolean;
  saved: string[]; // Ids of events saved
  tickets: string[]; // Ids of events bought
  hidden: string[]; // Ids of events hidden
  reported: string[]; // Ids of events reported
  blocked: string[]; // Ids of organizers blocked
  claimRequests: string[]; // Ids of events claimed
  authentic: boolean; // true if real organizer
};

export const defaultOrganizer: Organizer = {
  authentic: false,
  type: "organizer",
  name: "",
  email: "",
  instagram: "",
  description: "",
  id: "",
  approved: false,
  saved: [],
  tickets: [],
  hidden: [],
  reported: [],
  blocked: [],
  claimRequests: [],
};
