import { StyleSheet, View, FlatList, StatusBar, ScrollView, Text } from "react-native";
import { useState } from "react";
import { useStateWithFireStoreCollection, useStateWithFireStoreDocumentLogged } from "../../../utils/useStateWithFirebase";
import { EventObject } from "../../../utils/model/EventObject";
import Event from "../../organisms/Event";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Toast } from "react-native-toast-message/lib/src/Toast";
import { searchAlgo } from "../../../utils/search";
import { Timestamp } from "firebase/firestore";
import { colours, fonts, spacing, windowHeight, windowWidth } from "../../subatoms/Theme";
import { Loading } from "./Loading";
import { SearchBar } from "react-native-elements";
import { Organizer } from "../../../utils/model/Organizer";
import { eventPath, getFirebaseUserIDOrEmpty, getNextDate, isLogged } from "../../../utils/util";
import { Divider } from "@rneui/themed";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../../firebaseConfig";
import { RootStackParamList } from "../../../../main";

type props = NativeStackScreenProps<RootStackParamList, "Home">;

const Home = ({ route, navigation }: props) => {
  // States
  const [search, setSearch] = useState("");
  const [listView, setListView] = useState(true);
  console.log(eventPath());
  const [loading, events, add] = useStateWithFireStoreCollection<EventObject>(eventPath());
  const [loading2, users, add2] = useStateWithFireStoreCollection<Organizer>("users");
  const [user, loading4, error] = useAuthState(auth);
  const [loading3, student, setStudent] = useStateWithFireStoreDocumentLogged(user != null, "users", getFirebaseUserIDOrEmpty());

  // Loading
  if (loading || loading2 || loading3 || loading4) {
    return <Loading />;
  }

  let organizers = users?.filter((user) => user.type === "organizer") ?? [];

  // Toast
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

  // Filtered events
  let filteredEvents = events as EventObject[];

  try {
    filteredEvents = searchAlgo(search, filteredEvents);

    // Make sure the events are not in the past
    filteredEvents = filteredEvents.filter((event) => {
      let [startTime, endTime] = getNextDate(event);
      if (!endTime) {
        return false;
      }
      return endTime.getTime() > Timestamp.now().toMillis();
    });

    // Make sure the events are published
    filteredEvents = filteredEvents.filter((event) => event.state == "Published");

    // Make sure the organizer is approved
    filteredEvents = filteredEvents.filter((event) => {
      if (event.organizerType === "Manually Added") {
        return true;
      }
      let organizer = organizers.find((organizer) => organizer.id === event.organizer);
      return organizer?.approved ?? false;
    });

    if (user) {
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
    }
  } catch (e) {
    console.error("Error filtering events: ", e);
  }

  const restOfTodayMillis =
    24 * 60 * 60 * 1000 -
    (new Date().getHours() * 60 * 60 * 1000 + new Date().getMinutes() * 60 * 1000 + new Date().getSeconds() * 1000 + new Date().getMilliseconds());
  const dayMillis = 24 * 60 * 60 * 1000;

  // Today's events
  let todayEvents = filteredEvents.filter((event) => {
    let [startTime, endTime] = getNextDate(event);
    let now = Timestamp.now();
    let diff = startTime.getTime() - now.toMillis();
    return diff < restOfTodayMillis;
  });

  // This week's events
  let thisWeekEvents = filteredEvents.filter((event) => {
    let [startTime, endTime] = getNextDate(event);
    let now = Timestamp.now();
    let diff = startTime.getTime() - now.toMillis();
    return diff >= restOfTodayMillis && diff < restOfTodayMillis + dayMillis * 6;
  });

  // Other events
  let otherEvents = filteredEvents.filter((event) => {
    let [startTime, endTime] = getNextDate(event);
    let now = Timestamp.now();
    let diff = startTime.getTime() - now.toMillis();
    return diff >= restOfTodayMillis + dayMillis * 6;
  });

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

        {/* Today's event list */}
        {todayEvents.length != 0 && (
          <View style={{ marginTop: windowHeight * 0.01 }}>
            <Text style={fonts.title2}>🔥 Events happening today 🔥</Text>

            <FlatList
              style={{}}
              showsVerticalScrollIndicator={false}
              data={todayEvents}
              renderItem={({ item, index }) => (
                <View style={styles.event}>
                  <Event organizer={item.organizer} id={item.id} navigation={navigation} onSaveEvent={showToast} listView={listView} />
                </View>
              )}
            />
            <Divider width={1} style={{ marginVertical: 2 }} />
          </View>
        )}

        {/* This week's event list */}
        {thisWeekEvents.length != 0 && (
          <View style={{ marginTop: windowHeight * 0.01 }}>
            <Text style={fonts.title2}>Events happening this week</Text>
            <FlatList
              style={{}}
              showsVerticalScrollIndicator={false}
              data={thisWeekEvents}
              renderItem={({ item, index }) => (
                <View style={styles.event}>
                  <Event organizer={item.organizer} id={item.id} navigation={navigation} onSaveEvent={showToast} listView={listView} />
                </View>
              )}
            />
          </View>
        )}

        {/* All other events */}
        {otherEvents.length != 0 && (
          <View style={{ marginTop: windowHeight * 0.01 }}>
            <Text style={fonts.title2}>All other events</Text>
            {filteredEvents.length == 0 && (
              <View style={{ alignItems: "center", marginTop: "20%" }}>
                <Text>No events matched your search</Text>
              </View>
            )}
            <FlatList
              style={{}}
              showsVerticalScrollIndicator={false}
              data={otherEvents}
              renderItem={({ item, index }) => (
                <View style={styles.event}>
                  <Event organizer={item.organizer} id={item.id} navigation={navigation} onSaveEvent={showToast} listView={listView} />
                </View>
              )}
            />
          </View>
        )}
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
