import { Image, ImageBackground, StyleSheet, TouchableOpacity, View } from "react-native";
import { Text, Icon } from "@rneui/base";
import { convertDate, getFirebaseUserIDOrEmpty } from "../../utils/util";
import { colours } from "../subatoms/colours/colours";
import EventDivider from "../atoms/Divider";
import { useStateWithFireStoreDocument } from "../../utils/useStateWithFirebase";
import Toast from "react-native-toast-message";
import { Loading } from "../pages/Common/Loading";
import { Button, Card } from "react-native-elements";
import DateCard from "../atoms/DateCard";

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

        {/* Image */}
        <View style={styles.row1}>
          <ImageBackground
            style={{
              width: "100%", 
              height: 280,
              borderRadius: 14,
              opacity: 0.7,
            }}
            source={require("../../assets/Adele.jpg")}
          >
            <View style={{
              flexDirection: "row",
              justifyContent: "space-between",
            }}>
              <View>
                <DateCard month={"JUN"} day={12}/>
              </View>
              <View>
                <Icon
                  size={40}
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
          </ImageBackground>
        </View>

        {/* Name, Location, Price */}
        <View style={styles.row2}>
          {/* Name and Location */}
          <View style={{width: "85%"}}>
            <Text style={styles.title}>{event.name}</Text>
            <Text>{event.location}</Text>
          </View>

          {/* Price */}
          <View style={{
            padding: 3,
            justifyContent: "center",
            borderRadius: 8,
            backgroundColor: colours.primaryPurple,
          }}>
            <Text style={{
              color: "white",
              fontWeight: "bold",
              padding: 5,
            }}>
              Free
            </Text>
          </View>

        </View>

      </View>      
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 15,
    flexDirection: "column",
    marginTop: 14,
    paddingHorizontal: 15,
    paddingVertical: 14,
  },
  row1: {
    flexDirection: "row",
  },
  row2: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 3,
    backgroundColor: colours.secondaryPurple
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
});

export default Event;
