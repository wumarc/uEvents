import {
  FlatList,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
  Pressable,
  TouchableOpacity,
} from "react-native";
import { useEffect, useState } from "react";
import { doc, getDoc, Timestamp } from "firebase/firestore";
import { Button, Input, Header } from "@rneui/base";
import { Text } from "@rneui/themed";
import { useStateWithFireStoreCollection } from "../../utils/useStateWithFirebase";
import { defaultEvent, EventObject } from "../../utils/model/EventObject";
import { getFirebaseUserIDOrEmpty, uid } from "../../utils/util";
import Event from "../organisms/Event";
import EventDivider from "../atoms/Divider";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../main";

type props = NativeStackScreenProps<RootStackParamList, "Home">;
// To access the type of user, use route.params.userType

const Home = ({ route, navigation }: props) => {
  // const [loading, dbListenedValue, set, add, remove] =
  //   useSateWithFireStoreArray<EventObject>("event/eventList", "eventListObj");

  const [loading, events, add] =
    useStateWithFireStoreCollection<EventObject>("events");

  const [addingEvent, setAddingEvent] = useState(false);

  const [newEvent, setNewEvent] = useState<EventObject>(defaultEvent);

  if (loading) {
    return <Text>Loading</Text>;
  }

  if (addingEvent) {
    // Event object format
    // id
    // name
    // description
    // date
    // time
    // location
    // organizer
    return (
      <View>
        <Input
          placeholder="Name"
          onChangeText={(value) => setNewEvent({ ...newEvent, name: value })}
        />
        <Input
          placeholder="Description"
          onChangeText={(value) =>
            setNewEvent({ ...newEvent, description: value })
          }
        />
        <Input
          placeholder="Date YYYY-MM-DD"
          onChangeText={(value) =>
            setNewEvent({ ...newEvent, date: new Date(value) })
          }
        />
        <Input
          placeholder="Time HH:MM"
          onChangeText={(value) => {
            const [hours, minutes] = value.split(":");
            // Convert to milliseconds
            const time = new Date(
              0,
              0,
              0,
              parseInt(hours as string),
              parseInt(minutes as string)
            );
            setNewEvent({ ...newEvent, time: Timestamp.fromDate(time) });
          }}
        />
        <Input
          placeholder="Location"
          onChangeText={(value) =>
            setNewEvent({ ...newEvent, location: value })
          }
        />
        <Input
          placeholder="Organizer"
          onChangeText={(value) =>
            setNewEvent({
              ...newEvent,
              organizer: "G1CLkEL9BANpRnWFWIVxhjlXpNv2",
            })
          } // TODO Use real value of organizer
        />
        <Button
          onPress={() => {
            // Adding the event to the database
            newEvent.id = uid();
            add(newEvent.id, newEvent);
            setAddingEvent(false);
          }}
        >
          Add event
        </Button>
        <Button
          onPress={() => {
            setAddingEvent(false);
          }}
        >
          Cancel
        </Button>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* <Button
          setAddingEvent(true);
        }}
      >
        Add test event
      </Button> */}
      <Text style={styles.title}>Upcoming Events</Text>
      <FlatList
        data={events}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            key={index}
            onPress={() => {
              navigation.navigate("EventDetailsView", {
                userType: route.params.userType,
                eventID: item.id,
                organizerID: item.organizer,
              });
            }}
          >
            <Event id={item.id} />
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default Home;

export const styles = StyleSheet.create({
  container: {},
  title: {
    fontSize: 25,
    fontWeight: "bold",
  },
});
