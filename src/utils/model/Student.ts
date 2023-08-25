export type Student = {
  type: "student";
  name: string;
  id: string;
  studentId: number;
  saved: string[]; // Ids of events saved
  tickets: string[]; // Ids of events bought
};

export const defaultStudent: Student = {
  type: "student",
  name: "",
  studentId: 0,
  id: "",
  saved: [],
  tickets: [],
};

// TODO Add the tickets and liked events to student model
