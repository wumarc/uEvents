import { FlatList, SafeAreaView, StatusBar, StyleSheet, Text, View, Pressable } from "react-native";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../firebaseConfig";
import { EventObject } from "../../model/EventObject";
import Event from "../organisms/Event";
import { SegmentedButtons } from "react-native-paper";

const HomePage = ({navigation}: any) => {

  const [value, setValue] = useState('upcoming');
  const [upcomingEvents, setUpcomingEvents] = useState<EventObject[]>([
    {
      name: "St Patrick's Day Climb and Pub",
      description: "Looking for a fun way to celebrate St Patty’s Day☘️ ? Join us this Friday at 6pm for a climb and pub night at Coyote Rock Gym and Liam Maguire’s.",
      num_attendees: 12,
      location: "Coyotte Rock Gym",
      organizer: "uOttwa Outdoors Club",
      date: null
    },
    {
      name: "St. Patrick's Day Climb",
      description: "Looking for a fun way to celebrate St Patty’s Day☘️ ? Join us this Friday at 6pm for a climb and pub night at Coyote Rock Gym and Liam Maguire’s.",
      num_attendees: 12,
      location: "Coyotte Rock Gym",
      organizer: "uOttwa Outdoors Club",
      date: null
    },
    {
      name: "St. Patrick's Pub",
      description: "Looking for a fun way to celebrate St Patty’s Day☘️ ? Join us this Friday at 6pm for a climb and pub night at Coyote Rock Gym and Liam Maguire’s.",
      num_attendees: 12,
      location: "Coyotte Rock Gym",
      organizer: "uOttwa Outdoors Club",
      date: null
    },
    {
      name: "Patrick's Day Climb and Pub",
      description: "Looking for a fun way to celebrate St Patty’s Day☘️ ? Join us this Friday at 6pm for a climb and pub night at Coyote Rock Gym and Liam Maguire’s.",
      num_attendees: 12,
      location: "Coyotte Rock Gym",
      organizer: "uOttwa Outdoors Club",
      date: null
    }
  ]);
  const [goingEvents, setGoingEvents] = useState<EventObject[]>([
    {
      name: "Christmas Party",
      description: "Looking for a fun way to celebrate Christmas? Join us!",
      num_attendees: 50,
      location: "Morisset Library",
      organizer: "Party House",
      date: null
    }
  ]);
  const [savedEvents, setSavedEvents] = useState<EventObject[]>([
    {
      name: "5v5 Basketball",
      description: "Join us for a fun 5v5 basketball game!",
      num_attendees: 50,
      location: "Minto Gym",
      organizer: "uOttawa Athletics",
      date: null
    }
  ]);

  const [selectedEvent, setSelectedEvent] = useState<string>("");

  return (
      <SafeAreaView style={styles.container}>
        <SegmentedButtons
            value={value}
            onValueChange={setValue}
            buttons={[
              { value: 'upcoming', label: 'Upcoming', onPress: () => setValue('upcoming') },
              { value: 'going', label: 'Going', onPress: () => setValue('going') },
              { value: 'saved', label: 'Saved', onPress: () => setValue('saved')},
            ]}
          />
          {/* Generate the tab based on what the current value is */}
          <FlatList
            data={value == 'upcoming' ? upcomingEvents : value == 'going' ? goingEvents : savedEvents}
            renderItem = {({item}) =>
              <Pressable 
                onPress={() => navigation.navigate('EventDetails', {item})}
                style={styles.event}
              >
                <Event props={item}/>
              </Pressable>
            }
            keyExtractor={item => item.name}
            extraData={selectedEvent}
          />
      </SafeAreaView>     
  );

};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // marginTop: StatusBar.currentHeight,
    marginTop: 1
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#ff99ff'
  },
  event: {
    marginHorizontal: 10
  }
})


export default HomePage;