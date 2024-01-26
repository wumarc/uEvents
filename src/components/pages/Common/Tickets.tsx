import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { View, Text, FlatList, StyleSheet, ScrollView, Platform } from "react-native";
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
import { useUser } from "../../../utils/model/User";

type props = NativeStackScreenProps<RootStackParamList, "Tickets">;

export const Tickets = ({ navigation }: props) => {
  // States
  const [loading3, userData, setUserData, isLogged, isStudent, isOrganizer, isAdmin, isBeta] = useUser();
  const [loading2, events, add] = useStateWithFireStoreCollection<EventObject>(eventPath());

  // Loading
  if (loading2 || loading3) {
    return <Loading />;
  }

  if (!isLogged || !userData || !setUserData) {
    // User is not logged in

    return (
      // @ts-ignore
      <View style={{ width: windowWidth * 0.5, height: "fit-content", marginRight: "auto", marginLeft: "auto", marginTop: "auto", marginBottom: "auto" }}>
        <Text style={{ ...fonts.regular, textAlign: "center", paddingBottom: 20, fontSize: 16 }}>{"You need to be logged in to view your tickets."}</Text>
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

  let ticketEvents: EventObject[] = [];
  let ticketEventsIds = userData.tickets ?? [];

  ticketEventsIds.forEach((ticketId) => {
    events.forEach((event) => {
      if (event.id == ticketId) {
        ticketEvents.push(event);
      }
    });
  });

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={{ padding: "3%" }}>
          <Text style={fonts.title1}>Tickets</Text>
        </View>

        <View style={{ alignItems: Platform.OS == "web" ? "flex-start" : "center", ...spacing.verticalMargin1 }}>
          {(ticketEvents ?? []).length != 0 && (
            <FlatList
              data={ticketEvents as EventObject[]}
              renderItem={({ item }) => (
                <View>
                  <Event today={new Date()} listView={false} organizer={item.organizer} id={item.id} navigation={navigation} onSaveEvent={() => {}} />
                  <CustomButton
                    title="I am not going anymore"
                    onPress={() => {
                      setUserData({ ...userData, tickets: (userData.tickets ?? []).filter((id: string) => id != item.id) });
                    }}
                  />
                </View>
              )}
            />
          )}
        </View>

        {(ticketEvents ?? []).length == 0 && (
          <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <EmojiImage emoji="🏝️" style={{ width: "60%", height: "40%" }} />
            <Text style={{ ...fonts.title3, textAlign: "center" }}>
              You have no tickets. Your event list is as unoccupied as a peaceful oasis in the middle of the desert...
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
