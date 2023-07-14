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
import EventEditor from "../../organisms/EventEditor";

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
  return (
    <EventEditor default={event} set={(newVal: EventObject) => set(newVal)}>
      <Button
        onPress={() => {
          navigation.pop();
        }}
      >
        Done
      </Button>
    </EventEditor>
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
