import { View, Text, FlatList, ScrollView } from "react-native";
import { useState } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../Admin/main";
import CustomButton from "../../atoms/CustomButton";
import { StyleSheet } from "react-native";
import { Input } from "react-native-elements";

type props = NativeStackScreenProps<RootStackParamList, "createEvent">;

const CreateEvent = ({ route, navigation }: props) => {
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
        onPress={() => {
          // Adding the event to the database
          navigation.navigate("Step0", { useDefault: false, organizerName: organizerName, eventID: undefined, isAdmin: true });
        }}
      />
      <CustomButton
        buttonName={"Add Event One Page"}
        onPress={() => {
          // Adding the event to the database
          navigation.navigate("OnePageCreateEvent", {});
        }}
      />
      <Text>This is the new updated version of the form. Recommend using that one with a browser.</Text>
      <CustomButton
        buttonName={"Add Event (Web)"}
        onPress={() => {
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
