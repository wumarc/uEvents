import { View, Text, Image } from "react-native";
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

type props = NativeStackScreenProps<RootStackParamList, "EditEvent">;
// To access the type of user, use route.params.userType

const EditEvent = ({ route, navigation }: props) => {
  const [loading, event, set] = useStateWithFireStoreDocument<EventObject>(
    "events",
    route.params.eventId
  );

  const [loading2, url, found] = useStateWithFireStoreImage(
    route.params.eventId
  );

  if (loading || loading2) {
    return <Text>Loading</Text>;
  }

  return (
    <View style={styles.container}>
      <View>
        {found ? (
          <Image style={{ height: 400, width: 300 }} source={{ uri: url }} />
        ) : (
          <Text>No image found</Text>
        )}
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
          defaultValue={event.description}
          placeholder="Description"
          onChangeText={(value) => set({ ...event, description: value })}
        />
        <Input
          defaultValue="0000-00-00"
          placeholder="Date YYYY-MM-DD"
          onChangeText={(value) => set({ ...event, date: new Date(value) })}
        />
        <Input
          defaultValue="00:00"
          placeholder="Time HH:MM"
          onChangeText={(value) => {
            const [hours, minutes] = value.split(":");
            // Convert to milliseconds
            const time = new Date(
              0,
              0,
              0,
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
          defaultValue=""
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
