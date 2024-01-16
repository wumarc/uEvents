import { Timestamp } from "firebase/firestore";
import { auth } from "../firebaseConfig";
import { EventObject } from "./model/EventObject";
import { betaUsers, testUsersEvents, testUsersVersion } from "../../userConfig";

export function getFirebaseUserID(): string | undefined {
  let id = auth.currentUser?.uid;
  return id;
}

export function getFirebaseUserIDOrEmpty(): string {
  let id = auth.currentUser?.uid;
  return id ? id : "";
}

/// Returns if the user is logged in or not
/// This will not update properly if it changes. Better to use hook instead useAuthState
export function isLogged(): boolean {
  return auth.currentUser != null;
}

export function eventPath() {
  if (auth.currentUser) {
    for (let i = 0; i < testUsersEvents.length; i++) {
      if (auth.currentUser.email == testUsersEvents[i]) {
        return "events-test";
      }
    }
  }
  return "events";
}

export function versionPath() {
  if (auth.currentUser) {
    for (let i = 0; i < testUsersVersion.length; i++) {
      if (auth.currentUser.email == testUsersVersion[i]) {
        return "versions-test";
      }
    }
  }
  return "versions";
}

// [isStudent, isOrganizer, isAdmin, isBeta]
export function userType(user: any): [boolean, boolean, boolean, boolean] {
  if (user == undefined) {
    return [true, false, false, false];
  }

  // @ts-ignore
  let isBeta = betaUsers.includes(user.email);

  if (user.type == undefined) {
    return [true, false, false, isBeta];
  }
  if (user.type == "student") {
    return [true, false, false, isBeta];
  }
  if (user.type == "organizer") {
    return [false, true, false, isBeta];
  }
  if (user.type == "admin") {
    return [false, false, true, isBeta];
  }
  return [true, false, false, isBeta];
}

/**
 * Returns a unique uid
 * TODO: I am not sure this is unique. Could use the GCP one instead
 * @returns
 */
export function uid() {
  return (performance.now().toString(36) + Math.random().toString(36)).replace(/\./g, "");
}

export type daysOfWeekBrief = "Sun" | "Mon" | "Tue" | "Wed" | "Thu" | "Fri" | "Sat";
export const daysOfWeekArray: daysOfWeekBrief[] = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export const eventDate = ["Today", "Tomorrow", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

export function toPrecision(value: number, precision: number) {
  let valueStr = value.toString();
  let final = "";
  let i = 0;
  for (let j = 0; j < valueStr.length; j++) {
    final += valueStr[j];
    i++;
  }
  for (; i < precision; i++) {
    final = "0" + final;
  }
  return final;
}

export function getNextDate(event: EventObject, today: Date): [Date, Date, boolean] {
  let startDate = event.startTime.toDate();
  let endDate = (event.endTime ?? event.startTime).toDate();
  let hasEnd = event.endTime != undefined;
  let duration = 0; // ms
  if (hasEnd) {
    duration = endDate.getTime() - startDate.getTime();
  }
  let recurrenceType = event.recurrenceType;
  let limit = event.recurrenceEnd?.toDate();
  let exceptions = event.recurrenceExceptions;

  if (!recurrenceType) {
    return [startDate, endDate, hasEnd];
  }

  switch (recurrenceType) {
    case "None":
      return [startDate, endDate, hasEnd];
    case "Weekly":
      while (endDate < today) {
        // Increment the start and end date by 7 days
        let startEpoch = startDate.getTime();
        let endEpoch = endDate.getTime();
        startDate = new Date(startEpoch + 7 * 24 * 60 * 60 * 1000);
        endDate = new Date(endEpoch + 7 * 24 * 60 * 60 * 1000);
      }

      // Check if the start date is an exception
      let flag = true;
      while (flag) flag = false;
      if (exceptions) {
        for (let i = 0; i < exceptions.length; i++) {
          let exception = (exceptions[i] as Timestamp).toDate();
          // Set exception time to startDate
          exception.setHours(startDate.getHours(), startDate.getMinutes(), startDate.getSeconds(), startDate.getMilliseconds());
          if (exception.getTime() == startDate.getTime()) {
            // Increment the start and end date by 7 days
            let startEpoch = startDate.getTime();
            let endEpoch = endDate.getTime();
            startDate = new Date(startEpoch + 7 * 24 * 60 * 60 * 1000);
            endDate = new Date(endEpoch + 7 * 24 * 60 * 60 * 1000);
            flag = true;
          }
        }
      }

      // Make sure today is not over limit
      if (limit) {
        limit = limit;
        limit.setHours(23, 59, 59, 999);
      }
      if (limit && endDate > limit) {
        // Return start date Epoch 0
        return [new Date(0), new Date(0), hasEnd];
      }

      // Return the right date
      return [startDate, endDate, hasEnd];

    case "Custom Weekly":
      let flag2 = false;

      while (!flag2) {
        // Increment the start and end date by 1 day
        let startEpoch = startDate.getTime();
        let endEpoch = endDate.getTime();
        startDate = new Date(startEpoch + 24 * 60 * 60 * 1000);
        endDate = new Date(endEpoch + 24 * 60 * 60 * 1000);

        // Check if the start date is an exception
        flag2 = true;
        if (exceptions) {
          for (let i = 0; i < exceptions.length; i++) {
            let exception = (exceptions[i] as Timestamp).toDate();
            // Set exception time to startDate
            exception.setHours(startDate.getHours(), startDate.getMinutes(), startDate.getSeconds(), startDate.getMilliseconds());
            if (exception.getTime() == startDate.getTime()) {
              flag2 = false;
            }
          }
        }

        // Check if start day is part of the custom days
        // Sunday - Saturday : 0 - 6
        let day = startDate.getDay();
        let customDays = event.recurrenceCustomDays;
        let customDaysInt: number[] = [];
        if (customDays) {
          customDaysInt = customDays.map((day) => daysOfWeekArray.indexOf(day));
        }
        if (customDaysInt) {
          if (!customDaysInt.includes(day)) {
            flag2 = false;
          }
        }
      }
      return [startDate, endDate, hasEnd];

    case "Specific Dates":
      let specificDates = event.recurrenceCustomDates;
      if (!specificDates) {
        return [startDate, endDate, hasEnd];
      }
      // Sort the dates from earliest to latest
      specificDates.sort((a, b) => (a as Timestamp).toDate().getTime() - (b as Timestamp).toDate().getTime());

      // Find the next date
      let foundDate = startDate;
      for (let i = 0; i < specificDates.length; i++) {
        let date = (specificDates[i] as Timestamp).toDate();
        if (date > today) {
          foundDate = date;
          break;
        }
      }

      // Find end date
      if (hasEnd) {
        endDate = new Date(foundDate.getTime() + duration);
      }

      return [foundDate, endDate, hasEnd];

    default:
      console.error("Unsupported recurrence type: " + recurrenceType);
      return [startDate, endDate, hasEnd];
  }
}
