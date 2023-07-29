export type Student = {
  type: "student";
  name: string;
  studentId: number;
  saved: string[]; // Ids of events saved
  tickets: string[]; // Ids of events bought
};

export const defaultStudent: Student = {
  type: "student",
  name: "",
  studentId: 0,
  saved: [],
  tickets: [],
};

// TODO Add the tickets and liked events to student model
