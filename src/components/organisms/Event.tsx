import { Image, StyleSheet, View } from "react-native";
import { useEffect, useState } from "react";
import { EventObject } from "../../utils/model/EventObject";
import { Text, Icon } from "@rneui/base";
import convertDate from "../../utils/util";
import { Avatar, colors } from 'react-native-elements';
import { colours } from "../subatoms/colours/colours";

// Event component props
interface EventProps {
  event: EventObject;
}

const Event: React.FC<EventProps> = (props) => {
  const [event, setEvent] = useState<EventObject>(props.event);

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
    <View>
      <View style={styles.container}>

        {/* Event and Event Details */}
        <View>
          <View style={{flexDirection: "row"}}>

            {/* Image */}
            <View style={styles.imageContainer}>
              <Image
                style={{ width: 100, height: 100, borderRadius: 15}}
                source={require("../../assets/octo.jpeg")}
              />
            </View>

            {/* Event Details */}
            <View style={styles.eventDetails}>
              <Text style={styles.title}>{event.name}</Text>
              <Text style={styles.eventDetailswhite}><Text style={styles.eventDetailTitle}>Date: </Text> {convertDate(new Date())}</Text>
              <Text style={styles.eventDetailswhite}><Text style={styles.eventDetailTitle}>Location: </Text> {event.location}</Text>
              <Text style={styles.eventDetailswhite}><Text style={styles.eventDetailTitle}>Price: </Text>Free on Mondays</Text>
            </View>

          </View>

        </View>

        {/* Event Participants Section */}
        <View style={styles.buttons}>
          {/* Bubble 1: Friends who are going */}
          <Avatar
            size={40}
            rounded
            title={event.attendees.length.toString()}
            icon={{ name: "people", type: "material" }}
            containerStyle={styles.buttonStyle}
            onPress={() => console.log("See who is going")}
          />
          {/* Bubble 3: Save event */}
          <Avatar
            size={40}
            rounded
            icon={{ name: "bookmark", type: "material" }}
            // containerStyle={styles.buttonStyle}
            onPress={() => console.log("Save the event!")}
            containerStyle={styles.buttonStyle}
          />
        </View>

      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    marginTop: 10,
    paddingHorizontal: 8,
    paddingVertical: 14,
    borderRadius: 10,
    backgroundColor: "#cccccc",
    justifyContent: "space-between",
  },
  imageContainer: {
    flexDirection: "column",
  },
  eventDetails: {
    flexDirection: "column",
    paddingHorizontal: 10,
  },
  title: {
    fontSize: 19,
    fontWeight: "bold",
    marginBottom: 5,
    color: colours.primary,
    // fontFamily: "Arial"
  },
  buttons: {
    flexDirection: "column",
    justifyContent: "space-around"
  },
  buttonStyle: {
    borderStyle: "solid",
    borderWidth: 3,
    borderColor: colours.secondary,
  },
  eventDetailTitle: {
    fontWeight: "bold",
    color: colours.primary,
    flex: 1,
    width: 1,
    fontSize: 15,
  },
  eventDetailswhite: {
    color: "white",
    fontWeight: "bold"
  }

});

export default Event;
