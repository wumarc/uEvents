import { addDoc, arrayRemove, arrayUnion, collection, deleteDoc, doc, DocumentData, setDoc, updateDoc, WithFieldValue } from "firebase/firestore";
import { useCollection, useDocument } from "react-firebase-hooks/firestore";
import { auth, fireStore, storage } from "../firebaseConfig";
import { EventObject } from "./model/EventObject";
import { useDownloadURL } from "react-firebase-hooks/storage";
import { ref } from "firebase/storage";
import { isLogged } from "./util";

export function useStateWithFireStoreImage(path: string) {
  const [url, loading, error] = useDownloadURL(ref(storage, path));

  if (error) {
    return [false, "", false] as const;
  }

  return [loading, url, true] as const;
}

export function useStateWithFireStoreCollection<T extends { [x: string]: any }>(pathToCollection: string) {
  const [snap, loading, error] = useCollection(collection(fireStore, pathToCollection));

  if (error) {
    throw error;
  }

  let value = snap?.docs.map((doc) => doc.data() as T);

  const add = (id: string, value: T) => {
    const document = doc(fireStore, pathToCollection + "/" + id);
    setDoc(document, value);
  };

  const del = (id: string) => {
    const document = doc(fireStore, pathToCollection + "/" + id);
    deleteDoc(document);
  };

  return [loading, value, add, del] as const;
}

export function useStateWithFireStoreDocument<T extends { [x: string]: any }>(pathToDocument: string, id: string) {
  const document = doc(fireStore, pathToDocument + "/" + id);
  const [snap, loading, error] = useDocument(document);

  if (error) {
    throw error;
  }

  const set = (newVal: T) => {
    updateDoc(document, newVal);
  };

  let dbListenedValue: T = snap?.data() as T;

  return [loading, dbListenedValue, set] as const;
}

export function useStateWithFireStoreDocumentLogged<T extends { [x: string]: any }>(logged: boolean, pathToDocument: string, id: string) {
  if (!logged || !auth.currentUser) {
    useStateWithFireStoreDocument(pathToDocument, "dummy");
    return [false, undefined, undefined] as const;
  }
  return useStateWithFireStoreDocument<T>(pathToDocument, id);
}

export function addDocumentToCollection<T extends { [x: string]: any }>(pathToCollection: string, id: string, value: T) {
  return setDoc(doc(fireStore, pathToCollection + "/" + id), value);
}

/// Depreciated
export function useSateWithFireStore<T>(pathToId: string, fieldName: string, defaultValue: T) {
  const document = doc(fireStore, pathToId);
  const [snap, loading, error] = useDocument(document);

  if (error) {
    throw error;
  }

  if (snap == undefined && loading == false) {
    console.warn("Dangerous! Initializing firebase. Document does not exist. Path to: ", pathToId, " fieldName: ", fieldName);
    setDoc(document, { [fieldName]: defaultValue });
  }

  let dbListenedValue: T = snap?.get(fieldName);

  if (dbListenedValue == undefined) {
    // setDoc(document, { [fieldName]: defaultValue });
    dbListenedValue = defaultValue;
  }

  const set = (newVal: T) => {
    updateDoc(document, { [fieldName]: newVal });
  };

  return [loading, dbListenedValue, set] as const;
}

/// Depreciated
export function useSateWithFireStoreArray<T>(pathToId: string, fieldName: string) {
  const document = doc(fireStore, pathToId);
  const [snap, loading, error] = useDocument(document);

  if (error) {
    throw error;
  }

  if (snap == undefined && loading == false) {
    console.warn("Dangerous! Initializing firebase. Document does not exist. Path to: ", pathToId, " fieldName: ", fieldName);
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
