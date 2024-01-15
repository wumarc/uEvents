import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebaseConfig";
import { useStateWithFireStoreDocumentLogged } from "../useStateWithFirebase";
import { getFirebaseUserIDOrEmpty, userType } from "../util";

export type User = {
  // User type. Anonymous if not logged in.
  type: "student" | "organizer" | "admin" | "anonymous";

  name: string;

  // Ids of events saved
  saved: string[];

  // Ids of events bought
  tickets: string[];

  // Ids of events hidden
  hidden: string[];

  // Ids of events reported
  reported: string[];

  // Ids of organizers blocked
  blocked: string[];

  // Ids of events claimed
  claimRequests: string[];
} & UserStudentOnly &
  UserOrganizerOnly &
  UserLocalStorage;

export type UserStudentOnly = {
  studentId: number;
};

export type UserOrganizerOnly = {
  email: string;

  instagram: string;

  description: string;

  approved: boolean;

  // true if real organizer
  authentic: boolean;
};

export type UserLocalStorage = {
  id: string;
} & UserLocalStorageStudentOnly &
  UserLocalStorageOrganizerOnly;

export type UserLocalStorageStudentOnly = {};

export type UserLocalStorageOrganizerOnly = {};

/// [loading, userData, isLogged, isStudent, isOrganizer, isAdmin, isBeta]
// export const useUser = (): [boolean, User | undefined, (arg0: User) => void, boolean, boolean, boolean, boolean, boolean] => {
//   const [user, loading3, error] = useAuthState(auth);
//   const [loading2, userData, setUserData] = useStateWithFireStoreDocumentLogged(user != null, "users", getFirebaseUserIDOrEmpty());
//   let [isStudent, isOrganizer, isAdmin, isBeta] = userType(userData);

// };
