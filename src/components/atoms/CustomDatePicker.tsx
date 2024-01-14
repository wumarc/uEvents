import { View, Text } from "react-native";
import { CustomButton } from "./CustomButton";
import { TimePickerModal, DatePickerModal } from "react-native-paper-dates";
import { EventObject } from "../../utils/model/EventObject";
import { useState } from "react";
import { Timestamp } from "firebase/firestore";
import CustomInput from "./CustomInput";

interface CustomDatePickerProps {
  time: Timestamp;
  setTime: any;
  selectDateString: string;
  selectTimeString?: string;
  baseStyle?: any;
  useOnlyDate?: boolean;
}

export const CustomDatePicker = ({ time, setTime, selectDateString, selectTimeString, baseStyle, useOnlyDate }: CustomDatePickerProps) => {
  const [timeVisible, settimeVisible] = useState(false);
  const [dateVisible, setdateVisible] = useState(false);

  // Formatted hours
  let formattedHours = "";
  let hours = time.toDate().getHours();
  if (hours < 10) {
    formattedHours = "0" + hours;
  } else {
    formattedHours = hours.toString();
  }

  // Formatted minutes
  let formattedMinutes = "";
  let minutes = time.toDate().getMinutes();
  if (minutes < 10) {
    formattedMinutes = "0" + minutes;
  } else {
    formattedMinutes = minutes.toString();
  }

  // Use only date
  let shouldUseOnlyDate = useOnlyDate ? useOnlyDate : false;

  return (
    <View>
      <View style={{ display: "flex", flexDirection: "row" }}>
        <CustomInput
          value={
            time.toDate().toLocaleString("default", { month: "long" }) +
            " " +
            time.toDate().getDate() +
            " " +
            time.toDate().getFullYear() +
            " : " +
            formattedHours +
            "h " +
            formattedMinutes +
            ""
          }
        />
        <CustomButton
          style={{ ...baseStyle, marginHorizontal: 10 }}
          onPress={() => {
            setdateVisible(true);
          }}
        >
          {selectDateString}
        </CustomButton>
        {!shouldUseOnlyDate && (
          <CustomButton
            style={{ ...baseStyle, marginHorizontal: 10 }}
            onPress={() => {
              settimeVisible(true);
            }}
          >
            {selectTimeString}
          </CustomButton>
        )}
      </View>

      <DatePickerModal
        date={time.toDate()}
        visible={dateVisible}
        onDismiss={() => {
          setdateVisible(false);
        }}
        onConfirm={(value: any) => {
          if (value.date) {
            let date = time.toDate();
            date.setFullYear(value.date.getFullYear());
            date.setMonth(value.date.getMonth());
            date.setDate(value.date.getDate());
            setTime(Timestamp.fromDate(date));
            setdateVisible(false);
          } else {
            setdateVisible(false);
          }
        }}
        mode="single"
        label={selectDateString}
        animationType="fade"
        locale={"en"}
      />
      <TimePickerModal
        hours={time.toDate().getHours()}
        minutes={time.toDate().getMinutes()}
        visible={timeVisible}
        onDismiss={() => {
          settimeVisible(false);
        }}
        onConfirm={(value: any) => {
          if (value) {
            let date = time.toDate();
            date.setHours(value.hours);
            date.setMinutes(value.minutes);
            setTime(Timestamp.fromDate(date));
            settimeVisible(false);
          }
        }}
        label={selectTimeString}
        cancelLabel="Cancel"
        confirmLabel="Ok"
        animationType="fade"
        locale={"en"}
      />
    </View>
  );
};

interface CustomDatePickerListProps {
  label: string;
  times: Timestamp[] | undefined;
  setTimes: any;
  selectDateString: string;
  selectTimeString?: string;
  baseStyle?: any;
  useOnlyDate?: boolean;
}

export const CustomDatePickerList = ({ label, times, setTimes, selectDateString, selectTimeString, baseStyle, useOnlyDate }: CustomDatePickerListProps) => {
  return (
    <View>
      <Text style={{ ...baseStyle, fontSize: 20 }}>{label}</Text>
      {(times ?? []).map((time, index) => {
        return (
          <View key={index} style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
            <CustomDatePicker
              key={index}
              time={time}
              setTime={(newTime: any) => {
                let newTimes = [...(times ?? [])];
                newTimes[index] = newTime;
                setTimes(newTimes);
              }}
              selectDateString={selectDateString}
              selectTimeString={selectTimeString}
              baseStyle={baseStyle}
              useOnlyDate={useOnlyDate}
            />
            <CustomButton
              style={{ ...baseStyle, marginHorizontal: 10 }}
              onPress={() => {
                let newTimes = [...(times ?? [])];
                newTimes.splice(index, 1);
                setTimes(newTimes);
              }}
            >
              Delete
            </CustomButton>
          </View>
        );
      })}
      <CustomButton
        style={{ ...baseStyle }}
        onPress={() => {
          let newTimes = [...(times ?? [])];
          newTimes.push(Timestamp.now());
          setTimes(newTimes);
        }}
      >
        Add
      </CustomButton>
    </View>
  );
};
