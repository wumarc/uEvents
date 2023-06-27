import {
  FlatList,
  StyleSheet,
  View,
} from "react-native";
import { useState } from "react";
import { doc, getDoc, Timestamp } from "firebase/firestore";
import { Text } from "@rneui/themed";
import { useStateWithFireStoreCollection } from "../../../utils/useStateWithFirebase";
import { defaultEvent, EventObject } from "../../../utils/model/EventObject";
import { getFirebaseUserIDOrEmpty, uid } from "../../../utils/util";
import Event from "../../organisms/Event";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "./main";
import { Toast } from "react-native-toast-message/lib/src/Toast";
import { SearchBar } from "@rneui/themed";
import { colours } from "../../subatoms/colours";
import CustomDropdown from "../../atoms/CustomDropdown";
import { Dimensions } from "react-native";

type props = NativeStackScreenProps<RootStackParamList, "Home">;
// To access the type of user, use route.params.userType

const Home = ({ route, navigation }: props) => {
  // const [loading, dbListenedValue, set, add, remove] =
  //   useSateWithFireStoreArray<EventObject>("event/eventList", "eventListObj");

  const [loading, events, add] =
    useStateWithFireStoreCollection<EventObject>("events");

  const [selectedIndex, setSelectedIndex] = useState(0);

  if (loading) {
    return <Text>Loading</Text>;
  }

  return (
    <View style={styles.container}>
      
      {/* Search bar */}
      <SearchBar
        platform="default"
        inputContainerStyle={{borderRadius: 20}}
        inputStyle={{}}
        containerStyle={{ backgroundColor: "transparent", borderWidth: 0 }}
        // leftIconContainerStyle={{backgroundColor: 'green', padding: 3}}
        rightIconContainerStyle={{}}
        lightTheme
        loadingProps={{}}
        onChangeText={() => {}}
        placeholder="Search all events..."
        placeholderTextColor="#121212"
        round
      />

      {/* Faceted Search */}
      <View style={{
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        paddingVertical: 7
      }}>
        <View style={{padding: 3, width: '50%'}}>
          <Text style={styles.title}>Events Type:</Text>
          <CustomDropdown dropdownOptions={['All', 'On-campus', 'Off-campus']} />
        </View>
        <View style={{padding: 3, width: '50%'}}>
          <Text style={styles.title}>Organizers:</Text>
          <CustomDropdown dropdownOptions={['All', 'Followed', 'Unfollowed']} />
        </View>
      </View>

      <View style={styles.events}>
        <FlatList
          data={events}
          renderItem={({item, index}) => (
            <View 
              style={styles.event}
            >
              <Event
                id={item.id}
                navigation={navigation}
                userType={route.params.userType}
              />
            </View>
          )}
        />
      </View>

      <Toast/>
    </View>
  );
};

export default Home;

export const styles = StyleSheet.create({
  container: {

  },
  events: {

  },
  event: {
    paddingVertical: 3,
    justifyContent: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    paddingStart: 4,
  },
});
