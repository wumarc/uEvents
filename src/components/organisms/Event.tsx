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

        {/* Image */}
        <View style={{flexDirection: "column"}}>
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

        {/* Event Participants Section */}
        <View style={{
            flexDirection: "column", 
            // backgroundColor: "orange",
            justifyContent: "space-between"
        }}>
          {/* Bubble 1: Friends who are going */}
          <Avatar
            size={32}
            rounded
            title={event.attendees.length.toString()}
            icon={{ name: "people", type: "material" }}
            containerStyle={{ backgroundColor: "#9700b9" }}
          />
          {/* Bubble 3: Save event */}
          <Avatar
            size={32}
            rounded
            icon={{ name: "favorite", type: "material" }}
            containerStyle={{ backgroundColor: "#9700b9" }}
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
    marginHorizontal: 5,
    backgroundColor: "#cccccc",
  },
  title: {
    fontSize: 19,
    fontWeight: "bold",
    color: colours.primary,
    // fontFamily: "Arial"
  },
  eventDetailTitle: {
    fontWeight: "bold",
    color: colours.primary,
    fontSize: 15,
  },
  eventDetailswhite: {
    color: "white",
    fontWeight: "bold"
  },
  organization: {
    fontWeight: "normal",
  },
  eventDetails: {
    marginLeft: 10,
    flexDirection: "column",
  }
});

export default Event;
