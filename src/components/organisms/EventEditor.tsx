import { View, Text, FlatList, ScrollView } from "react-native";
import { FC } from "react";
import { Timestamp } from "firebase/firestore";
import { EventCategory, EventObject } from "../../utils/model/EventObject";
import CustomButton from "../atoms/CustomButton";
import { StyleSheet } from "react-native";
import { Input, Switch } from "react-native-elements";
import FirebaseImage from "./FirebaseImage";

const EventEditor: FC<{
  default: EventObject;
  set: (newVal: EventObject) => null;
}> = (props) => {
  let event = props.default;

  return (
    <ScrollView style={styles.container}>
      <View>
        <FlatList
          data={event.images}
          renderItem={({ item }) => <FirebaseImage id={item} />}
        />

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
          label="Description (Mandatory)"
          onChangeText={(value) => props.set({ ...event, description: value })}
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
            props.set({ ...event, time: Timestamp.fromDate(time) });
          }}
        />
        <Input
          placeholder="Location"
          onChangeText={(value) => props.set({ ...event, location: value })}
        />
        <Input
          placeholder="Address"
          onChangeText={(value) => props.set({ ...event, address: value })}
        />
        <Input
          placeholder={"Organizer"}
          onChangeText={(value) => {
            props.set({
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
          onValueChange={(value) => {
            props.set({
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
            props.set({
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
            props.set({
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
            props.set({
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
            props.set({
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
            props.set({
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
            props.set({
              ...event,
              signUpLink: signUpLink,
            });
          }}
        />

        <Input
          placeholder={"Original Link"}
          onChangeText={(value) => {
            props.set({
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
              navigation.navigate("UploadFile", { eventId: id });
              navigation.navigate("allEvents", {});
            }}
          />
        </View>
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

export default CreateEvent;
