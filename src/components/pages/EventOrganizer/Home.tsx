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
import { useStateWithFireStoreCollection, useStateWithFireStoreDocument } from "../../../utils/useStateWithFirebase";
import { EventObject } from "../../../utils/model/EventObject";
import { Loading } from "../Common/Loading";
import { getFirebaseUserIDOrEmpty } from "../../../utils/util";
import { Organizer } from "../../../utils/model/Organizer";

const Home = ({ navigation }: any) => {
  const [loading, events, add] =
    useStateWithFireStoreCollection<EventObject>("events");

  const [loading2, profile, setProfile] =
    useStateWithFireStoreDocument<Organizer>(
      "users",
      getFirebaseUserIDOrEmpty()
  );

  if (loading || loading2 || !events) {
    return <Loading />;
  }

  if(!profile.name || !profile.description || !profile.image || profile.name == "" || profile.description == "" || profile.image == "") {
    return (
      <View style={{justifyContent: 'center', alignItems: 'center', flex: 1, paddingHorizontal: '5%'}}>
        <Text style={{textAlign: 'center', ...fonts.title3, marginBottom: '2%'}}>Your account is currently incomplete</Text>
        <Text style={{textAlign: 'center', ...fonts.title3}}>To get started with creating events, please begin by completing your organizer profile. You can do this by navigating to Settings {">"} Profile. Once your profile is complete, you'll be all set to start crafting your events.</Text>
      </View>
    )
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

        {(myEvents ?? []).length != 0 ? (
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
        ) : (
          <View style={{ paddingHorizontal: "10%"}}>
            <Text style={fonts.title3}>You currently have no events. Create one by clicking on the add button!</Text>
          </View>
        )}

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
