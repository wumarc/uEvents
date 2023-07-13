import { View, Text, Image, FlatList } from "react-native";
import { useState } from "react";
import { Timestamp } from "firebase/firestore";
import { Button, Input, Header } from "@rneui/base";
import {
  addDocumentToCollection,
  useStateWithFireStoreDocument,
  useStateWithFireStoreImage,
} from "../../../utils/useStateWithFirebase";
import {
  defaultEvent,
  EventCategory,
  EventObject,
} from "../../../utils/model/EventObject";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../Admin/main";
import { uid } from "../../../utils/util";
import CustomButton from "../../atoms/CustomButton";
import CustomInput from "../../atoms/CustomInput";
import { StyleSheet } from "react-native";
import { Slider, Switch } from "react-native-elements";
import { ToggleButton } from "react-native-paper";
import FirebaseImage from "../../organisms/FirebaseImage";

type props = NativeStackScreenProps<RootStackParamList, "EditEvent">;
// To access the type of user, use route.params.userType

const EditEvent = ({ route, navigation }: props) => {
  const [loading, event, set] = useStateWithFireStoreDocument<EventObject>(
    "events",
    route.params.eventId
  );

  if (loading) {
    return <Text>Loading</Text>;
  }

  let categories = "";

  if (!event.categories) {
    event.categories = [];
  }

  for (const category of event.categories) {
    categories += category + ",";
  }
  // Remove last comma
  categories = categories.substring(0, categories.length - 1);

  let timeString = "";
  if (event.time) {
    timeString += event.time.toDate().getFullYear() + ":";
    timeString += event.time.toDate().getMonth() + ":";
    timeString += event.time.toDate().getDate() + ":";
    timeString += event.time.toDate().getHours() + ":";
    timeString += event.time.toDate().getMinutes();
  }

  return (
    <View style={styles.container}>
      <View>
        <FlatList
          data={event.images}
          renderItem={({ item }) => (
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <FirebaseImage id={item} />
              <Button
                onPress={() => {
                  event.images = event.images.filter((id) => id !== item);
                  set(event);
                }}
              >
                Delete
              </Button>
            </View>
          )}
        />
        <Button
          onPress={() =>
            navigation.navigate("UploadFile", { eventId: route.params.eventId })
          }
        >
          Upload image
        </Button>
        <Input
          defaultValue={event.name}
          placeholder="Name"
          onChangeText={(value) => set({ ...event, name: value })}
        />
        <Input
          defaultValue={event.price ? event.price.toString() : ""}
          placeholder="Price"
          onChangeText={(value) => {
            set({
              ...event,
              price: parseInt(value),
            });
          }}
        />
        <Input
          defaultValue={event.description}
          placeholder="Description"
          onChangeText={(value) => set({ ...event, description: value })}
        />
        <Input
          defaultValue={timeString}
          placeholder="Time YYYY:MM:DD:HH:MM"
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
            set({ ...event, time: Timestamp.fromDate(time) });
          }}
        />
        <Input
          defaultValue={event.location}
          placeholder="Location"
          onChangeText={(value) => set({ ...event, location: value })}
        />
        <Input
          defaultValue={event.address}
          placeholder="Address"
          onChangeText={(value) => set({ ...event, address: value })}
        />
        <Input
          defaultValue={event.organizer}
          placeholder={"Organizer"}
          onChangeText={(value) => {
            set({
              ...event,
              organizer: value,
            });
          }}
        />
        <Input
          defaultValue={categories}
          placeholder={
            "Categories (Make sure you write the category exactly as it is in the list of categories!!!)"
          }
          onChangeText={(value: string) => {
            let categories = value
              .replace(" ", "")
              .split(",") as EventCategory[];
            set({
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
            set({
              ...event,
              onCampus: value,
            });
          }}
        />

        <Input
          defaultValue={event.food}
          placeholder={"food"}
          onChangeText={(value) => {
            let food: string | undefined = value;
            if (value == "") {
              food = undefined;
            }
            set({
              ...event,
              food: food,
            });
          }}
        />

        <Input
          placeholder={"attire"}
          onChangeText={(value) => {
            let attire: string | undefined = value;
            if (value == "") {
              attire = undefined;
            }
            set({
              ...event,
              attire: attire,
            });
          }}
        />

        <Input
          placeholder={"To Bring"}
          onChangeText={(value) => {
            let toBring: string | undefined = value;
            if (value == "") {
              toBring = undefined;
            }
            set({
              ...event,
              toBring: toBring,
            });
          }}
        />

        <Input
          placeholder={"Includes"}
          defaultValue={event.includes}
          onChangeText={(value) => {
            let includes: string | undefined = value;
            if (value == "") {
              includes = undefined;
            }
            set({
              ...event,
              includes: includes,
            });
          }}
        />

        <Input
          defaultValue={event.transportation}
          placeholder={"Transportation"}
          onChangeText={(value) => {
            let transport: string | undefined = value;
            if (value == "") {
              transport = undefined;
            }
            set({
              ...event,
              transportation: transport,
            });
          }}
        />

        <Input
          defaultValue={event.signUpLink ? event.signUpLink : ""}
          placeholder={"Sign Up Link"}
          onChangeText={(value) => {
            let signUpLink: string | undefined = value;
            if (value == "") {
              signUpLink = undefined;
            }
            set({
              ...event,
              signUpLink: signUpLink,
            });
          }}
        />

        <Input
          defaultValue={event.originalLink}
          placeholder={"Original Link"}
          onChangeText={(value) => {
            set({
              ...event,
              originalLink: value,
            });
          }}
        />

        <Button
          onPress={() => {
            navigation.pop();
          }}
        >
          Done
        </Button>
      </View>
    </View>
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

export default EditEvent;
