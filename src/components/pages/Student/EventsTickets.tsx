import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import Ticket from "../../organisms/Ticket";
import { Dimensions } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "./main";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

let placeholders = ["1", "1", "1"];

type props = NativeStackScreenProps<RootStackParamList, "Events">;
// To access the type of user, use route.params.userType

const EventsTickets = ({ route, navigation }: props) => {
  return (
    <View style={styles.container}>
      <ScrollView
        style={{}}
        horizontal
        pagingEnabled
        nestedScrollEnabled
        showsHorizontalScrollIndicator={true}
      >
        {placeholders.map((child, index) => (
          <View style={styles.ticket} key={index}>
            <Ticket />
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // padding: ScreenSpacing.paddingHorizontal,
    flex: 1,
  },
  ticket: {
    paddingHorizontal: windowWidth * 0.05,
    justifyContent: "center",
  },
});

export default EventsTickets;
