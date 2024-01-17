// import { Dispatch, SetStateAction, useCallback, useEffect, useState } from "react";
// import { AsyncStorage } from "react-native";
// import { Platform } from "react-native";
// import { useEventCallback, useEventListener } from "usehooks-ts";

// declare global {
//   interface WindowEventMap {
//     "local-storage": CustomEvent;
//   }
// }

// type SetValue<T> = Dispatch<SetStateAction<T>>;

// export function useLocalStorage<T>(key: string, initialValue: T): [T | undefined, SetValue<T>] {
//   const [storedValue, setStoredValue] = useState<T>();

//   useEffect(() => {
//     readValue().then(setStoredValue);
//   }, []);

//   async function readValue() {
//     if (Platform.OS === "web") {
//       const data = await AsyncStorage.getItem(key);
//       return data;
//     } else {
//       if (typeof window === "undefined") {
//         return initialValue;
//       }
//       try {
//         const item = window.localStorage.getItem(key);
//         return item ? (parseJSON(item) as T) : initialValue;
//       } catch (error) {
//         console.warn(`Error reading localStorage key “${key}”:`, error);
//         return initialValue;
//       }
//     }
//   }

//   function setValueApp(data: T) {
//     if (typeof data === "string") {
//       AsyncStorage.setItem(key, data);
//       setStoredValue(data);
//     }
//     return data;
//   }

//   // Return a wrapped version of useState's setter function that ...
//   // ... persists the new value to localStorage.
//   const setValue: SetValue<T> = useEventCallback((value) => {
//     // Prevent build error "window is undefined" but keeps working
//     if (typeof window === "undefined") {
//       console.warn(`Tried setting localStorage key “${key}” even though environment is not a client`);
//     }

//     try {
//       // Save to local storage
//       window.localStorage.setItem(key, JSON.stringify(value));

//       // Save state
//       setStoredValue(value as any);

//       // We dispatch a custom event so every useLocalStorage hook are notified
//       window.dispatchEvent(new Event("local-storage"));
//     } catch (error) {
//       console.warn(`Error setting localStorage key “${key}”:`, error);
//     }
//   });

//   const handleStorageChange = useCallback(
//     (event: StorageEvent | CustomEvent) => {
//       if ((event as StorageEvent)?.key && (event as StorageEvent).key !== key) {
//         return;
//       }
//       readValue().then(setStoredValue);
//     },
//     [key, readValue]
//   );

//   // this only works for other documents, not the current one
//   useEventListener("storage", handleStorageChange);

//   // this is a custom event, triggered in writeValueToLocalStorage
//   // See: useLocalStorage()
//   useEventListener("local-storage", handleStorageChange);

//   return [storedValue, setValue];
// }

// // A wrapper for "JSON.parse()"" to support "undefined" value
// function parseJSON<T>(value: string | null): T | undefined {
//   try {
//     return value === "undefined" ? undefined : JSON.parse(value ?? "");
//   } catch {
//     console.log("parsing error on", { value });
//     return undefined;
//   }
// }
