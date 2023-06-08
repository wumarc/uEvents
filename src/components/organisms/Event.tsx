import { Image, StyleSheet, View } from "react-native";
import { useEffect, useState } from "react";
import { EventObject } from "../../utils/model/EventObject";
import { Text, Icon } from "@rneui/base";
import convertDate from "../../utils/util";
import { Avatar, colors } from "react-native-elements";
import { colours } from "../subatoms/colours/colours";
import EventDivider from "../atoms/Divider";

// Event component props
interface EventProps {
  event: EventObject;
  saveEvent: () => void;
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
      <View style={{ flexDirection: "row" }}>
        {/* Event Details */}
        <View style={styles.eventDetails}>
          <Text style={styles.eventDate}>{convertDate(new Date())}</Text>
          <Text style={styles.title}>{props.event.name}</Text>
          <Text>uOttawa eGaming Club</Text>            
          <Text>Free</Text>
        </View>

        {/* Image */}
        <View style={styles.imageContainer}>
          <Image
            style={{ width: 100, height: 130, borderRadius: 14 }}
            source={require("../../assets/Adele.jpg")}
          />
        </View>

      </View>
      
      {/* Number of participants, location and buttons */}
      <View style={{flexDirection: "row", justifyContent: "space-between", paddingHorizontal: 10,}}>
        
        {/* Number of participants and location */}
        <View>
          <Text style={styles.bottom}>{props.event.attendees.length.toString()} going • {props.event.location}</Text>
        </View>

        {/* Buttons */}
        <View style={styles.buttons}>
          <Icon
            size={30}
            type="material"
            name= "bookmark-outline"
            // containerStyle={styles.buttonStyle}
            onPress={() => { console.log("Save the event!");
              // props.saveEvent(); // TODO Fix this
            }}
          />
          <Icon
            size={30}
            type="material"
            name= "bookmark-outline"
            onPress={() => {}}
          />
        </View>

      </View>

      <EventDivider />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    marginTop: 14,
    paddingHorizontal: 8,
    paddingVertical: 14,
    borderRadius: 10,
  },
  imageContainer: {
    flexDirection: "column",
    width: "30%"
  },
  eventDetails: {
    flexDirection: "column",
    paddingHorizontal: 10,
    width: "70%"
  },
  titleContainer: {
    flexDirection: "row",
    flexShrink: 1,
    flexWrap: "wrap",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 5,
    color: "black",
    // fontFamily: "Arial"
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
    fontSize: 16,
  },
  eventDate: {
    fontWeight: "700",
    color: "grey",
    fontSize: 16,
  },
  eventDetailswhite: {
    color: "black",
    fontWeight: "bold",
    marginVertical: 2,
    paddingVertical: 2
  },
  bottom: {
    color: "grey",
  }
});

export default Event;
