import { View, Text, Image, Button, StyleSheet } from "react-native";
import { useEffect, useState } from "react";
import Icon from 'react-native-vector-icons/MaterialIcons';
import { mockEventClimbing } from "../../utils/model/EventObject";
import EventDate from "../molecules/EventDate";

const EventDetails = ({navigation}: any) => {

  const [event, setEvent] = useState({
    title: mockEventClimbing.name,
    date: "TUE, MAR 28 08:00 EDT",
    location: mockEventClimbing.location,
    organizer: mockEventClimbing.organizer.name,
    description: mockEventClimbing.description
  });

  // useEffect(() => {
  //   setEvent({
  //     title: route.params.item.name,
  //     date: route.params.item.date,
  //     location: route.params.item.location,
  //     organizer: route.params.item.organizer,
  //     description: route.params.item.description
  //   });
  // }, [route]);

  return (
      <View style={styles.big_container}>
         
         <Image 
            source={{uri: 'https://media.npr.org/assets/img/2022/11/04/gettyimages-1183414292-1-_slide-edff8c3fe6afcab5c6457e3c7bd011f5c1745161-s1100-c50.jpg'}}
            style={{width: '100%', height: 300, borderRadius: 10}}
            resizeMethod="resize"
          />

          {/* Event Details */}
          {/* Event Title */}
          <Text style={styles.title}> {event.title}</Text>

          {/* Event Date */}
          <View style={styles.container}>
            <Icon color="grey" name="event" size={30} />
            <Text style={styles.regular_text}> {event.date} </Text>
          </View>

          {/* Event Location */}
          <View style={styles.container}>
            <Icon
                color="grey"
                name="place"
                size={30}
              />
            <Text style={styles.regular_text}> {event.location} </Text>
          </View>
          <View style={styles.container}>
            <Icon
                color="grey"
                name="person-outline"
                size={30}
              />
            <Text style={styles.regular_text}> {event.organizer} </Text>
          </View>
          <View>
            <Text>About the event</Text>
            <Text style={styles.regular_text}> {event.description} </Text>
          </View>
          <View>
            <Button 
              title="Attend"
              onPress={() => {navigation.navigate('EventSignUpView')}}
            />
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
    fontSize: 30,
    fontWeight: "bold",
    flexWrap: "wrap",
  },
  regular_text: {
    fontSize: 18,
    fontStyle: "normal"
  }
});

export default EventDetails;