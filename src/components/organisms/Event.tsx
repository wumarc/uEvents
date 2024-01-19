import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Text } from "@rneui/base";
import { Icon } from "react-native-elements";
import { eventPath, getFirebaseUserIDOrEmpty, getNextDate } from "../../utils/util";
import { colours, fonts, windowHeight, windowWidth } from "../subatoms/Theme";
import { useStateWithFireStoreDocument, useStateWithFireStoreDocumentLogged } from "../../utils/useStateWithFirebase";
import { Loading } from "../pages/Common/Loading";
import { EventObject, formattedDate } from "../../utils/model/EventObject";
import { Student } from "../../utils/model/Student";
import FirebaseImage from "./FirebaseImage";
import { Timestamp } from "firebase/firestore";
import { Platform } from "react-native";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebaseConfig";
import { EmojiImage } from "./EmojiImage";
import { customLogEvent } from "../../utils/analytics";

// Event component props
interface EventProps {
  id: string;
  organizer: string;
  navigation: any;
  onSaveEvent: any;
  listView: boolean;
  today: Date;
  fake?: boolean;
}

export const Event: React.FC<EventProps> = (props) => {
  // Fake
  let isFake = props.fake ?? false;
  let dbPath = isFake ? "events-test" : eventPath();

  // States
  const [loading, event, setEvent] = useStateWithFireStoreDocument<EventObject>(dbPath, props.id);
  const [loading3, organizer, set2] = useStateWithFireStoreDocument<EventObject>("users", props.organizer);
  const [user, loading4, error] = useAuthState(auth);
  const [loading2, student, setStudent] = useStateWithFireStoreDocumentLogged<Student>(user != null, "users", getFirebaseUserIDOrEmpty());

  if (loading || loading2 || loading3 || loading4 || !event) {
    return <Loading />;
  }

  let isSaved = false;
  if (user && student) {
    isSaved = (student.saved ?? []).includes(props.id);
  }

  // True start time and end time
  let [startTime, endTime, hasEnd] = getNextDate(event, props.today);

  let onCampusText = "";
  switch (event.onCampus) {
    case true:
      onCampusText = "On-campus";
      break;
    case false:
      onCampusText = "Off-campus";
      break;
    case "TBD":
      onCampusText = "TBD";
      break;
    default:
      onCampusText = "On-campus";
      break;
  }

  return (
    <TouchableOpacity
      onPress={() => {
        customLogEvent("Clicked_on_event", { eventId: props.id });
        props.navigation.navigate("EventDetailsView", {
          eventID: props.id,
          organizerID: event.organizer,
          imageID: "",
          fake: isFake,
          today: props.today,
        });
      }}
    >
      <View
        style={{
          flexDirection: "row",
          borderRadius: 13,
        }}
      >
        <EmojiImage emoji={event.emoji} style={{ justifyContent: "center", width: windowWidth * 0.25, height: windowHeight * 0.15 }} />

        <View style={{ width: "70%", justifyContent: "center" }}>
          <View>
            <Text style={{ fontWeight: "700", fontSize: 19, color: colours.purple }}>{event.name}</Text>
          </View>

          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <View
              style={{
                paddingLeft: 1,
                width: Platform.OS != "web" ? windowWidth * 0.04 : 20,
                height: Platform.OS != "web" ? windowHeight * 0.02 : 20,
                borderRadius: Platform.OS != "web" ? windowWidth * 0.05 : 20,
                overflow: "hidden",
                justifyContent: "center",
              }}
            >
              <FirebaseImage style={{ width: "100%", height: "100%", borderRadius: windowWidth * 0.02, overflow: "hidden" }} id={event.organizer} />
            </View>
            <Text style={{ ...fonts.small, fontWeight: "500" }}> {event.organizerType == "Organizer Added" ? organizer.name : event.organizer}</Text>
          </View>

          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Icon name="time-outline" type="ionicon" size={19} color={colours.grey} />
            <Text style={{ ...fonts.small, fontWeight: "500" }}>
              {formattedDate(Timestamp.fromDate(startTime), hasEnd ? Timestamp.fromDate(endTime) : undefined, event.allDay, props.today)}
            </Text>
          </View>

          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Icon name="location-outline" type="ionicon" size={19} color={colours.grey} />
            <Text style={{ ...fonts.small, fontWeight: "500" }}>{onCampusText}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 15,
    borderWidth: 1,
    maxWidth: "100%",
  },
  // shadowProp: {
  //   shadowColor: '#171717',
  //   shadowOffset: {width: -2, height: 4},
  //   shadowOpacity: 0.2,
  //   shadowRadius: 3,
  // },
});

export default Event;
