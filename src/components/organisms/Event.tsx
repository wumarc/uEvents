import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Text, Icon } from "@rneui/base";
import { emojiUrl, getFirebaseUserIDOrEmpty, getNextDate, isLogged } from "../../utils/util";
import { colours, fonts, windowHeight, windowWidth } from "../subatoms/Theme";
import { useStateWithFireStoreDocument, useStateWithFireStoreDocumentLogged, useStateWithFireStoreImage } from "../../utils/useStateWithFirebase";
import { Loading } from "../pages/Common/Loading";
import { nextStartTime, nextEndTime, EventObject, getTimeInAMPM, formattedDate } from "../../utils/model/EventObject";
import { Student } from "../../utils/model/Student";
import { SvgUri } from "react-native-svg";
import { Image } from "@rneui/themed";
import FirebaseImage from "./FirebaseImage";
import { useState } from "react";
import { Timestamp } from "firebase/firestore";
import { Platform } from "react-native";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebaseConfig";

// Event component props
interface EventProps {
  id: string;
  organizer: string;
  navigation: any;
  onSaveEvent: any;
  listView: boolean;
  fake?: boolean;
}

const Event: React.FC<EventProps> = (props) => {
  // Fake
  let isFake = props.fake ?? false;
  let dbPath = isFake ? "events-test" : "events";

  // States
  const [loading, event, setEvent] = useStateWithFireStoreDocument<EventObject>(dbPath, props.id);
  const [loading3, organizer, set2] = useStateWithFireStoreDocument<EventObject>("users", props.organizer);
  const [backupUrl, setBackupUrl] = useState<string | undefined>(undefined);
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
  let [startTime, endTime, hasEnd] = getNextDate(event);

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
        props.navigation.navigate("EventDetailsView", {
          eventID: props.id,
          organizerID: event.organizer,
          imageID: "",
          fake: isFake,
        });
      }}
    >
      <View
        style={{
          flexDirection: "row",
          borderRadius: 13,
        }}
      >
        <View style={{ justifyContent: "center", width: windowWidth * 0.25, height: windowHeight * 0.15 }}>
          {Platform.OS === "web" ? (
            <img
              src={backupUrl ?? emojiUrl(event.emoji)}
              style={{
                width: "100%",
                height: "100%",
              }}
              onError={() => {
                let parts = (backupUrl ?? emojiUrl(event.emoji)).split("-");
                // remove last part
                parts.pop();
                setBackupUrl(parts.join("-") + ".svg");
              }}
            />
          ) : (
            <SvgUri
              width="100%"
              height="100%"
              uri={backupUrl ?? emojiUrl(event.emoji)}
              fill="black"
              onError={() => {
                let parts = (backupUrl ?? emojiUrl(event.emoji)).split("-");
                // remove last part
                parts.pop();
                setBackupUrl(parts.join("-") + ".svg");
              }}
            />
          )}
        </View>

        <View style={{ width: "70%", justifyContent: "center" }}>
          <View>
            <Text style={{ fontWeight: "700", fontSize: 19, color: colours.purple }}>{event.name}</Text>
          </View>

          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <View
              style={{
                paddingLeft: 1,
                width: windowWidth * 0.04,
                height: windowHeight * 0.02,
                borderRadius: windowWidth * 0.05,
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
              {formattedDate(Timestamp.fromDate(startTime), hasEnd ? Timestamp.fromDate(endTime) : undefined)}
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
