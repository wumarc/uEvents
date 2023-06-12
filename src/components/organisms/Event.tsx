import { Image, StyleSheet, View } from "react-native";
import { useEffect, useState } from "react";
import { EventObject } from "../../utils/model/EventObject";
import { Text, Icon } from "@rneui/base";
import { convertDate } from "../../utils/util";
import { colours } from "../subatoms/colours/colours";
import EventDivider from "../atoms/Divider";
import { Title } from "../subatoms/Spacing";

// Event component props
interface EventProps {
  event: EventObject;
  saveEvent: () => void;
  isSaved: boolean;
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

  return (
    <View style={styles.container}>
      {/* Event Details and Image */}
      <View style={styles.row1}>
        {/* Event Details */}
        <View style={styles.eventDetails}>
          <Text style={styles.eventDate}>{convertDate(new Date())}</Text>
          <Text style={styles.title}>{props.event.name}</Text>
          <Text>{props.event.organizer.name}</Text>
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
        <View style={{ flexDirection: "column", alignItems: "center" }}>
          <Text style={{ color: "grey" }}>
            {props.event.attendees.length.toString()} going •{" "}
            {props.event.location}
          </Text>
        </View>

        {/* Buttons */}
        <View style={styles.buttons}>
          <Icon
            size={30}
            type="material"
            name="bookmark-outline"
            // Add filling if saved
            color={props.isSaved ? colours.secondaryPurple : colours.greyText}
            // containerStyle={styles.buttonStyle}
            onPress={() => {
              console.log("Save the event!");
              props.saveEvent();
            }}
          />
        </View>
      </View>
    </View>
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
