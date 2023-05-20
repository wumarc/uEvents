import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import Event from "../components/organisms/Event";
import { mockEventClimbing } from "../utils/model/EventObject";


const SignedupEventsPage = () => {

  let placeholders = ['1', '1', '1', '1', '1']

  const openEvents = () => {
    console.log("Open Event");
  }

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

      {/* List of events, we will eventually replace placeholders with events from the db */}
      {placeholders.map((item, index) => {
        return (
          <TouchableOpacity
            key={index}
            onPress={() => {}}
          >
              <Event
                key={index}
                event={mockEventClimbing}
              />
          </TouchableOpacity>
        );
      })}

    </ScrollView>
  );
};

export default SignedupEventsPage;
