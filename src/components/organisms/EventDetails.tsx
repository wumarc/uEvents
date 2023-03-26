import { View, Text, Image, Button, StyleSheet } from "react-native";
import { useState } from "react";
import { Icon } from '@rneui/themed';

const EventDetails = () => {

  const [event, setEvent] = useState({
    title: "Tech Morning: Careers & Coffee",
    date: "Tuesday, March 23, 2021",
    location: "Morisset Library, University of Ottawa",
    organizer: "Faculty of Engineering Society",
    description: "This is a great to help you get to know the Faculty of Engineering and the many opportunities available to you."
  });

  return (
      <View style={styles.big_container}>
         {/* <Image source={require("../../assets/icon.png")} /> */}
          <Text style={styles.title}> {event.title} </Text>
          <View style={styles.container}>
            <Icon name="rowing"/>
            <Text style={styles.regular_text}> {event.date} </Text>
          </View>
          <View style={styles.container}>
            <Icon name="rowing"/>
            <Text style={styles.regular_text}> {event.location} </Text>
          </View>
          <View >
            <Text style={styles.regular_text}> {event.organizer} </Text>
          </View>
          <View>
            <Text style={styles.regular_text}> {event.description} </Text>
          </View>
          <View>
            <Button title="Attend"/>
          </View>
      </View>
  ); 
};

const styles = StyleSheet.create({
  big_container: {
    marginHorizontal: 20,
    marginVertical: 10,
  },
  container: {
    flexDirection: "row",
    alignItems: "stretch"
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
  },
  regular_text: {
    fontSize: 18,
    fontStyle: "normal"
  }
});

export default EventDetails;