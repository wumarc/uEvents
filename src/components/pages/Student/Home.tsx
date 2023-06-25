import {
  FlatList,
  StyleSheet,
  View,
} from "react-native";
import { useEffect, useState } from "react";
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
import { ButtonGroup } from "@rneui/themed";
import { colours } from "../../subatoms/colours";
import CustomDropdown from "../../atoms/CustomDropdown";

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
        // containerStyle={{ backgroundColor: colours.secon }}
        inputContainerStyle={{}}
        inputStyle={{}}
        leftIconContainerStyle={{}}
        rightIconContainerStyle={{}}
        lightTheme
        loadingProps={{}}
        onChangeText={() => {}}
        placeholder="Search?"
        placeholderTextColor="#121212"
        round
      />

      {/* Faceted Search */}
      <View style={{
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        paddingVertical: 7,
      }}>
        <View style={{padding: 3, width: '50%'}}>
          <Text>Event Type</Text>
          <CustomDropdown/>
        </View>
        <View style={{padding: 3, width: '50%'}}>
          <Text>Followed</Text>
          <CustomDropdown/>
        </View>
      </View>

      <View style={styles.events}>
        <FlatList
          data={events}
          renderItem={({ item, index }) => (
            <View style={styles.event}>
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
    marginVertical: 6,
  },
  title: {
    fontSize: 25,
    fontWeight: "bold",
  },
});
