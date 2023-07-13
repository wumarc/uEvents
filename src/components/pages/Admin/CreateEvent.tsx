import { View, Text, FlatList } from "react-native";
import { FC, useState } from "react";
import { Timestamp } from "firebase/firestore";
import { Button, Input, Header } from "@rneui/base";
import {
  addDocumentToCollection,
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
import { useDownloadURL } from "react-firebase-hooks/storage";
import { ref } from "firebase/storage";
import FirebaseImage from "../../organisms/FirebaseImage";

type props = NativeStackScreenProps<RootStackParamList, "createEvent">;
// To access the type of user, use route.params.userType

const CreateEvent = ({ route, navigation }: props) => {
  const [event, setEvent] = useState<EventObject>(defaultEvent);
  const [id, setId] = useState<string>(uid());

  return (
    <View style={styles.container}>
      <View>
        <FlatList
          data={event.images}
          renderItem={({ item }) => <FirebaseImage id={item} />}
        />
        <Button
          onPress={() => navigation.navigate("UploadFile", { eventId: id })}
        >
          Upload image
        </Button>
        <Input
          placeholder="Name"
          onChangeText={(value) => setEvent({ ...event, name: value })}
        />
        <Input
          placeholder="Price"
          onChangeText={(value) => {
            setEvent({
              ...event,
              price: parseInt(value),
            });
          }}
        />
        <Input
          placeholder="Description"
          onChangeText={(value) => setEvent({ ...event, description: value })}
        />
        <Input
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
            setEvent({ ...event, time: Timestamp.fromDate(time) });
          }}
        />
        <Input
          placeholder="Location"
          onChangeText={(value) => setEvent({ ...event, location: value })}
        />
        <Input
          placeholder={"Organizer"}
          onChangeText={(value) => {
            setEvent({
              ...event,
              organizer: value,
            });
          }}
        />
        <Input
          placeholder={
            "Categories (Make sure you write the category exactly as it is in the list of categories!!!)"
          }
          onChangeText={(value: string) => {
            let categories = value
              .replace(" ", "")
              .split(",") as EventCategory[];
            setEvent({
              ...event,
              categories: categories,
            });
          }}
        />
        <View>
          <Text>On Campus</Text>
        </View>
        <Switch
          onValueChange={(value) => {
            setEvent({
              ...event,
              onCampus: value,
            });
          }}
        />

        <Input
          placeholder={"food"}
          onChangeText={(value) => {
            let food: string | undefined = value;
            if (value == "") {
              food = undefined;
            }
            setEvent({
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
            setEvent({
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
            setEvent({
              ...event,
              toBring: toBring,
            });
          }}
        />

        <Input
          placeholder={"Includes"}
          onChangeText={(value) => {
            let includes: string | undefined = value;
            if (value == "") {
              includes = undefined;
            }
            setEvent({
              ...event,
              includes: includes,
            });
          }}
        />

        <Input
          placeholder={"Transportation"}
          onChangeText={(value) => {
            let transport: string | undefined = value;
            if (value == "") {
              transport = undefined;
            }
            setEvent({
              ...event,
              transportation: transport,
            });
          }}
        />

        <Input
          placeholder={"Sign Up Link"}
          onChangeText={(value) => {
            let signUpLink: string | undefined = value;
            if (value == "") {
              signUpLink = undefined;
            }
            setEvent({
              ...event,
              signUpLink: signUpLink,
            });
          }}
        />

        <Input
          placeholder={"Original Link"}
          onChangeText={(value) => {
            setEvent({
              ...event,
              originalLink: value,
            });
          }}
        />

        {/* Buttons */}
        <View>
          <CustomButton
            buttonName={"Add Event"}
            onPressListener={() => {
              // Adding the event to the database
              event.id = id;
              addDocumentToCollection<EventObject>("events", event.id, event);
              navigation.navigate("allEvents", {});
            }}
          />
        </View>
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

export default CreateEvent;
