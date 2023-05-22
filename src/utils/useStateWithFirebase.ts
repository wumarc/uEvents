import {
  arrayRemove,
  arrayUnion,
  doc,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { useDocument } from "react-firebase-hooks/firestore";
import { fireStore } from "../firebaseConfig";

export function useSateWithFireStore<T>(
  pathToId: string,
  fieldName: string,
  defaultValue: T
) {
  const document = doc(fireStore, pathToId);
  const [snap, loading, error] = useDocument(document);

  if (error) {
    throw error;
  }

  if (snap == undefined && loading == false) {
    console.warn(
      "Dangerous! Initializing firebase. Document does not exist. Path to: ",
      pathToId,
      " fieldName: ",
      fieldName
    );
    setDoc(document, { [fieldName]: defaultValue });
  }

  let dbListenedValue: T = snap?.get(fieldName);

  const set = (newVal: T) => {
    updateDoc(document, { [fieldName]: newVal });
  };

  return [loading, dbListenedValue, set] as const;
}

export function useSateWithFireStoreArray<T>(
  pathToId: string,
  fieldName: string
) {
  const document = doc(fireStore, pathToId);
  const [snap, loading, error] = useDocument(document);

  if (error) {
    throw error;
  }

  if (snap == undefined && loading == false) {
    console.warn(
      "Dangerous! Initializing firebase. Document does not exist. Path to: ",
      pathToId,
      " fieldName: ",
      fieldName
    );
    setDoc(document, { [fieldName]: [] });
  }

  let dbListenedValue: T[] = snap?.get(fieldName);

  const add = (val: T) => {
    updateDoc(document, { [fieldName]: arrayUnion(val) });
  };

  const remove = (val: T) => {
    updateDoc(document, { [fieldName]: arrayRemove(val) });
  };

  const set = (newVal: T[]) => {
    updateDoc(document, { [fieldName]: newVal });
  };

  return [loading, dbListenedValue, set, add, remove] as const;
}
