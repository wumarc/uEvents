import { View } from "react-native";
import { useState } from "react";
import { Timestamp } from "firebase/firestore";
import { Button, Input, Header } from "@rneui/base";
import { addDocumentToCollection } from "../../utils/useStateWithFirebase";
import { defaultEvent, EventObject } from "../../utils/model/EventObject";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../main";
import { uid } from "../../utils/util";

type props = NativeStackScreenProps<RootStackParamList, "Search">;
// To access the type of user, use route.params.userType

const CreateEvent = ({ route, navigation }: props) => {
  const [event, setEvent] = useState<EventObject>(defaultEvent);
  return (
    <View>
      <Input
        placeholder="Name"
        onChangeText={(value) => setEvent({ ...event, name: value })}
      />
      <Input
        placeholder="Description"
        onChangeText={(value) => setEvent({ ...event, description: value })}
      />
      <Input
        placeholder="Date YYYY-MM-DD"
        onChangeText={(value) => setEvent({ ...event, date: new Date(value) })}
      />
      <Input
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
          setEvent({ ...event, time: Timestamp.fromDate(time) });
        }}
      />
      <Input
        placeholder="Location"
        onChangeText={(value) => setEvent({ ...event, location: value })}
      />
      <Input
        placeholder="Organizer"
        onChangeText={(value) =>
          setEvent({
            ...event,
            organizer: "G1CLkEL9BANpRnWFWIVxhjlXpNv2",
          })
        } // TODO Use real value of organizer
      />
      <Button
        onPress={() => {
          // Adding the event to the database
          event.id = uid();
          addDocumentToCollection<EventObject>("events", event.id, event);
          navigation.pop();
        }}
      >
        Add event
      </Button>
      <Button
        onPress={() => {
          navigation.pop();
        }}
      >
        Cancel
      </Button>
    </View>
  );
};

export default CreateEvent;
