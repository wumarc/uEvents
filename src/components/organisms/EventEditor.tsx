import { View, Text, FlatList, ScrollView, Button } from "react-native";
import { FC } from "react";
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

  let startTimeString = "";
  if (event.startTime) {
    startTimeString += event.startTime.toDate().getFullYear() + ":";
    startTimeString += event.startTime.toDate().getMonth() + ":";
    startTimeString += event.startTime.toDate().getDate() + ":";
    startTimeString += event.startTime.toDate().getHours() + ":";
    startTimeString += event.startTime.toDate().getMinutes();
  }

  let endTimeString = "";
  if (event.startTime) {
    endTimeString += event.endTime?.toDate().getFullYear() + ":";
    endTimeString += event.endTime?.toDate().getMonth() + ":";
    endTimeString += event.endTime?.toDate().getDate() + ":";
    endTimeString += event.endTime?.toDate().getHours() + ":";
    endTimeString += event.endTime?.toDate().getMinutes();
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
          onChangeText={(value) => props.set({ ...event, name: value })}
        />
        <Input
          defaultValue={event.priceMin?.toString()}
          label="Min Price (Mandatory). If no max price is specified, this is the exact price"
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
          onChangeText={(value) => {
            props.set({
              ...event,
              priceMax: parseInt(value),
            });
          }}
        />
        <Input
          defaultValue={event.priceDescription}
          multiline={true}
          numberOfLines={4}
          label="Price Description (Optional). If needed, a description of the different prices"
          onChangeText={(value) =>
            props.set({ ...event, priceDescription: value })
          }
        />
        <Input
          defaultValue={event.description}
          multiline={true}
          numberOfLines={8}
          label="Description (Mandatory)"
          onChangeText={(value) => props.set({ ...event, description: value })}
        />
        <Input
          defaultValue={event.location}
          label="Location"
          onChangeText={(value) => props.set({ ...event, location: value })}
        />
        <Input
          defaultValue={event.address}
          label="Address"
          onChangeText={(value) => props.set({ ...event, address: value })}
        />
        <Input
          defaultValue={event.organizer}
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
          label="Start time (Mandatory) (Format: YYYY:MM:DD:HH:MM). If no end time is specified, this is the exact time"
          onChangeText={(value) => {
            const [year, month, day, hours, minutes] = value.split(":");
            // Convert to milliseconds
            const time = new Date(
              parseInt(year as string),
              parseInt(month as string),
              parseInt(day as string),
              parseInt(hours as string),
              parseInt(minutes as string)
            );
            props.set({ ...event, startTime: Timestamp.fromDate(time) });
          }}
        />
        <Input
          defaultValue={endTimeString}
          label="End time (Optional) (Format: YYYY:MM:DD:HH:MM)"
          onChangeText={(value) => {
            const [year, month, day, hours, minutes] = value.split(":");
            // Convert to milliseconds
            const time = new Date(
              parseInt(year as string),
              parseInt(month as string),
              parseInt(day as string),
              parseInt(hours as string),
              parseInt(minutes as string)
            );
            props.set({ ...event, endTime: Timestamp.fromDate(time) });
          }}
        />
        <Input
          defaultValue={categories}
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
          multiline={true}
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
          multiline={true}
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
          multiline={true}
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
