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
    if (event.categories) {
      event.categories.forEach((category) => {
        if (categories.includes(category)) {
          categoriesValues[categories.indexOf(category)] += 1;
        } else {
          categories.push(category);
          categoriesValues.push(1);
        }
      });
    }
  });
  return [categories, categoriesValues];
}

const defaultCategories = [
  "arts",
  "design",
  "business",
  "science",
  "sports",
  "games",
  "nightlife",
];

export function getOrderedCategories(
  categories: string[],
  categoriesValues: number[]
): string[] {
  for (let value of defaultCategories) {
    if (!categories.includes(value)) {
      categories.push(value);
      categoriesValues.push(5);
    }
  }

  var orderedCategories: string[] = [];
  for (let i = 0; i < categories.length; i++) {
    var max = Math.max(...categoriesValues);
    var index = categoriesValues.indexOf(max);
    orderedCategories.push(categories[index] as string);
    categoriesValues[index] = -1;
  }

  return orderedCategories;
}
