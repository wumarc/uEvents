import { View } from "react-native";
import { useState } from "react";
import { Timestamp } from "firebase/firestore";
import { Button, Input, Header } from "@rneui/base";
import { addDocumentToCollection } from "../../../utils/useStateWithFirebase";
import { defaultEvent, EventObject } from "../../../utils/model/EventObject";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../Student/main";
import { uid } from "../../../utils/util";
import CustomButton from "../../atoms/CustomButton";
import CustomInput from "../../atoms/CustomInput";
import { StyleSheet } from "react-native";

type props = NativeStackScreenProps<RootStackParamList, "Search">;
// To access the type of user, use route.params.userType

const CreateEvent = ({ route, navigation }: props) => {
  const [event, setEvent] = useState<EventObject>(defaultEvent);

  return (
    <View style={styles.container}>
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
          onChangeText={(value) =>
            setEvent({ ...event, date: new Date(value) })
          }
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

        <CustomInput
          input={""}
          placeholder={"Organizer"}
          onChangeListener={() => {
            setEvent({
              ...event,
              organizer: "G1CLkEL9BANpRnWFWIVxhjlXpNv2",
            });
          }} // TODO Use real value of organizer
        />

        {/* Buttons */}
        <View>
          <CustomButton
            buttonName={"Add Event"}
            onPressListener={() => {
              // Adding the event to the database
              event.id = uid();
              addDocumentToCollection<EventObject>("events", event.id, event);
              navigation.pop();
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
