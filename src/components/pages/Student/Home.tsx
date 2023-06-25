import {
  FlatList,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
  Pressable,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useEffect, useState } from "react";
import { doc, getDoc, Timestamp } from "firebase/firestore";
import { Button, Input, Header } from "@rneui/base";
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
      <View>
        <ButtonGroup
          buttons={["All", "Academic", "Cultural", "Religious"]}
          selectedIndex={selectedIndex}
          buttonContainerStyle={{
            borderRadius: 20,
            borderWidth: 0,
          }}
          containerStyle={{
            borderRadius: 20,
            borderWidth: 0,
            backgroundColor: 'transparent',
          }}
          buttonStyle={{
            borderRadius: 20,
            borderWidth: 0,
            backgroundColor: colours.secondaryPurple,
            marginHorizontal: 5,
          }}
          innerBorderStyle={{
            width: 0,
          }}
          textStyle={{
            color: "white",
          }}
          selectedButtonStyle={{backgroundColor: colours.primaryPurple}}
          onPress={(value) => { setSelectedIndex(value) }}
        />
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
