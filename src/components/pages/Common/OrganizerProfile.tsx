import { View, Text, ScrollView, StyleSheet, Linking, FlatList } from "react-native";
import { colours, fonts, spacing, windowWidth } from "../../subatoms/Theme";
import Event from "../../organisms/Event";
import { Avatar, ButtonGroup, Icon } from "react-native-elements";
import { useState } from "react";
import { Dialog } from "react-native-elements";
import * as Clipboard from "expo-clipboard";
import { BottomSheet } from "@rneui/themed";
import { Button } from "@rneui/base";
import { CustomButton } from "../../atoms/CustomButton";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Organizer } from "../../../utils/model/Organizer";
import {
  useStateWithFireStoreDocument,
  useStateWithFireStoreImage,
  useStateWithFireStoreCollection,
  useStateWithFireStoreDocumentLogged,
} from "../../../utils/useStateWithFirebase";
import { Loading } from "./Loading";
import { EventObject, nextStartTime } from "../../../utils/model/EventObject";
import { searchAlgo } from "../../../utils/search";
import { Timestamp } from "firebase/firestore";
import { eventPath, getFirebaseUserIDOrEmpty, getNextDate, isLogged } from "../../../utils/util";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../../firebaseConfig";
import { RootStackParamList } from "../../../../main";
import { useUser } from "../../../utils/model/User";

type props = NativeStackScreenProps<RootStackParamList, "EventOrganizerView">;

