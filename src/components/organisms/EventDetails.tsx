import { View, Text, Image, StyleSheet, ScrollView } from "react-native";
import { useEffect, useState } from "react";
import Icon from "react-native-vector-icons/MaterialIcons";
import { mockEventClimbing } from "../../utils/model/EventObject";
import EventDate from "../molecules/EventDate";
import { Button } from "react-native-elements";
import { colours } from "../subatoms/colours/colours";
import { Subtitle, regularText } from "../subatoms/Spacing";
import EventLocation from "../molecules/EventLocation";
import EventOrganizer from "../molecules/EventOrganizer";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../main";

type props = NativeStackScreenProps<RootStackParamList, "EventDetailsView">;
// To access the type of user, use route.params.userType

const EventDetails = ({ route, navigation }: props) => {
  const [event, setEvent] = useState({
    title: mockEventClimbing.name,
    date: "Wed, May 31 08:00 EDT",
    location: mockEventClimbing.location,
    organizer: mockEventClimbing.organizer.name,
    description: mockEventClimbing.description,
  });

  // useEffect(() => {
  //   setEvent({
  //     title: route.params.item.name,
  //     date: route.params.item.date,
  //     location: route.params.item.location,
  //     organizer: route.params.item.organizer,
  //     description: route.params.item.description
  //   });
  // }, [route]);

  return (
    <View style={styles.big_container}>
      {/* Event Details  */}
      <View style={styles.container}>
        <ScrollView>
          <Image
            source={{
              uri: "https://media.npr.org/assets/img/2022/11/04/gettyimages-1183414292-1-_slide-edff8c3fe6afcab5c6457e3c7bd011f5c1745161-s1100-c50.jpg",
            }}
            style={{ width: "100%", height: 220, borderRadius: 14 }}
            resizeMethod="resize"
          />

          {/* Event Title */}
          <Text style={styles.title}> {event.title}</Text>

          <View style={{ flexDirection: "column" }}>
            <EventDate prop={"date"} />
            <EventLocation prop={event.location} />
            <EventOrganizer prop={event.organizer} />
          </View>

          <View>
            <Text style={styles.title}>About the event</Text>
            <Text style={regularText}> {event.description} </Text>
          </View>
        </ScrollView>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.price}>$10</Text>
        <Button
          buttonStyle={{
            backgroundColor: colours.primaryPurple,
            padding: 15,
          }}
          title="Attend"
          onPress={() => {
            navigation.navigate("EventSignUpView");
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  big_container: {
    // backgroundColor: "red",
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
    paddingHorizontal: 10,
  },
  container: {
    paddingHorizontal: 7,
    flexDirection: "row",
    alignItems: "stretch",
  },
  title: {
    fontSize: 25,
    fontWeight: "bold",
    flexWrap: "wrap",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
    paddingHorizontal: 5,
    alignItems: "center",
    backgroundColor: colours.secondaryGrey,
  },
  price: {
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default EventDetails;
