import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Linking,
  ImageBackground,
} from "react-native";
import { EventObject } from "../../../utils/model/EventObject";
import { Button } from "react-native-elements";
import { colours } from "../../subatoms/colours";
import { Subtitle, regularText } from "../../subatoms/Theme";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "./main";
import { useStateWithFireStoreDocument } from "../../../utils/useStateWithFirebase";
import { StatusBar } from "react-native";
import DateCard from "../../atoms/DateCard";
import { LinearGradient } from "expo-linear-gradient";

type props = NativeStackScreenProps<RootStackParamList, "EventDetailsView">;
// To access the type of user, use route.params.userType

const EventDetails = ({ route, navigation }: props) => {
  const [loading, event, set] = useStateWithFireStoreDocument<EventObject>(
    "events",
    route.params.eventID
  );

  // const [loading2, organizer, set2] = useStateWithFireStoreDocument<Organizer>(
  //   "users",
  //   route.params.organizerID
  // );

  if (loading) {
    return <ActivityIndicator />;
  }

  return (
    <View style={styles.big_container}>
      {/* Event Details */}
      <View style={{ flex: 1 }}>
        <ScrollView style={{ backgroundColor: colours.secondaryPurple }}>
          {/* Event Image */}
          <ImageBackground
            style={{ width: "100%", height: "100%" }}
            source={{
              uri: "https://i.pinimg.com/originals/a2/cd/2c/a2cd2c7e4383e563cc6a65489968b5af.jpg",
            }}
          >
            <LinearGradient
              colors={["#00000000", "#6B556B"]}
              style={{
                height: "100%",
                width: "100%",
                justifyContent: "flex-end",
              }}
            >
              {/* Event name */}
              <View style={{ paddingHorizontal: 10 }}>
                <Text style={styles.title}>{event.name}</Text>
                <Text style={{ color: "white" }}>{event.organizer}</Text>
              </View>
            </LinearGradient>
          </ImageBackground>

          {/* Event Description */}
          <LinearGradient
            colors={["#6B556B", colours.secondaryPurple]}
            style={{ height: "100%", width: "100%", flexGrow: 1 }}
          >
            <View style={{ paddingHorizontal: 10 }}>
              {/* Event date */}
              <View style={{ flexDirection: "row" }}>
                <DateCard line1={"29"} line2={"December"} />
                <DateCard line1={"Tuesday"} line2={"10:00 PM - End"} />
              </View>

              {/* Event location */}
              <View>
                <Text>{event.location}</Text>
              </View>

              {/* Event description */}
              <View>
                <Text style={styles.title}>About the event</Text>
                <Text style={regularText}>{event.description} </Text>
              </View>
            </View>
          </LinearGradient>
        </ScrollView>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.price}>$10</Text>
        <Button
          buttonStyle={{
            backgroundColor: colours.primaryPurple,
            padding: 15,
            borderRadius: 15,
          }}
          title="View"
          icon={{
            name: "external-link",
            type: "font-awesome",
            size: 15,
            color: "white",
          }}
          // containerStyle= {{
          //   width: 150,
          //   marginHorizontal: 50,
          //   marginVertical: 10,
          // }}
          onPress={() => {
            Linking.openURL("https://www.google.com");
            // navigation.navigate("EventSignUpView", {
            //   userType: route.params.userType,
            // });
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  big_container: {
    flex: 1,
    justifyContent: "space-between",
  },
  title: {
    fontSize: 25,
    fontWeight: "600",
    flexWrap: "wrap",
    color: "white",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
    paddingHorizontal: 5,
    alignItems: "center",
    // backgroundColor: colours.secondaryGrey,
    backgroundColor: colours.secondaryPurple,
  },
  price: {
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default EventDetails;
