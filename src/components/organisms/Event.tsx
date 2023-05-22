import { Image, StyleSheet, View } from "react-native";
import { useEffect, useState } from "react";
import { EventObject } from "../../utils/model/EventObject";
import { Text, Icon } from "@rneui/base";
import convertDate from "../../utils/util";
import EventDivider from "../atoms/EventDivider";

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
                style={{ width: 100, height: 100 }}
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
        <View style={{
            flexDirection: "column", 
            // backgroundColor: "orange",
            justifyContent: "space-between"
        }}>
          {/* Bubble 1: Friends who are going */}
          <Icon
            name="people"
          />
          {/* Bubble 2: TBD */}
          <Icon
            name="people"
          />
          {/* Bubble 3: Save event */}
          <Icon
            name="favorite"
          />
        </View>

      </View>

      <EventDivider/>
    
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    marginTop: 10,
    marginHorizontal: 15,
    // backgroundColor: "blue"
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    // fontFamily: "Arial"
  },
  date: {
    fontWeight: "bold",
    color: "red",
  },
  organization: {
    fontWeight: "normal",
  },
  bubbles: { 
    
  }
});

export default Event;
