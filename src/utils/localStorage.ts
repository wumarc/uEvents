import { useEffect, useState } from "react";
import { Platform } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

/// Stores a value in local storage.
/// Only works on web.
export const useLocalStorage = <T>(key: string, defaultValue: T) => {
  const [value, setValue] = useState<T>(() => {
    if (Platform.OS === "web") {
      const storedValue = localStorage.getItem(key);
      return storedValue ? JSON.parse(storedValue) : defaultValue;
    } else {
      AsyncStorage.getItem(key).then((value) => {
        setValue(value ? JSON.parse(value) : defaultValue);
      });
      return defaultValue;
    }
  });

  useEffect(() => {
    if (Platform.OS === "web") {
      localStorage.setItem(key, JSON.stringify(value));
    } else {
      AsyncStorage.setItem(key, JSON.stringify(value));
    }
  }, [key, value]);

  return [value, setValue] as const;
};
