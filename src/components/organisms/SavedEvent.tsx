import { Image, StyleSheet, View } from "react-native";
import { useEffect, useState } from "react";
import { EventObject } from "../../utils/model/EventObject";
import { Divider, Text, color } from "@rneui/base";
import EventDivider from "../atoms/Divider";
import convertDate from "../../utils/util";
import { Icon } from "@rneui/base";


// Event component props
interface EventProps {
  event: EventObject;
}

const SavedEvent: React.FC<EventProps> = (props) => {
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
      <Text style={styles.date}>{convertDate(new Date())}</Text>
      <View style={{ flexDirection: "row" }}>
        <View style={{ flexDirection: "column" }}>
          <Text style={styles.title}>{event.name}</Text>
          <Text>{event.organizer.name}</Text>
        </View>
        <Image
          style={{ width: 100, height: 50 }}
          source={require("../../assets/octo.jpeg")}
        />
        <View> 
          <Icon
            color="red"
            name="favorite"
            onLongPress={() => console.log("onLongPress()")}
            onPress={() => console.log("onPress()")}
            size={30}
            type="material"
          />
        </View>
      </View>
      <View>
        <Text>
          {event.attendees.length} going • {event.location}
        </Text>
      </View>
      <EventDivider />
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

export default SavedEvent;
