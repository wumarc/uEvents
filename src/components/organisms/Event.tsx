import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import { Text, Icon } from "@rneui/base";
import { convertDate, getFirebaseUserIDOrEmpty } from "../../utils/util";
import { colours } from "../subatoms/colours/colours";
import EventDivider from "../atoms/Divider";
import { useStateWithFireStoreDocument } from "../../utils/useStateWithFirebase";
import Toast from "react-native-toast-message";
import { Loading } from "../pages/Common/Loading";

// Event component props
interface EventProps {
  id: string;
  navigation: any;
  userType: string;
}

const Event: React.FC<EventProps> = (props) => {
  // useEffect(() => {
  //   setEvent({
  //     name: props.name,
  //     description: props.description,
  //     date: props.date,
  //     time: props.time,
  //     location: props.location,
  //     organizer: props.organizer,
  //     num_attendees: props.num_attendees,
  //   });
  // }, [props]);

  const [loading, event, setEvent] = useStateWithFireStoreDocument(
    "events",
    props.id
  );

  const isSaved = event?.saved.includes(getFirebaseUserIDOrEmpty());
  
  const showToast = () => {
    Toast.show({
      type: "info",
      text1: "Your event has been saved!",
      text2: "You can view your saved events in the saved page",
      position: "bottom",
      visibilityTime: 1800
    });
  }

  const saveEvent = () => {
    if (isSaved) {
      // Remove from saved
      setEvent({
        ...event,
        saved: event.saved.filter(
          (userID: string) => userID !== getFirebaseUserIDOrEmpty()
        ),
      });
    } else {
      // Add to saved
      setEvent({
        ...event,
        saved: [...event.saved, getFirebaseUserIDOrEmpty()],
      });
    }
  };

  if (loading || !event) {
    return <Loading/>;
  }

  return (
    <TouchableOpacity
      onPress={() => {
        props.navigation.navigate("EventDetailsView", {
          userType: props.userType,
          eventID: props.id,
          organizerID: event.organizer,
        });
      }}
    >
      <View style={styles.container}>
        {/* Event Details and Image */}
        <View style={styles.row1}>
          {/* Event Details */}
          <View style={styles.eventDetails}>
            <Text style={styles.eventDate}>{convertDate(new Date())}</Text>
            <Text style={styles.title}>{event.name}</Text>
            <Text>{event.organizer.name}</Text>
            <Text style={{}}>Free</Text>
          </View>

          {/* Image */}
          <View style={styles.image}>
            <Image
              style={{ width: 100, height: 130, borderRadius: 14 }}
              source={require("../../assets/Adele.jpg")}
            />
          </View>
        </View>

        {/* Number of participants, location and buttons */}
        <View style={styles.row2}>
          {/* Number of participants and location */}
          <View style={{ flexDirection: "column", width: "90%" }}>
            <Text style={{ color: "grey" }}>
              {event.attendees.length.toString()} going • {event.location}
            </Text>
          </View>

          {/* Buttons */}
          <View style={styles.buttons}>
            <Icon
              size={30}
              type="material"
              name="bookmark-outline"
              // Add filling if saved
              color={isSaved ? colours.secondaryPurple : colours.greyText}
              // containerStyle={styles.buttonStyle}
              onPress={() => {
                saveEvent(),
                showToast()
              }}
            />
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    marginTop: 14,
    paddingHorizontal: 15,
    paddingVertical: 14,
    borderRadius: 10,
  },
  row1: {
    flexDirection: "row",
  },
  row2: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 3,
  },
  eventDetails: {
    flexDirection: "column",
    width: "70%",
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
  buttons: {
    flexDirection: "row",
    // justifyContent: "space-around",
  },
  buttonStyle: {
    borderStyle: "solid",
    borderWidth: 3,
    borderColor: "none",
  },
  eventDetailTitle: {
    fontWeight: "bold",
    color: colours.primary,
    flex: 1,
    width: 1,
    fontSize: 18,
  },
  eventDate: {
    fontWeight: "bold",
    color: colours.primary,
    fontSize: 16,
  },
  eventDetailswhite: {
    color: "black",
    fontWeight: "bold",
    marginVertical: 2,
    paddingVertical: 2,
  },
});

export default Event;
