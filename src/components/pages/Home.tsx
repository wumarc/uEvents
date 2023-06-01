import {
  FlatList,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  Pressable,
} from "react-native";
import { useEffect, useState } from "react";
import { doc, getDoc, Timestamp } from "firebase/firestore";
import { Button, Input } from "@rneui/base";
import {
  useSateWithFireStore,
  useSateWithFireStoreArray,
} from "../../utils/useStateWithFirebase";
import {
  defaultEvent,
  EventObject,
  mockEventClimbing,
} from "../../utils/model/EventObject";
import { getFirebaseUserIDOrEmpty, uid } from "../../utils/util";
import Event from "../organisms/Event";

const Home = () => {
  const [loading, dbListenedValue, set, add, remove] =
    useSateWithFireStoreArray<EventObject>("event/eventList", "eventListObj");

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
            setNewEvent({ ...newEvent, organizer: { name: value, events: [] } })
          }
        />
        <Button
          onPress={() => {
            // Adding the event to the database
            newEvent.id = uid();
            add(newEvent);
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
    <View>
      <Button
        onPress={() => {
          setAddingEvent(true);
        }}
      >
        Add test event
      </Button>
      <FlatList
        data={dbListenedValue}
        renderItem={({ item }) => (
          <Event
            event={item}
            saveEvent={() => {
              for (let i = 0; i < dbListenedValue.length; i++) {
                if (dbListenedValue[i]?.id == item.id) {
                  let newEvent = dbListenedValue[i];
                  if (newEvent == undefined) {
                    // This should never happen
                    return;
                  }
                  let flag = false;
                  for (let i = 0; i < newEvent.saved.length; i++) {
                    if (newEvent.saved[i] == getFirebaseUserIDOrEmpty()) {
                      // Removing the user from the saved list
                      flag = true;
                      newEvent.saved.splice(i, 1);
                      break;
                    }
                  }

                  if (!flag) {
                    // Adding the user to the saved list
                    newEvent.saved.push(getFirebaseUserIDOrEmpty());
                  }
                  dbListenedValue[i] = newEvent;
                  set(dbListenedValue);
                  break;
                }
              }
            }}
          />
        )}
      />
    </View>
  );
};

export default Home;
