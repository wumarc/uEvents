import {
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { Text, Icon } from "@rneui/base";
import { getFirebaseUserIDOrEmpty } from "../../utils/util";
import { colours } from "../subatoms/colours";
import { useStateWithFireStoreDocument } from "../../utils/useStateWithFirebase";
import { Loading } from "../pages/Common/Loading";
import {
  extractMonth,
  extractDay,
  nextStartTime,
  nextEndTime,
} from "../../utils/model/EventObject";
import { Timestamp } from "firebase/firestore";
import { Student } from "../../utils/model/Student";

// Event component props
interface EventProps {
  id: string;
  navigation: any;
  userType: string;
  onSaveEvent: any;
}

const Event: React.FC<EventProps> = (props) => {
  const [loading, event, setEvent] = useStateWithFireStoreDocument(
    "events",
    props.id
  );

  const [loading2, student, setStudent] =
    useStateWithFireStoreDocument<Student>("users", getFirebaseUserIDOrEmpty());

  if (loading || loading2 || !event) {
    return <Loading />;
  }

  const isSaved = (student.saved ?? []).includes(props.id);

  let image = {
    uri:
      "https://storage.googleapis.com/uevents-a9365.appspot.com/events/" +
      event.images[0],
  };

  // True start time and end time
  let startTime = nextStartTime(event.startTime, event.recurrence);
  let endTime = undefined;
  if (startTime != undefined) {
    endTime = nextEndTime(event.startTime, startTime, event.endTime);
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          props.navigation.navigate("EventDetailsView", {
            userType: props.userType,
            eventID: props.id,
            organizerID: event.organizer,
            imageID: "",
          });
        }}
      >
        <View>
          {/* Image */}
          <View style={styles.row1}>
            <ImageBackground
              style={{
                width: "100%",
                height: 400,
                borderRadius: 14,
                // opacity: 0.7,
              }}
              source={image}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  margin: 5,
                }}
              >
                <View
                  style={{
                    backgroundColor: "white",
                    padding: "1%",
                    borderRadius: 5,
                  }}
                >
                  <Text style={{ fontWeight: "600", fontSize: 14 }}>
                    {extractMonth(startTime as Timestamp)}{" "}
                    {extractDay(startTime as Timestamp)}
                  </Text>
                  <Text>
                    {startTime?.toDate().getHours() +
                      ":" +
                      startTime?.toDate().getMinutes()}
                  </Text>
                  {event.recurrence ? <Text>Recurring</Text> : <></>}
                </View>

                <View>
                  <Icon
                    size={25}
                    type="ionicon"
                    name={isSaved ? "heart" : "heart-outline"}
                    color={isSaved ? colours.secondaryPurple : "white"}
                    containerStyle={{
                      borderStyle: "solid",
                      borderRadius: 50,
                      padding: 5,
                      backgroundColor: "#d1cfcf",
                    }}
                    onPress={() => {
                      if (isSaved) {
                        setStudent({
                          ...student,
                          saved: student.saved.filter(
                            (eventID: string) => eventID !== props.id
                          ),
                        });
                        props.onSaveEvent(false);
                      }
                      if (!isSaved) {
                        setStudent({
                          ...student,
                          saved: [...(student.saved ?? []), props.id],
                        });
                        props.onSaveEvent(true);
                      }
                    }}
                  />
                </View>
              </View>
            </ImageBackground>
          </View>

          {/* Name, Location, Price */}
          <View style={styles.row2}>
            {/* Name and Location */}
            <View style={{ width: "85%" }}>
              <Text style={styles.title}>{event.name}</Text>
              <Text>{event.location}</Text>
            </View>

            {/* Price */}
            <View style={{ justifyContent: "center" }}>
              <Text
                style={{
                  borderRadius: 5,
                  overflow: "hidden", // what does this do???
                  padding: 8,
                  color: "white",
                  fontWeight: "bold",
                  backgroundColor:
                    event.price > 0 ? colours.primaryPurple : "green",
                }}
              >
                {event.price > 0 ? "$" + event.price : "Free"}
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 15,
    flexDirection: "column",
    // backgroundColor: colours.primaryPurple,
    maxWidth: "100%",
    marginHorizontal: "auto",
  },
  row1: {
    flexDirection: "row",
  },
  row2: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 13,
    paddingVertical: 5,
  },
  image: {
    flexDirection: "column",
    width: "30%",
  },
  title: {
    marginBottom: 3,
    fontSize: 20,
    fontWeight: "700",
    color: colours.primaryPurple,
  },
  eventDetailTitle: {
    fontWeight: "bold",
    color: colours.primaryPurple,
    flex: 1,
    width: 1,
    fontSize: 18,
  },
  eventDate: {
    fontWeight: "bold",
    color: colours.primaryPurple,
    fontSize: 16,
  },
});

export default Event;
