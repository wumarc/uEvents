import { View, Text, Image, StyleSheet, ScrollView } from "react-native";
import { useEffect, useState } from "react";
import Icon from 'react-native-vector-icons/MaterialIcons';
import { mockEventClimbing } from "../../utils/model/EventObject";
import EventDate from "../molecules/EventDate";
import { Button } from "react-native-elements";
import { colours } from "../subatoms/colours/colours";
import { Subtitle } from "../subatoms/Spacing";
import EventLocation from "../molecules/EventLocation";
import EventOrganizer from "../molecules/EventOrganizer";

const EventDetails = ({navigation}: any) => {

  const [event, setEvent] = useState({
    title: mockEventClimbing.name,
    date: "Wed, May 31 08:00 EDT",
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

        {/* Event Details  */}
        <View style={styles.container}>
          <ScrollView>

              <Image 
                source={{uri: 'https://media.npr.org/assets/img/2022/11/04/gettyimages-1183414292-1-_slide-edff8c3fe6afcab5c6457e3c7bd011f5c1745161-s1100-c50.jpg'}}
                style={{width: '100%', height: 260, borderRadius: 10}}
                resizeMethod="resize"
              />

              {/* Event Details */}
              {/* Event Title */}
              <Text style={styles.title}> {event.title}</Text>

              {/* Event Date */}
              <View style={{flexDirection: "column"}}>
                <EventDate prop={"date"}/>
                <EventLocation prop={event.location}/>
                <EventOrganizer prop={event.organizer}/>
              </View>

              <View>
                <Text style={styles.title}>About the event</Text>
                <Text style={styles.regular_text}> {event.description} </Text>
              </View>
          </ScrollView>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.price}>$10</Text>
          <Button
            buttonStyle={{
              backgroundColor: colours.primaryPurple,
              padding: 15
            }}
            title="Attend"
            onPress={() => {navigation.navigate('EventSignUpView')}}
          />
        </View>

      </View>
  );
};

const styles = StyleSheet.create({
  big_container: {
    // backgroundColor: "red",
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
  },
  container: {
    paddingHorizontal: 7,
    flexDirection: "row",
    alignItems: "stretch"
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    flexWrap: "wrap",
  },
  regular_text: {
    fontSize: 18,
    fontStyle: "normal"
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
    
    paddingHorizontal: 5,
    alignItems: "center",
    backgroundColor: colours.secondaryGrey,
  },
  price: {
    fontSize: 20,
    fontWeight: "bold",
  }
});

export default EventDetails;