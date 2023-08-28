export type Student = {
  type: "student";
  name: string;
  id: string;
  studentId: number;
  saved: string[]; // Ids of events saved
  tickets: string[]; // Ids of events bought
  hidden: string[]; // Ids of events hidden
  reported: string[]; // Ids of events reported
  blocked: string[]; // Ids of organizers blocked
  claimRequests: string[]; // Ids of events claimed
};

export const defaultStudent: Student = {
  type: "student",
  name: "",
  studentId: 0,
  id: "",
  saved: [],
  tickets: [],
  hidden: [],
  reported: [],
  blocked: [],
  claimRequests: [],
};

// TODO Add the tickets and liked events to student model
