import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebaseConfig";
import { useStateWithFireStoreDocumentLogged } from "../useStateWithFirebase";
import { getFirebaseUserIDOrEmpty, uid, userType } from "../util";
import { useLocalStorage } from "../localStorage";
import { useEffect } from "react";

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

const defaultUserLocalStorage: UserLocalStorage = {
  id: uid(),
};

export type UserLocalStorageStudentOnly = {};

export type UserLocalStorageOrganizerOnly = {};

// [loading, userData, isLogged, isStudent, isOrganizer, isAdmin, isBeta]
export const useUser = (): [boolean, User | undefined, ((arg0: User) => void) | undefined, boolean, boolean, boolean, boolean, boolean] => {
  const [user, loading3, error] = useAuthState(auth);
  const [loading2, userData, setUserData] = useStateWithFireStoreDocumentLogged<User>(user != null, "users", getFirebaseUserIDOrEmpty());
  const [localUserData, setUserDataLocal] = useLocalStorage<UserLocalStorage>("user", defaultUserLocalStorage);
  let [isStudent, isOrganizer, isAdmin, isBeta] = userType(userData);
  let loading = loading2 || loading3;
  let isLogged = user != null;

  useEffect(() => {
    // Id

    if (localUserData.id == "") {
      setUserDataLocal({ ...localUserData, id: uid() });
    }
  }, [loading, isLogged]);

  return [loading, userData, setUserData, isLogged, isStudent, isOrganizer, isAdmin, isBeta];
};
