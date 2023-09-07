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
import { SvgUri } from "react-native-svg";

const YourEvents = ({ navigation }: any) => {
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
      <View style={{justifyContent: 'center', alignItems: 'center', flex: 1, paddingHorizontal: '5%', backgroundColor: colours.white}}>
        <Text style={{textAlign: 'center', ...fonts.title3, marginBottom: '2%'}}>Your account is currently incomplete.</Text>
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
      
      <ScrollView showsHorizontalScrollIndicator={false} contentContainerStyle={{flexGrow: 1}}>
        
        <View style={styles.pageTitle}>
          <Text style={fonts.title1}>Your Events</Text>
        </View>

        {profile.approved ? <></>  : (
          <Text style={{...fonts.title3, textAlign: 'center'}}>Your club is currently being reviewed. You can start adding events now. They will show once both your club and your events get approved by our team.</Text>
        )}

        {(myEvents ?? []).length != 0 && (
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
        )}

        {(myEvents ?? []).length == 0 && (
          <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <SvgUri
              width="50%"
              height="30%"
              uri={"https://openmoji.org/data/color/svg/E10C.svg"}
              fill="black"
            />
            <Text style={{...fonts.title3, textAlign: 'center'}}>You currently have no events. Smash the red button to launch an event!</Text>
          </View>
        )}

      </ScrollView>

      <View style={{ position: "absolute", bottom: 0, right: 0 }}>
        <FAB
          icon={{ name: "add", color: "white" }}
          placement="right"
          color={"#FD6262"}
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

export default YourEvents;
