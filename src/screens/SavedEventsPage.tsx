import { View, Text, ScrollView } from "react-native";
import { mockEventClimbing } from "../utils/model/EventObject";
import Event from "../components/organisms/Event";

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
