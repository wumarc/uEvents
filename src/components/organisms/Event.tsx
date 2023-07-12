import { ImageBackground, StyleSheet, TouchableOpacity, View } from "react-native";
import { Text, Icon } from "@rneui/base";
import { getFirebaseUserIDOrEmpty } from "../../utils/util";
import { colours } from "../subatoms/colours";
import { useStateWithFireStoreDocument } from "../../utils/useStateWithFirebase";
import Toast from "react-native-toast-message";
import { Loading } from "../pages/Common/Loading";
import DateCard from "../atoms/DateCard";

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

  const price = 10;
  
  const isSaved = event?.saved.includes(getFirebaseUserIDOrEmpty());

  const saveEvent = () => {
    if (isSaved) {
      // Remove from saved
      setEvent({
        ...event,
        saved: event.saved.filter(
          (userID: string) => userID !== getFirebaseUserIDOrEmpty()
        ),
      });
      props.onSaveEvent(false);
    } else {
      // Add to saved
      setEvent({
        ...event,
        saved: [...event.saved, getFirebaseUserIDOrEmpty()],
      });
      props.onSaveEvent(true);
    }
  };

  if (loading || !event) {
    return <Loading/>;
  }

  return (
    
    <View style={styles.container}>

      <TouchableOpacity
        onPress={() => {
          props.navigation.navigate("EventDetailsView", {
            userType: props.userType,
            eventID: props.id,
            organizerID: event.organizer,
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
                // borderRadius: 14,
                // opacity: 0.7,
              }}
              source={require("../../assets/Adele.jpg")}
            >
              <View style={{
                flexDirection: "row",
                justifyContent: "space-between",
                margin: 5
              }}>

                <View>
                  <DateCard month={"JUN"} day={12}/>
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
                    onPress={() => saveEvent() }
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
              justifyContent: "center",
            }}>
              <Text style={{
                borderRadius: 5,
                overflow: "hidden", // what does this do???
                padding: 8,
                color: "white",
                fontWeight: "bold",
                backgroundColor: price > 0 ? colours.primaryPurple : "green",
              }}>
                { price > 0 ? "$" + price : "Free" }
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