import { View, Text, ScrollView } from "react-native";
import Event from "../components/organisms/Event";
import { mockEventClimbing } from "../utils/model/EventObject";

const SavedEventsPage = () => {
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

export default SavedEventsPage;
