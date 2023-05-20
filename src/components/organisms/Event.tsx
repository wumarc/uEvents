import { Image, StyleSheet, View } from "react-native";
import { useEffect, useState } from "react";
import { EventObject } from "../../utils/model/EventObject";
import { Divider, Text, color } from "@rneui/base";
import convertDate from "../../utils/util";

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
    <View style={styles.container}>

      {/* Event Details Section */}
      <View style={{ flexDirection: "column" }}>

        { /* Event Description*/}
        <View style={{ flexDirection: "row" }}>

          {/* Event Name, Organizer and Date */}
          <View style={{flexDirection: "column"}}>
            <Text style={styles.date}>{convertDate(new Date())}</Text>
            <Text style={styles.title}>{event.name}</Text>
            <Text>{event.organizer.name}</Text>
          </View>

          { /* Event Image */}
          <View style={{flexDirection: "column"}}>
            <Image
              style={{ width: 100, height: 50 }}
              source={require("../../assets/octo.jpeg")}
            />
          </View>

        </View>
          
        { /* Event Location and Attendees */ }
        <View style={{ flexDirection: "row" }}>
          <Text>
            {event.attendees.length} going • {event.location}
          </Text>
        </View>

      </View>

      {/* Event Participants Section */}
      <View style={{ flexDirection: "column" }}>
        {/* Bubble 1 */}
        {/* Bubble 2 */}
        {/* Bubble 3 */}
      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 15,
    marginHorizontal: 15,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  date: {
    fontWeight: "bold",
    color: "red",
  },
  organization: {
    fontWeight: "normal",
  },
});

export default Event;
