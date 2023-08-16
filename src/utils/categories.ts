import { EventObject } from "./model/EventObject";

export function calculateNumberOfEvents(
  categories: string[],
  categoriesValues: number[]
): number {
  var sum = 0;
  for (var i = 0; i < categories.length; i++) {
    sum += categoriesValues[i];
  }
  return sum / 5;
}

export function buildCategories(events: EventObject[]): [string[], number[]] {
  var categories: string[] = [];
  var categoriesValues: number[] = [];
  events.forEach((event) => {
    event.categories.forEach((category) => {
      if (categories.includes(category)) {
        categoriesValues[categories.indexOf(category)] += 1;
      } else {
        categories.push(category);
        categoriesValues.push(1);
      }
    });
  });
  return [categories, categoriesValues];
}
