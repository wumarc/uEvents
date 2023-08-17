import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  StatusBar,
} from "react-native";
import { colours, spacing, fonts } from "../../subatoms/Theme";
import { FlatList } from "react-native";
import OrganizerEvent from "./OrganizerEvent";
import { FAB } from "react-native-elements";
import { useState } from "react";
import { useStateWithFireStoreCollection } from "../../../utils/useStateWithFirebase";
import { EventObject } from "../../../utils/model/EventObject";
import { Loading } from "../Common/Loading";
import { getFirebaseUserIDOrEmpty } from "../../../utils/util";

const Home = ({ navigation }: any) => {
  const [loading, events, add] =
    useStateWithFireStoreCollection<EventObject>("events");

  if (loading || !events) {
    return <Loading />;
  }

  let myEvents = events.filter(
    (event) => event.organizer === getFirebaseUserIDOrEmpty()
  );

  return (
    <View style={styles.container}>
      <StatusBar translucent />
      <ScrollView showsHorizontalScrollIndicator={false}>
        <View style={styles.pageTitle}>
          <Text style={fonts.title1}>Upcoming Events</Text>
        </View>

        <FlatList
          style={{}}
          showsVerticalScrollIndicator={false}
          data={myEvents}
          renderItem={({ item, index }) => (
            <View>
              <OrganizerEvent eventID={item.id} navigation={navigation} />
            </View>
          )}
        />
      </ScrollView>

      <View style={{ position: "absolute", bottom: 0, right: 0 }}>
        <FAB
          icon={{ name: "add", color: "white" }}
          placement="right"
          color={colours.purple}
          size="large"
          onPress={() => navigation.navigate("Step0", { useDefault: false })}
        />
      </View>
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colours.white,
    paddingHorizontal: spacing.page,
  },
  pageTitle: {
    flexDirection: "row",
    padding: "3%",
  },
});

export default Home;
