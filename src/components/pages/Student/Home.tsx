import {
  StyleSheet,
  View,
  FlatList,
  StatusBar,
  ScrollView,
  Text,
} from "react-native";
import { useState } from "react";
import {
  useStateWithFireStoreCollection,
  useStateWithFireStoreDocument,
} from "../../../utils/useStateWithFirebase";
import { EventObject, nextStartTime } from "../../../utils/model/EventObject";
import Event from "../../organisms/Event";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "./main";
import { Toast } from "react-native-toast-message/lib/src/Toast";
import { searchAlgo } from "../../../utils/search";
import { Timestamp } from "firebase/firestore";
import { colours, fonts, spacing } from "../../subatoms/Theme";
import { Loading } from "../Common/Loading";
import { SearchBar } from "react-native-elements";
import { Organizer } from "../../../utils/model/Organizer";
import { getFirebaseUserIDOrEmpty } from "../../../utils/util";

type props = NativeStackScreenProps<RootStackParamList, "Home">;
// To access the type of user, use route.params.userType

const Home = ({ route, navigation }: props) => {
  /* ---------------------------------- Hooks --------------------------------- */

  const [search, setSearch] = useState("");
  const [listView, setListView] = useState(true);
  const [loading, events, add] = useStateWithFireStoreCollection<EventObject>("events");
  const [loading2, users, add2] = useStateWithFireStoreCollection<Organizer>("users");
  const [loading3, student, setStudent] = useStateWithFireStoreDocument("users", getFirebaseUserIDOrEmpty());

  if (loading || loading2 || loading3) {
    return <Loading />;
  }

  let organizers = users?.filter((user) => user.type === "organizer") ?? [];

  /* ---------------------------------- Toast --------------------------------- */

  const showToast = (save: boolean) => {
    // https://github.com/calintamas/react-native-toast-message/blob/945189fec9746b79d8b5b450e298ef391f8022fb/docs/custom-layouts.md
    Toast.show({
      type: "success",
      text1: save ? "Event Saved" : "Event Unsaved",
      position: "bottom",
      bottomOffset: 0,
      visibilityTime: 1800,
    });
  };

  /* ---------------------------- Filter the events --------------------------- */

  // Filtered events
  let filteredEvents = events as EventObject[];

  try {
    filteredEvents = searchAlgo(search, filteredEvents);

    // Make sure the events are not in the past
    filteredEvents = filteredEvents.filter((event) => {
      // let startTime = nextStartTime(event.startTime, event.recurrence);
      let endTime = event.endTime ?? event.startTime;
      if (!endTime) {
        return false;
      }
      return endTime.toMillis() > Timestamp.now().toMillis();
    });

    // Make sure the events are published
    filteredEvents = filteredEvents.filter((event) => 
      event.state == "Published")

    // Make sure the organizer is approved
    filteredEvents = filteredEvents.filter((event) => {
      if (event.organizerType === "Manually Added") {
        return true;
      }
      let organizer = organizers.find((organizer) => organizer.id === event.organizer);
      return organizer?.approved ?? false;
    });

    // Remove blocked or hidden events
    filteredEvents = filteredEvents.filter((event) => {
      if ((student?.hidden ?? []).includes(event.id)) {
        return false;
      }
      if ((student?.blocked ?? []).includes(event.organizer)) {
        return false;
      }
      return true;
    });
  } catch (e) {
    console.error("Error filtering events: ", e)
  }

  

  return (
    <View style={styles.container}>
      <StatusBar translucent />

      <ScrollView showsVerticalScrollIndicator={false}>
        
        {/* Event title */}
        <View style={styles.pageTitle}>
          <Text style={fonts.title1}>Upcoming Events</Text>
        </View>

        {/* Search Bar */}
        <View>
          <SearchBar
            platform="default"
            inputContainerStyle={{
              borderRadius: 6,
              height: 38,
              backgroundColor: "#ebebeb",
            }}
            containerStyle={{
              backgroundColor: "white",
              flex: 1,
              borderBottomColor: "transparent",
              borderTopColor: "transparent",
            }}
            onChangeText={(value) => setSearch(value)}
            placeholder="Search events by name or category"
            // placeholderTextColor="white"
            value={search}
            autoCapitalize="none"
            selectionColor={colours.purple}
          />
        </View>

        {/* List */}
        {filteredEvents.length == 0 && (
          <View style={{ alignItems: "center", marginTop: "20%" }}>
            <Text>No events matched your search</Text>
          </View> )} 
        <FlatList
          style={{}}
          showsVerticalScrollIndicator={false}
          data={filteredEvents}
          renderItem={({ item, index }) => (
            <View style={styles.event}>
              <Event
                organizer={item.organizer}
                id={item.id}
                navigation={navigation}
                onSaveEvent={showToast}
                listView={listView}
              />
            </View>
          )}
        />
      </ScrollView>
      <Toast />
    </View>
  );
};

export default Home;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colours.white,
    paddingHorizontal: spacing.page,
  },
  view: {
    position: "absolute",
    width: "100%",
    flexDirection: "column",
    backgroundColor: colours.purple,
  },
  event: {
    // paddingVertical: 20, // MODIFIED
    // justifyContent: "center",
    // margin: 1
    marginVertical: "2%",
  },
  titleContainer: {
    paddingLeft: "3%",
    marginVertical: "3%",
  },
  pageTitle: {
    flexDirection: "row",
    padding: "3%",
  },
});
