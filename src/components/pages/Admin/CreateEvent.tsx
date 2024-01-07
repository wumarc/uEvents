import { View, Text, FlatList, ScrollView, Platform } from "react-native";
import { useState } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import CustomButton from "../../atoms/CustomButton";
import { StyleSheet } from "react-native";
import { Input } from "react-native-elements";
import { RootStackParamList } from "../../../../main";

type props = NativeStackScreenProps<RootStackParamList, "CreateEvent">;

const CreateEvent = ({ route, navigation }: props) => {
  const [organizerName, setOrganizerName] = useState<string>("");

  return (
    <View>
      <Input
        label="Organizer Name"
        placeholder="Enter Organizer Name"
        disabled={Platform.OS === "web"}
        value={organizerName}
        onChangeText={(text) => {
          setOrganizerName(text);
        }}
      />

      <CustomButton
        buttonName={"Add Event"}
        disabled={Platform.OS === "web"}
        onPress={() => {
          // Adding the event to the database
          navigation.navigate("Step0", { useDefault: false, organizerName: organizerName, eventID: undefined, isAdmin: true });
        }}
      />
      <Text style={{ marginTop: 10 }}>This is the new updated version of the form. Recommend using that one with a browser.</Text>
      <CustomButton
        buttonName={"Add Event (Web)"}
        disabled={Platform.OS !== "web"}
        onPress={() => {
          // Adding the event to the database
          navigation.navigate("CreateEventWeb", {});
        }}
      />
      <Text style={{ marginTop: 10 }}>Add a fake event that will not be shown to the user.</Text>
      <CustomButton
        buttonName={"Add test Event (Web)"}
        disabled={Platform.OS !== "web"}
        onPress={() => {
          // Adding the event to the database
          navigation.navigate("CreateEventWeb", { fake: true });
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
