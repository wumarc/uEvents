import { StyleSheet } from "react-native";
import { BottomNavigation, Text } from "react-native-paper";
import { SafeAreaView, View } from "react-native";
import { useEffect, useState } from "react";
import { EventObject } from "../../model/EventObject";
import { Card, Button } from "react-native-paper";

const Event: React.FC<any> = ({props}) => {

  const [event, setEvent] = useState<EventObject>({
    name: "",
    description: "",
    date: null,
    time: null,
    location: "",
    organizer: "",
    num_attendees: 30,
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
    <Card style={styles.container}>
      <Text>{event.name}</Text>
      {/* <Card.Title title={event.name}/> This line is giving a node issue*/}
      <Card.Content>
        <Text>{event.description}</Text>
        <Text> Number of attendes: {event.num_attendees} </Text>
      </Card.Content>
      <Card.Actions>
        <Button>Details</Button>
      </Card.Actions>
    </Card>
  );
  
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 15,
    marginHorizontal: 5,
  }
})

export default Event;