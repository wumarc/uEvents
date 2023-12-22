import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { View, Text, FlatList, StyleSheet, ScrollView } from "react-native";
import { RootStackParamList } from "./main";
import { getFirebaseUserIDOrEmpty } from "../../../utils/util";
import Event from "../../organisms/Event";
import { Loading } from "../Common/Loading";
import { useStateWithFireStoreCollection, useStateWithFireStoreDocument } from "../../../utils/useStateWithFirebase";
import { colours, fonts, spacing } from "../../subatoms/Theme";
import { useEffect } from "react";
import { EventObject } from "../../../utils/model/EventObject";
import { SvgUri } from "react-native-svg";
import { Timestamp } from "firebase/firestore";

type props = NativeStackScreenProps<RootStackParamList, "Saved">;
// To access the type of user, use route.params.userType

const SavedEvents = ({ route, navigation }: props) => {
  const [loading, student, setStudent] = useStateWithFireStoreDocument("users", getFirebaseUserIDOrEmpty());

  const [loading2, events, add] = useStateWithFireStoreCollection<EventObject>("events");

  if (loading || loading2 || !events) {
    return <Loading />;
  }

  let savedEvents = [];
  for (let i = 0; i < (student.saved ?? []).length; i++) {
    let savedId = student.saved[i];
    let found = false;
    for (let j = 0; j < events.length; j++) {
      if (events[j]?.id == savedId) {
        savedEvents.push(events[j]);
        found = true;
        break;
      }
    }

    if (!found) {
      // remove from saved
      setStudent({
        saved: (student.saved ?? []).filter((id: string) => id != savedId),
      });
    }
  }

  // sort saved events by date
  savedEvents.sort((a, b) => {
    let aStart = a?.startTime ?? new Timestamp(0, 0);
    let bStart = b?.startTime ?? new Timestamp(0, 0);
    return aStart.toMillis() - bStart.toMillis();
  });

  // remove past events
  savedEvents = savedEvents.filter((event) => {
    let now = new Date();
    let end = event?.endTime ?? event?.startTime ?? new Timestamp(0, 0);
    return end.toMillis() >= now.getTime();
  });

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={{ padding: "3%" }}>
          <Text style={fonts.title1}>Saved Events</Text>
        </View>

        <View style={{ alignItems: "center", ...spacing.verticalMargin1 }}>
          {(student.saved ?? []).length != 0 && (
            <FlatList
              data={savedEvents as EventObject[]}
              renderItem={({ item }) => (
                <Event
                  listView={false}
                  organizer={item.organizer}
                  id={item.id}
                  userType={route.params.userType}
                  navigation={navigation}
                  onSaveEvent={() => {}}
                />
              )}
            />
          )}
        </View>

        {(student.saved ?? []).length == 0 && (
          <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <SvgUri width="60%" height="40%" uri={"https://openmoji.org/data/color/svg/1F3DD.svg"} fill="black" />
            <Text style={{ ...fonts.title3, textAlign: "center" }}>
              You have no saved events. Your event list is as unoccupied as a peaceful oasis in the middle of the desert...
            </Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: spacing.page,
    backgroundColor: colours.white,
    flex: 1,
  },
});

export default SavedEvents;
