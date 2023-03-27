import { Image, StyleSheet, View } from "react-native";
import { useEffect, useState } from "react";
import { EventObject } from "../../model/EventObject";
import { Divider, Text, color } from "@rneui/base";
import EventDivider from "../atoms/Divider";
import convertDate from "../../utils/DateConverter";

const Event: React.FC<any> = ({props}) => {

  const [event, setEvent] = useState<EventObject>({
    name: "Fall Hiking and Climbing",
    description: "",
    date: new Date("TUE, MAR 28 08:00 EDT"),
    time: null,
    location: "Morisset Library, University of Ottawa",
    organizer: "uOttawa Outdoors Club",
    num_attendees: 30,
  });

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
      <Text style={styles.date}>{convertDate(new Date())}</Text>
      <View style={{flexDirection: 'row'}}>
        <View style={{flexDirection: 'column'}}>
          <Text style={styles.title}>{event.name}</Text>
          <Text>{event.organizer}</Text>
        </View>
        <Image style={{width: 100, height: 50}} source={require('../../assets/octo.jpeg')}/>
      </View>
      <View>
        <Text>{event.num_attendees} going • {event.location}</Text>
      </View>
      <EventDivider/>
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
    fontWeight: "bold"
  },
  date: {
    fontWeight: "bold",
    color: "red"
  },
  organization: {
    fontWeight: "normal",
  }
})

export default Event;