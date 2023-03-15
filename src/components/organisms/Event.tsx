import { BottomNavigation, Text } from "react-native-paper";
import { SafeAreaView, View } from "react-native";
import { useEffect, useState } from "react";
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { EventObject } from "../../model/EventObject";

const Event: React.FC<any> = ({props}) => {

  const [event, setEvent] = useState<EventObject>({
    name: "",
    description: "",
    date: null,
    time: null,
    location: "",
    organizer: "",
    num_attendees: 0,
  });

  useEffect(() => {
    setEvent({
      name: props.name,
      description: props.description,
      date: props.date,
      time: props.time,
      location: props.location,
      organizer: props.organizer,
      num_attendees: props.num_attendees,
    });
  }, [props]);

  return (
    <View>
      <Text>Event details</Text>
      <Text> {event.name} </Text>
      <Text> {event.description} </Text>
      <Text> Number of attendes: {event.num_attendees} </Text> 
    </View>
  );
  
};

export default Event;