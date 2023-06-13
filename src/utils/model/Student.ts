export type Student = {
  type: "student";
  name: string;
  studentId: number;
};

export const defaultStudent: Student = {
  type: "student",
  name: "",
  studentId: 0,
};
