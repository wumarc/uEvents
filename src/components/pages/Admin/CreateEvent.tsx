import { View, Text, FlatList, ScrollView } from "react-native";
import { FC, useState } from "react";
import { Timestamp } from "firebase/firestore";
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
import { StyleSheet } from "react-native";
import { Button, Input, Slider, Switch } from "react-native-elements";
import { ToggleButton } from "react-native-paper";
import { useDownloadURL } from "react-firebase-hooks/storage";
import { ref } from "firebase/storage";
import FirebaseImage from "../../organisms/FirebaseImage";
import EventEditor from "../../organisms/EventEditor";

type props = NativeStackScreenProps<RootStackParamList, "createEvent">;
// To access the type of user, use route.params.userType

const CreateEvent = ({ route, navigation }: props) => {
  // const [event, setEvent] = useState<EventObject>(defaultEvent);
  // const [id, setId] = useState<string>(uid());
  const [organizerName, setOrganizerName] = useState<string>("");

  return (
    <View>
      <Input
        label="Organizer Name"
        placeholder="Enter Organizer Name"
        value={organizerName}
        onChangeText={(text) => {
          setOrganizerName(text);
        }}
      />
  
      <CustomButton
        buttonName={"Add Event"}
        onPressListener={() => {
          // Adding the event to the database
          navigation.navigate("Step0", {useDefault: false, organizerName: organizerName, eventID: undefined, isAdmin: true});
        }}
      />
      <CustomButton
        buttonName={"Add Event One Page"}
        onPressListener={() => {
          // Adding the event to the database
          navigation.navigate("OnePageCreateEvent", {});
        }}
      />
      <CustomButton
        buttonName={"Add Event (Web)"}
        onPressListener={() => {
          // Adding the event to the database
          navigation.navigate("CreateEventWeb", {});
        }}
      />
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
