import { FlatList, SafeAreaView, StatusBar, StyleSheet, Text, View } from "react-native";
import { useEffect, useState } from "react";
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../firebaseConfig";
import { EventObject } from "../../model/EventObject";
import Event from "../organisms/Event";

const HomePage = () => {

  const [events, setEvents] = useState<EventObject[]>([
    {
      name: "St. PAtrick's Day Climb and Pub",
      description: "Looking for a fun way to celebrate St Patty’s Day☘️ ? Join us this Friday at 6pm for a climb and pub night at Coyote Rock Gym and Liam Maguire’s.",
      num_attendees: 12,
      location: "Coyotte Rock Gym",
      organizer: "uOttwa Outdoors Club",
      date: null
    },
    {
      name: "St. PAtrick's Day Climb and Pub",
      description: "Looking for a fun way to celebrate St Patty’s Day☘️ ? Join us this Friday at 6pm for a climb and pub night at Coyote Rock Gym and Liam Maguire’s.",
      num_attendees: 12,
      location: "Coyotte Rock Gym",
      organizer: "uOttwa Outdoors Club",
      date: null
    },
    {
      name: "St. PAtrick's Day Climb and Pub",
      description: "Looking for a fun way to celebrate St Patty’s Day☘️ ? Join us this Friday at 6pm for a climb and pub night at Coyote Rock Gym and Liam Maguire’s.",
      num_attendees: 12,
      location: "Coyotte Rock Gym",
      organizer: "uOttwa Outdoors Club",
      date: null
    },
    {
      name: "St. PAtrick's Day Climb and Pub",
      description: "Looking for a fun way to celebrate St Patty’s Day☘️ ? Join us this Friday at 6pm for a climb and pub night at Coyote Rock Gym and Liam Maguire’s.",
      num_attendees: 12,
      location: "Coyotte Rock Gym",
      organizer: "uOttwa Outdoors Club",
      date: null
    }
  ]);

  
  return (
    <SafeAreaView style={styles.container}>
      
      <FlatList 
        data={events}
        renderItem={({item}) => <Event props={item}/>}
        // keyExtractor={(item) => item}
      />
    </SafeAreaView>
  );

};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    // marginTop: StatusBar.currentHeight,
    marginTop: 30
  }
})


export default HomePage;