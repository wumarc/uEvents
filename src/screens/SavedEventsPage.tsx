import { View, Text, ScrollView } from "react-native";
import SavedEvent from "../components/organisms/SavedEvent";
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
      <SavedEvent event={mockEventClimbing} />
    </ScrollView>
  );
};

export default SavedEventsPage;
