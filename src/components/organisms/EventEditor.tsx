import { View, Text, FlatList, ScrollView, Button } from "react-native";
import { FC, useState } from "react";
import { Timestamp } from "firebase/firestore";
import { EventCategory, EventObject } from "../../utils/model/EventObject";
import CustomButton from "../atoms/CustomButton";
import { StyleSheet } from "react-native";
import { Input, Switch } from "react-native-elements";
import FirebaseImage from "./FirebaseImage";
import UploadFile from "./UploadFile";
import { deleteObject, ref } from "firebase/storage";
import { storage } from "../../firebaseConfig";

const EventEditor: FC<{
  default: EventObject;
  set: (newVal: EventObject) => void;
  children?: any;
}> = (props) => {
  // Error messages
  const [nameError, setNameError] = useState<string>("");
  const [priceMinError, setPriceMinError] = useState<string>("");
  const [priceMaxError, setPriceMaxError] = useState<string>("");
  const [priceDescriptionError, setPriceDescriptionError] =
    useState<string>("");
  const [descriptionError, setDescriptionError] = useState<string>("");
  const [locationError, setLocationError] = useState<string>("");
  const [addressError, setAddressError] = useState<string>("");
  const [organizerError, setOrganizerError] = useState<string>("");
  const [startTimeError, setStartTimeError] = useState<string>("");
  const [endTimeError, setEndTimeError] = useState<string>("");
  const [categoriesError, setCategoriesError] = useState<string>("");
  const [foodError, setFoodError] = useState<string>("");
  const [attireError, setAttireError] = useState<string>("");
  const [toBringError, setToBringError] = useState<string>("");
  const [includesError, setIncludesError] = useState<string>("");
  const [transportationError, setTransportationError] = useState<string>("");
  const [signUpLinkError, setSignUpLinkError] = useState<string>("");
  const [originalLinkError, setOriginalLinkError] = useState<string>("");

  let event = props.default;

  let categories = "";

  if (!event.categories) {
    event.categories = [];
  }

  for (const category of event.categories) {
    categories += category + ",";
  }

  // Remove last comma
  categories = categories.substring(0, categories.length - 1);

  function toPrecision(value: number, precision: number) {
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

  let startTimeString = "";
  if (event.startTime) {
    startTimeString +=
      toPrecision(event.startTime.toDate().getFullYear(), 4) + ":";
    startTimeString +=
      toPrecision(event.startTime.toDate().getMonth() + 1, 2) + ":";
    startTimeString += toPrecision(event.startTime.toDate().getDate(), 2) + ":";
    startTimeString +=
      toPrecision(event.startTime.toDate().getHours(), 2) + ":";
    startTimeString += toPrecision(event.startTime.toDate().getMinutes(), 2);
  }

  let endTimeString = "";
  if (event.endTime) {
    endTimeString +=
      toPrecision(event.endTime?.toDate().getFullYear(), 4) + ":";
    endTimeString +=
      toPrecision(event.endTime?.toDate().getMonth() + 1, 2) + ":";
    endTimeString += toPrecision(event.endTime?.toDate().getDate(), 2) + ":";
    endTimeString += toPrecision(event.endTime?.toDate().getHours(), 2) + ":";
    endTimeString += toPrecision(event.endTime?.toDate().getMinutes(), 2);
  }

  return (
    <ScrollView style={styles.container}>
      <View>
        <FlatList
          data={event.images}
          renderItem={({ item }) => (
            <View
              style={{
                flexDirection: "row",
              }}
            >
              <FirebaseImage id={item} />
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Button
                  title="Delete"
                  onPress={() => {
                    // TODO: Delete from storage
                    deleteObject(ref(storage, "events/" + item))
                      .then(() => {
                        alert("Image deleted");
                      })
                      .catch((error) => {
                        alert("Error deleting image in database");
                      });
                    event.images = event.images.filter((id) => id !== item);
                    props.set(event);
                  }}
                />
              </View>
            </View>
          )}
        />

        <UploadFile setImage={(id) => props.set({ ...event, images: [id] })} />

        <Input
          defaultValue={event.name}
          label="Name"
          errorMessage={nameError}
          onChangeText={(value) => props.set({ ...event, name: value })}
        />
        <Input
          defaultValue={event.priceMin?.toString()}
          label="Min Price (Mandatory). If no max price is specified, this is the exact price"
          errorMessage={priceMinError}
          onChangeText={(value) => {
            props.set({
              ...event,
              priceMin: parseInt(value),
            });
          }}
        />
        <Input
          defaultValue={event.priceMax?.toString()}
          label="Max Price (Optional)"
          errorMessage={priceMaxError}
          onChangeText={(value) => {
            props.set({
              ...event,
              priceMax: parseInt(value),
            });
          }}
        />
        <Input
          defaultValue={event.priceDescription}
          errorMessage={priceDescriptionError}
          multiline={true}
          numberOfLines={4}
          label="Price Description (Optional). If needed, a description of the different prices"
          onChangeText={(value) =>
            props.set({ ...event, priceDescription: value })
          }
        />
        <Input
          defaultValue={event.description}
          errorMessage={descriptionError}
          multiline={true}
          numberOfLines={8}
          label="Description (Mandatory)"
          onChangeText={(value) => props.set({ ...event, description: value })}
        />
        <Input
          defaultValue={event.location}
          errorMessage={locationError}
          label="Location"
          onChangeText={(value) => props.set({ ...event, location: value })}
        />
        <Input
          defaultValue={event.address}
          errorMessage={addressError}
          label="Address"
          onChangeText={(value) => props.set({ ...event, address: value })}
        />
        <Input
          defaultValue={event.organizer}
          errorMessage={organizerError}
          label={"Organizer"}
          onChangeText={(value) => {
            props.set({
              ...event,
              organizer: value,
            });
          }}
        />
        <Input
          defaultValue={startTimeString}
          errorMessage={startTimeError}
          label="Start time (Mandatory) (Format: YYYY:MM:DD:HH:MM). If no end time is specified, this is the exact time"
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
              setStartTimeError("Invalid time format. Must be numbers");
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
              setStartTimeError("Invalid time format. Out of range");
              return;
            }
            try {
              const time = new Date(
                yearInt,
                monthInt - 1,
                dayInt,
                hoursInt,
                minutesInt
              );
              setStartTimeError("");
              props.set({ ...event, startTime: Timestamp.fromDate(time) });
            } catch (error) {
              setStartTimeError("Invalid time format. Invalid date");
              return;
            }
          }}
        />
        <Input
          defaultValue={endTimeString}
          errorMessage={endTimeError}
          label="End time (Optional) (Format: YYYY:MM:DD:HH:MM)"
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
              setEndTimeError("Invalid time format. Must be numbers");
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
              setEndTimeError("Invalid time format. Out of range");
              return;
            }
            try {
              const time = new Date(
                yearInt,
                monthInt - 1,
                dayInt,
                hoursInt,
                minutesInt
              );
              setEndTimeError("");
              props.set({ ...event, endTime: Timestamp.fromDate(time) });
            } catch (error) {
              setEndTimeError("Invalid time format. Invalid date");
              return;
            }
          }}
        />
        <Input
          defaultValue={categories}
          errorMessage={categoriesError}
          label={
            "Categories (Optional, coma separated) (Make sure you write the category exactly as it is in the list of categories!!!)"
          }
          onChangeText={(value: string) => {
            let categories = value
              .replace(" ", "")
              .split(",") as EventCategory[];
            props.set({
              ...event,
              categories: categories,
            });
          }}
        />
        <View>
          <Text>On Campus</Text>
        </View>
        <Switch
          value={event.onCampus}
          onValueChange={(value) => {
            props.set({
              ...event,
              onCampus: value,
            });
          }}
        />

        <Input
          label={"food (Optional)"}
          errorMessage={foodError}
          multiline={true}
          defaultValue={event.food}
          numberOfLines={4}
          onChangeText={(value) => {
            let food: string | undefined = value;
            if (value == "") {
              food = undefined;
            }
            props.set({
              ...event,
              food: food,
            });
          }}
        />

        <Input
          label={"attire (Optional)"}
          errorMessage={attireError}
          defaultValue={event.attire}
          multiline={true}
          numberOfLines={4}
          onChangeText={(value) => {
            let attire: string | undefined = value;
            if (value == "") {
              attire = undefined;
            }
            props.set({
              ...event,
              attire: attire,
            });
          }}
        />

        <Input
          label={"To Bring (Optional)"}
          errorMessage={toBringError}
          defaultValue={event.toBring}
          multiline={true}
          numberOfLines={4}
          onChangeText={(value) => {
            let toBring: string | undefined = value;
            if (value == "") {
              toBring = undefined;
            }
            props.set({
              ...event,
              toBring: toBring,
            });
          }}
        />

        <Input
          label={"Includes (Optional)"}
          errorMessage={includesError}
          multiline={true}
          defaultValue={event.includes}
          numberOfLines={4}
          onChangeText={(value) => {
            let includes: string | undefined = value;
            if (value == "") {
              includes = undefined;
            }
            props.set({
              ...event,
              includes: includes,
            });
          }}
        />

        <Input
          label={"Transportation (Optional)"}
          errorMessage={transportationError}
          multiline={true}
          defaultValue={event.transportation}
          numberOfLines={4}
          onChangeText={(value) => {
            let transport: string | undefined = value;
            if (value == "") {
              transport = undefined;
            }
            props.set({
              ...event,
              transportation: transport,
            });
          }}
        />

        <Input
          label={"Sign Up Link (Optional)"}
          errorMessage={signUpLinkError}
          defaultValue={event.signUpLink}
          onChangeText={(value) => {
            let signUpLink: string | undefined = value;
            if (value == "") {
              signUpLink = undefined;
            }
            props.set({
              ...event,
              signUpLink: signUpLink,
            });
          }}
        />

        <Input
          label={"Original Link (Mandatory)"}
          errorMessage={originalLinkError}
          defaultValue={event.originalLink}
          onChangeText={(value) => {
            props.set({
              ...event,
              originalLink: value,
            });
          }}
        />

        {props.children}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "black",
    margin: 15,
    padding: 20,
  },
});

export default EventEditor;