const OrganizerProfile = ({ route, navigation }: props) => {
  // States
  const [loading, organizer, setOrganizer] = useStateWithFireStoreDocument<Organizer>("users", route.params.organizerID);
  const [loading2, url, found] = useStateWithFireStoreImage("organizers/" + route.params.organizerID);
  const [loading3, events, add] = useStateWithFireStoreCollection<EventObject>(eventPath());
  const [loading4, users, add2] = useStateWithFireStoreCollection<Organizer>("users");
  const [dialogVisible, setdialogVisible] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [loading5, userData, setUserData, isLogged, isStudent, isOrganizer, isAdmin, isBeta] = useUser();

  // Loading
  if (loading || loading2 || loading3 || loading4 || loading5) {
    return <Loading />;
  }

  if (!organizer) {
    return (
      <View style={{ alignItems: "center", justifyContent: "center", flex: 1, backgroundColor: colours.white }}>
        <Text style={fonts.title2}>Sorry an error has occured</Text>
        <Text style={fonts.regular}>ID field is missing in organizer</Text>
        <Text style={fonts.regular}>Please reach out to us at admin@uevents.org</Text>
      </View>
    );
  }

  // Filter events
  let isPresent = selectedIndex === 0 ? true : false;
  let organizers = users?.filter((user) => user.type === "organizer") ?? [];

  // Filtered events
  let filteredEvents = events as EventObject[];
  filteredEvents = searchAlgo("", filteredEvents);

  let today = new Date();
  // Make sure the events are not in the past
  filteredEvents = filteredEvents.filter((event) => {
    let [startDate, endDate] = getNextDate(event, today);
    if (!startDate) {
      return false;
    }
    let startTime = Timestamp.fromDate(startDate);
    return isPresent ? startTime.toMillis() > Timestamp.now().toMillis() : startTime.toMillis() < Timestamp.now().toMillis();
  });

  // Make sure the events are published
  filteredEvents = filteredEvents.filter((event) => event.state == "Published");

  // Remove blocked or hidden events
  if (isLogged) {
    filteredEvents = filteredEvents.filter((event) => {
      if ((userData?.hidden ?? []).includes(event.id)) {
        return false;
      }
      return true;
    });
  }

  // Make sure the event is from the organizer
  filteredEvents = filteredEvents.filter((event) => event.organizer === organizer.id);

  return (
    <ScrollView style={{ backgroundColor: colours.white, paddingHorizontal: spacing.page2 }}>
      {/* Club logo */}
      <View style={{ alignItems: "center", ...spacing.verticalMargin1 }}>
        {url ? <Avatar size={150} rounded source={{ uri: url }} containerStyle={{ backgroundColor: "transparent" }} /> : <Icon name="person" />}
      </View>

      {/* Club title */}
      <View>
        <Text style={{ ...fonts.title2, textAlign: "center" }}>{organizer.name}</Text>
      </View>

      {/* Club description */}
      <View style={spacing.verticalMargin1}>
        <Text style={{ ...fonts.regular, textAlign: "center" }}>{organizer.description}</Text>
      </View>

      {/* Club socials */}
      <View style={{ justifyContent: "center", flexDirection: "row" }}>
        {organizer.instagram && (
          <Icon
            name="logo-instagram"
            type="ionicon"
            color={colours.black}
            size={35}
            containerStyle={{ ...spacing.verticalMargin1 }}
            onPress={() => Linking.openURL("https://www.instagram.com/" + organizer.instagram)}
          />
        )}
        <Icon
          name="at-outline"
          type="ionicon"
          color={colours.black}
          size={35}
          containerStyle={{ ...spacing.verticalMargin1 }}
          onPress={() => setdialogVisible(true)}
        />
      </View>

      {/* Club events */}
      <View>
        <ButtonGroup
          buttons={["Upcoming", "Past"]}
          selectedIndex={selectedIndex}
          containerStyle={{ height: 50 }}
          selectedButtonStyle={{ backgroundColor: colours.purple }}
          textStyle={{ ...fonts.regular }}
          onPress={(index) => setSelectedIndex(index)}
        />
        {/* List */}
        {filteredEvents.length === 0 ? (
          <Text style={{ ...fonts.regular, textAlign: "center", margin: 5 }}>No events 😔</Text>
        ) : (
          <FlatList
            style={{}}
            showsVerticalScrollIndicator={false}
            data={filteredEvents}
            renderItem={({ item, index }) => (
              <View style={{ marginVertical: "2%" }}>
                <Event organizer={item.organizer} id={item.id} navigation={navigation} listView={false} onSaveEvent={() => {}} />
              </View>
            )}
          />
        )}
      </View>

      <Dialog isVisible={dialogVisible} onBackdropPress={() => setdialogVisible(false)}>
        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
          <Text style={fonts.title2}>{organizer.email}</Text>
          <Button
            buttonStyle={{ backgroundColor: colours.white }}
            icon={<Icon name="copy" type="feather" color={colours.black} />}
            onPress={() => Clipboard.setStringAsync(organizer.email)}
          />
        </View>
      </Dialog>

      <BottomSheet
        modalProps={{ animationType: "fade" }}
        onBackdropPress={() => setIsVisible(false)}
        isVisible={isVisible}
        scrollViewProps={{ scrollEnabled: false }}
      >
        <View
          style={{
            backgroundColor: "white",
            paddingVertical: "7%",
            borderRadius: 15,
          }}
        >
          <View style={{ alignItems: "center" }}>
            <Text style={{ ...fonts.title1, fontSize: 100 }}>👮</Text>
            <Text style={{ ...fonts.regular, textAlign: "center", marginBottom: "2%", marginHorizontal: "4%" }}>
              Thank you for taking the time to report the user, we will look into it as soon as possible!
            </Text>
          </View>
          <View style={{ marginHorizontal: spacing.horizontalMargin1 }}>
            <CustomButton title="Report organizer" onPress={() => {}} />
            <Button
              style={{
                paddingHorizontal: 10,
                borderRadius: 15,
                marginVertical: "1%",
              }}
              color={"transparent"}
              titleStyle={{ color: colours.purple, fontWeight: "600" }}
              title={"Cancel"}
              onPress={() => setIsVisible(false)}
            />
          </View>
        </View>
      </BottomSheet>
    </ScrollView>
  );
};

const styles = StyleSheet.create({});

export default OrganizerProfile;
