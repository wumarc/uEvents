import { Timestamp } from "firebase/firestore";
import { EventObject, nextStartTime, recurrence } from "./model/EventObject";

export function searchAlgo(
  query: string,
  eventList: EventObject[]
): EventObject[] {
  let keywords = query.split(" ");
  let eventMap = new Map<number, number>(); // Index of event in eventList, score

  // Parameters for scoring
  const NAME_WEIGHT = 1;
  const DESCRIPTION_WEIGHT = 0.5;
  const LOCATION_WEIGHT = 1;
  const ORGANIZER_WEIGHT = 1;
  const CATEGORY_WEIGHT = 1;
  const FOOD_WEIGHT = 0.5;
  const ATTIRE_WEIGHT = 0.25;
  const TOBRING_WEIGHT = 0.25;
  const INCLUDES_WEIGHT = 0.25;
  const TRANSPORTATION_WEIGHT = 0.25;

  if (!eventList) {
    return [];
  }

  // Iterate through each event
  for (let i = 0; i < eventList.length; i++) {
    let event = eventList[i];
    let score = 0;

    if (!event) {
      continue;
    }

    // Iterate through each keyword
    for (let j = 0; j < keywords.length; j++) {
      let keyword = keywords[j];

      if (!keyword) {
        continue;
      }

      // Iterate through each field
      if (
        event.name &&
        event.name.toLowerCase().includes(keyword.toLowerCase())
      ) {
        score += NAME_WEIGHT;
      }
      if (
        event.description &&
        event.description.toLowerCase().includes(keyword.toLowerCase())
      ) {
        score += DESCRIPTION_WEIGHT;
      }
      if (
        event.location &&
        event.location.toLowerCase().includes(keyword.toLowerCase())
      ) {
        score += LOCATION_WEIGHT;
      }
      if (
        event.organizer &&
        event.organizer.toLowerCase().includes(keyword.toLowerCase())
      ) {
        score += ORGANIZER_WEIGHT;
      }
      if (
        event.categories &&
        (event.categories as string[]).includes(keyword)
      ) {
        score += CATEGORY_WEIGHT;
      }
      if (
        event.food &&
        event.food?.toLowerCase().includes(keyword.toLowerCase())
      ) {
        score += FOOD_WEIGHT;
      }
      if (
        event.attire &&
        event.attire?.toLowerCase().includes(keyword.toLowerCase())
      ) {
        score += ATTIRE_WEIGHT;
      }
      if (
        event.toBring &&
        event.toBring?.toLowerCase().includes(keyword.toLowerCase())
      ) {
        score += TOBRING_WEIGHT;
      }
      if (
        event.includes &&
        event.includes?.toLowerCase().includes(keyword.toLowerCase())
      ) {
        score += INCLUDES_WEIGHT;
      }
      if (
        event.transportation &&
        event.transportation?.toLowerCase().includes(keyword.toLowerCase())
      ) {
        score += TRANSPORTATION_WEIGHT;
      }
    }

    eventMap.set(i, score);
  }

  // Sort the map by score or date if score is the same
  let sortedMap = new Map(
    [...eventMap.entries()].sort((a, b) => {
      if (a[1] === b[1]) {
        let eventA = eventList[a[0]];
        let eventB = eventList[b[0]];
        let nextStartTimeA = nextStartTime(
          eventA?.startTime as Timestamp,
          eventA?.recurrence ?? new recurrence("None")
        );
        let nextStartTimeB = nextStartTime(
          eventB?.startTime as Timestamp,
          eventB?.recurrence ?? new recurrence("None")
        );
        if (nextStartTimeA === undefined) {
          return 1;
        }
        if (nextStartTimeB === undefined) {
          return -1;
        }
        return (
          nextStartTimeA.toDate().getTime() - nextStartTimeB.toDate().getTime()
        );
      } else {
        return b[1] - a[1];
      }
    })
  );

  // Return the sorted list of events
  let sortedEvents: EventObject[] = [];
  for (let [key, value] of sortedMap) {
    sortedEvents.push(eventList[key] as EventObject);
  }
  return sortedEvents;
}
