import { StyleSheet, View, FlatList, StatusBar, ScrollView, Text, Button } from "react-native";
import { useStateWithFireStoreCollection, useStateWithFireStoreDocument, useStateWithFireStoreDocumentLogged } from "../../../utils/useStateWithFirebase";
import { EventObject } from "../../../utils/model/EventObject";
import Event from "../../organisms/Event";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Timestamp } from "firebase/firestore";
import { colours, fonts, spacing } from "../../subatoms/Theme";
import { Loading } from "./Loading";
import { Organizer } from "../../../utils/model/Organizer";
import { eventPath, getFirebaseUserIDOrEmpty } from "../../../utils/util";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../../firebaseConfig";
import { RootStackParamList } from "../../../../main";
import { useUser } from "../../../utils/model/User";

type props = NativeStackScreenProps<RootStackParamList, "HiddenEventsView">;
// To access the type of user, use route.params.userType

export const HiddenEvents = ({ route, navigation }: props) => {
  // States
  const [loading, events, add] = useStateWithFireStoreCollection<EventObject>(eventPath());
  const [loading2, users, add2] = useStateWithFireStoreCollection<Organizer>("users");
  const [loading3, userData, setUserData, isLogged, isStudent, isOrganizer, isAdmin, isBeta] = useUser();

  // Loading
  if (loading || loading2 || loading3) {
    return <Loading />;
  }

  // Assuming user is logged in
  // This page should only be accessible if the user is logged in
  if (!userData || !setUserData || !isLogged) {
    navigation.navigate("Home", {});
    return <Loading />;
  }

  let organizers = users?.filter((user) => user.type === "organizer") ?? [];

  // Filtered events
  let filteredEvents = events as EventObject[];

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
  filteredEvents = filteredEvents.filter((event) => event.state == "Published");

  // Make sure the organizer is approved
  filteredEvents = filteredEvents.filter((event) => {
    if (event.organizerType === "Manually Added") {
      return true;
    }
    let organizer = organizers.find((organizer) => organizer.id === event.organizer);
    return organizer?.approved ?? false;
  });

  // Only hidden events
  let hiddenEvents = userData?.hidden ?? [];
  console.log(hiddenEvents);
  filteredEvents = filteredEvents.filter((event) => hiddenEvents.includes(event.id));

  return (
    <View style={styles.container}>
      <StatusBar translucent />

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* List */}
        {filteredEvents.length === 0 && (
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <Text style={fonts.title2}>You have no hidden events</Text>
          </View>
        )}
        <FlatList
          style={{}}
          showsVerticalScrollIndicator={false}
          data={filteredEvents}
          renderItem={({ item, index }) => (
            <View style={styles.event}>
              <Event organizer={item.organizer} id={item.id} navigation={navigation} today={new Date()} onSaveEvent={() => {}} listView={false} />
              <Button
                title="Unhide"
                color={colours.purple}
                onPress={() => {
                  let newHiddenEvents = userData?.hidden ?? [];
                  newHiddenEvents = newHiddenEvents.filter((eventID: string) => eventID !== item.id);
                  setUserData({ ...userData, hidden: newHiddenEvents });
                }}
              />
            </View>
          )}
        />
      </ScrollView>
    </View>
  );
};

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
