import { View, Text, ScrollView } from "react-native";
import { mockEventClimbing } from "../../utils/model/EventObject";
import Event from "../organisms/Event";

const SavedEvents = () => {
  return (
    <ScrollView
      style={{
        height: "100%",
        width: "100%",
      }}
    >
      <Text>Your Saved Events</Text>
      <Event event={mockEventClimbing} />
    </ScrollView>
  );
};

export default SavedEvents;
