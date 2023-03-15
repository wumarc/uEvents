import { BottomNavigation, Text } from "react-native-paper";
import { SafeAreaView, View } from "react-native";
import { useEffect, useState } from "react";
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Event from "../organisms/Event";
import { setDoc, doc, getDoc } from "firebase/firestore";
import { db } from "../../../firebaseConfig";
import {v4 as uuidv4} from 'uuid';
import { EventObject } from "../../model/EventObject";

const Home = () => {

  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    const getEvents = async () => {
      const docRef = doc(db, "events", "event");
      const docSnap = await getDoc(docRef);
      setEvents(docSnap.data() as EventObject[]);
    }
    console.log(events);
  }, [events]);

  return (
    <View style={{
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#00BFA5'
    }}>
        {/* <Event props={events[0]}/> */}
    </View>
  );

};

export default Home;