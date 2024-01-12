import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { View, Text, FlatList, StyleSheet, ScrollView } from "react-native";
import { eventPath, getFirebaseUserIDOrEmpty, isLogged } from "../../../utils/util";
import { Event } from "../../organisms/Event";
import { Loading } from "./Loading";
import { useStateWithFireStoreCollection, useStateWithFireStoreDocument, useStateWithFireStoreDocumentLogged } from "../../../utils/useStateWithFirebase";
import { colours, fonts, spacing, windowWidth } from "../../subatoms/Theme";
import { EventObject } from "../../../utils/model/EventObject";
import { SvgUri } from "react-native-svg";
import { Timestamp } from "firebase/firestore";
import { CustomButton } from "../../atoms/CustomButton";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../../firebaseConfig";
import { RootStackParamList } from "../../../../main";
import { EmojiImage } from "../../organisms/EmojiImage";

type props = NativeStackScreenProps<RootStackParamList, "Saved">;

export const SavedEvents = ({ navigation }: props) => {
  // States
  const [user, loading3, error] = useAuthState(auth);
  const [loading, student, setStudent] = useStateWithFireStoreDocumentLogged(user != null, "users", getFirebaseUserIDOrEmpty());
  const [loading2, events, add] = useStateWithFireStoreCollection<EventObject>(eventPath());

  // Loading
  if (loading || loading2 || loading3) {
    return <Loading />;
  }

  if (!user || !student) {
    // User is not logged in

    return (
      <View style={{ width: windowWidth * 0.5, height: "fit-content", marginRight: "auto", marginLeft: "auto", marginTop: "auto", marginBottom: "auto" }}>
        <Text style={{ ...fonts.regular, textAlign: "center", paddingBottom: 20, fontSize: 16 }}>{"You need to be logged in to view saved events."}</Text>
        <CustomButton
          title="Login"
          onPress={() => {
            navigation.navigate("Welcome", {});
          }}
        />
      </View>
    );
  }

  if (!events) {
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
          {(savedEvents ?? []).length != 0 && (
            <FlatList
              data={savedEvents as EventObject[]}
              renderItem={({ item }) => <Event listView={false} organizer={item.organizer} id={item.id} navigation={navigation} onSaveEvent={() => {}} />}
            />
          )}
        </View>

        {(savedEvents ?? []).length == 0 && (
          <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <EmojiImage emoji="🏝️" style={{ width: "60%", height: "40%" }} />
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
