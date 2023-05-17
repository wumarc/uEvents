// import * as fs from "expo-file-system";
// import * as path from "path";
// import { parse } from "csv-parse";
// import { EventObject } from "../model/EventObject";

// export async function readDataObjectCsv(): Promise<EventObject[]> {
//   const csvFilePath = path.resolve(__dirname, "eventObject.csv");

//   const headers = [
//     "name",
//     "description",
//     "attendees",
//     "location",
//     "organizer",
//     "date",
//     "time",
//   ];

//   const fileContent = await fs.readAsStringAsync(csvFilePath, {
//     encoding: "utf8",
//   });

//   let data: EventObject[] = [];

//   parse(
//     fileContent,
//     {
//       delimiter: ",",
//       columns: headers,
//     },
//     (error, result: EventObject[]) => {
//       if (error) {
//         console.error(error);
//       }
//       console.log("Result", result);
//       data = result;
//     }
//   );

//   return data;
// }
