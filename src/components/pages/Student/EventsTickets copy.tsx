import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { mockEventClimbing } from "../../../utils/model/EventObject";
import { ScreenSpacing, Title } from "../../subatoms/Theme";
import Event from "../../organisms/Event";

let placeholders = ["1", "1", "1", "1", "1"];

const EventsTickets = ({ navigation }: any) => {
  return (
    <ScrollView style={styles.container}>
      <View>
        {/* Title of page */}
        <View>
          <Text style={styles.title}>Your events</Text>
        </View>

        {/* List of events, we will eventually replace placeholders with events from the db */}
        {placeholders.map((item, index) => {
          return (
            <TouchableOpacity
              key={index}
              onPress={() => {
                navigation.navigate("EventDetailsView");
              }}
            >
              <Event key={index} event={mockEventClimbing} />
            </TouchableOpacity>
          );
        })}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: ScreenSpacing.paddingHorizontal,
  },
  title: {
    fontSize: Title.fontSize,
    // fontWeight: Title.fontWeight,
  },
});

export default EventsTickets;
