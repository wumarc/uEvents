import { FC, useState } from "react";
import { Input } from "react-native-elements";
import { toPrecision } from "../../utils/util";

export const DatePicker: FC<{
  default?: Date;
  set: (date: Date) => void;
  label: string;
}> = (props) => {
  const [errorMessage, setErrorMessage] = useState<string>("");

  let defaultDate = props.default;

  if (props.default?.getFullYear() === 1969) {
    defaultDate = undefined;
  }

  let timeString = "";
  if (defaultDate) {
    timeString += toPrecision(defaultDate.getFullYear(), 4) + ":";
    timeString += toPrecision(defaultDate.getMonth() + 1, 2) + ":";
    timeString += toPrecision(defaultDate.getDate(), 2) + ":";
    timeString += toPrecision(defaultDate.getHours(), 2) + ":";
    timeString += toPrecision(defaultDate.getMinutes(), 2);
  }

  return (
    <Input
      defaultValue={timeString}
      label={props.label}
      errorMessage={errorMessage}
      onChangeText={(value) => {
        const [year, month, day, hours, minutes] = value.split(":");
        let yearInt: number;
        let monthInt: number;
        let dayInt: number;
        let hoursInt: number;
        let minutesInt: number;
        try {
          yearInt = parseInt(year as string);
          monthInt = parseInt(month as string);
          dayInt = parseInt(day as string);
          hoursInt = parseInt(hours as string);
          minutesInt = parseInt(minutes as string);
        } catch (error) {
          setErrorMessage("Invalid time format. Must be numbers");
          return;
        }
        if (
          yearInt == undefined ||
          Number.isNaN(yearInt) ||
          monthInt == undefined ||
          Number.isNaN(monthInt) ||
          dayInt == undefined ||
          Number.isNaN(dayInt) ||
          hoursInt == undefined ||
          Number.isNaN(hoursInt) ||
          minutesInt == undefined ||
          Number.isNaN(minutesInt)
        ) {
          setErrorMessage("Invalid time format. Must be numbers");
          return;
        }

        if (
          yearInt < 2023 ||
          yearInt > 2030 ||
          monthInt < 1 ||
          monthInt > 12 ||
          dayInt < 1 ||
          dayInt > 31 ||
          hoursInt < 0 ||
          hoursInt > 23 ||
          minutesInt < 0 ||
          minutesInt > 59
        ) {
          setErrorMessage("Invalid time format. Out of range");
          return;
        }
        try {
          const time = new Date(yearInt, monthInt - 1, dayInt, hoursInt, minutesInt);
          setErrorMessage("");
          try {
            props.set(time);
          } catch (error) {
            setErrorMessage("Error saving value: " + error);
            return;
          }
        } catch (error) {
          setErrorMessage("Invalid time format. Invalid date: " + error);
          return;
        }
      }}
    />
  );
};
