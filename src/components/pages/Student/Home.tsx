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
import { useStateWithFireStoreCollection } from "../../../utils/useStateWithFirebase";
import { defaultEvent, EventObject } from "../../../utils/model/EventObject";
import { getFirebaseUserIDOrEmpty, uid } from "../../../utils/util";
import Event from "../../organisms/Event";
import EventDivider from "../../atoms/Divider";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "./main";

type props = NativeStackScreenProps<RootStackParamList, "Home">;
// To access the type of user, use route.params.userType

const Home = ({ route, navigation }: props) => {
  // const [loading, dbListenedValue, set, add, remove] =
  //   useSateWithFireStoreArray<EventObject>("event/eventList", "eventListObj");

  const [loading, events, add] =
    useStateWithFireStoreCollection<EventObject>("events");

  if (loading) {
    return <Text>Loading</Text>;
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
          <Event
            id={item.id}
            navigation={navigation}
            userType={route.params.userType}
          />
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
