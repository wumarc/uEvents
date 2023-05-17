import { View, Text } from "react-native";
import Event from "../components/organisms/Event";
import { mockEventClimbing } from "../utils/model/EventObject";

const SavedEventsPage = () => {
  return (
    <View>
      <Text>Your Saved Events</Text>
      <Event event={mockEventClimbing} />
    </View>
  );
};

export default SavedEventsPage;
