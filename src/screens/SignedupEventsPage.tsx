import { View, Text, ScrollView } from "react-native";
import Event from "../components/organisms/Event";
import { mockEventClimbing } from "../utils/model/EventObject";

const SignedupEventsPage = () => {
  return (
    <ScrollView
      style={{
        height: "100%",
        width: "100%",
      }}
    >
      {/* Title of page */}
      <View>
        <Text>Your Signed Up Events</Text>
      </View>

      <Event event={mockEventClimbing} />
      <Event event={mockEventClimbing} />
      <Event event={mockEventClimbing} />
      <Event event={mockEventClimbing} />
      <Event event={mockEventClimbing} />
      <Event event={mockEventClimbing} />
      <Event event={mockEventClimbing} />
      <Event event={mockEventClimbing} />
    </ScrollView>
  );
};

export default SignedupEventsPage;
