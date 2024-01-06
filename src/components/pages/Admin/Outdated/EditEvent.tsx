import { View, Text } from "react-native";
import { useState } from "react";
import { Button } from "@rneui/base";
import { useStateWithFireStoreDocument } from "../../../../utils/useStateWithFirebase";
import { EventObject } from "../../../../utils/model/EventObject";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../main";
import { StyleSheet } from "react-native";
import EventEditor from "../../../organisms/Outdated/EventEditor";

type props = NativeStackScreenProps<RootStackParamList, "EditEvent">;
// To access the type of user, use route.params.userType

const EditEvent = ({ route, navigation }: props) => {
  const [loading, event, set] = useStateWithFireStoreDocument<EventObject>("events", route.params.eventId);

  const [temp, setTemp] = useState<EventObject>(event);

  if (loading) {
    return <Text>Loading</Text>;
  }
  return (
    <EventEditor default={event} set={(newVal: EventObject) => setTemp(newVal)}>
      <Button
        onPress={() => {
          if (temp) {
            set(temp);
          }
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
