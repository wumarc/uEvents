import { View, ScrollView, Text, Settings } from "react-native";
import { useState } from "react";
import SettingsInput from "../../atoms/SettingsInput";
import { addDocumentToCollection } from "../../../utils/useStateWithFirebase";
import {
  defaultEvent,
  EventCategory,
  EventObject,
} from "../../../utils/model/EventObject";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../Student/main";
import { uid } from "../../../utils/util";
import CustomButton from "../../atoms/CustomButton";
import { StyleSheet } from "react-native";
import { colours } from "../../subatoms/colours";
import InputWithLabel from "../../atoms/InputWithLabel";

type props = NativeStackScreenProps<RootStackParamList, "Search">;
// To access the type of user, use route.params.userType

const CreateEvent = ({ route, navigation }: props) => {
  const [event, setEvent] = useState<EventObject>(defaultEvent);

  return (
    <View style={styles.container}>
        <ScrollView>

          <Text style={{fontSize: 33, fontWeight: '600'}}>Create a new event</Text>

          <InputWithLabel
            placeholder="Event Name"
            // onChangeText={(value) => setEvent({ ...event, name: value })}
          />

          <InputWithLabel
            placeholder="Event Description"
            // onChangeText={(value) => setEvent({ ...event, name: value })}
          />

          <InputWithLabel placeholder="Price" />
          <InputWithLabel placeholder="Date" />
          <InputWithLabel placeholder="Location" />
          <InputWithLabel placeholder="Category" />
          <InputWithLabel placeholder="Signup Link" />

          {/*
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

          <Input
            placeholder={"Organizer"}
            onChangeText={(value) => {
              setEvent({
                ...event,
                organizer: value,
              });
            }}
          /> */}

          {/* <Input
            placeholder={"Categories"}
            onChangeText={(value: string) => {
              let categories = value.split(",") as EventCategory[];
              setEvent({
                ...event,
                categories: categories,
              });
            }}
          /> */}

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

        </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: '1%',
  },
});

export default CreateEvent;
