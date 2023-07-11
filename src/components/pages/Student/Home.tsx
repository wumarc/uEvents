import {
  FlatList,
  ScrollView,
  StyleSheet,
  View,
  Animated
} from "react-native";
import { useState } from "react";
import { Text } from "@rneui/themed";
import { useStateWithFireStoreCollection } from "../../../utils/useStateWithFirebase";
import { defaultEvent, EventObject } from "../../../utils/model/EventObject";
import Event from "../../organisms/Event";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "./main";
import { Toast } from "react-native-toast-message/lib/src/Toast";
import { SearchBar } from "@rneui/themed";
import { colours } from "../../subatoms/colours";
import { ButtonGroup } from "react-native-elements";

type props = NativeStackScreenProps<RootStackParamList, "Home">;
// To access the type of user, use route.params.userType

const Home = ({ route, navigation }: props) => {
  // const [loading, dbListenedValue, set, add, remove] =
  //   useSateWithFireStoreArray<EventObject>("event/eventList", "eventListObj");

  const [toggleSearchBar, setToggleSearchBar] = useState(false)
  const [loading, events, add] =
    useStateWithFireStoreCollection<EventObject>("events");

  const [selectedIndex, setSelectedIndex] = useState(0);

  if (loading) {
    return <Text>Loading</Text>;
  }

  const showToast = (save: boolean) => {
    // https://github.com/calintamas/react-native-toast-message/blob/945189fec9746b79d8b5b450e298ef391f8022fb/docs/custom-layouts.md
    Toast.show({
      type: "success",
      text1: save ? "Event Saved" : "Event Unsaved",
      position: "bottom",
      bottomOffset: 130,
      visibilityTime: 1800,
    });
  }

  return (
    <View style={styles.container}>

      {/* Search bar and Filter */}
      <Animated.View>
        <SearchBar
          platform="default"
          inputContainerStyle={{borderRadius: 20, backgroundColor: 'white', margin: 0}}
          inputStyle={{}}
          containerStyle={{ backgroundColor: colours.secondaryPurple, borderWidth: 0, borderBottomColor: 'transparent', borderTopColor: 'transparent'}}
          // leftIconContainerStyle={{backgroundColor: 'green', padding: 3}}
          rightIconContainerStyle={{}}
          loadingProps={{}}
          onChangeText={() => {}}
          placeholder="Search all events..."
          placeholderTextColor="#121212"
        />
        <View style={{backgroundColor: colours.secondaryPurple}}>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            <ButtonGroup
              buttons={["All", "Sports", "Academic", "Social", "Cultural", "Volunteering", "Religious", "Recreational", "Philotranphic", "Other"]}
              selectedIndex={selectedIndex}
              buttonContainerStyle={{
                borderRadius: 20,
                borderWidth: 0,
              }}
              containerStyle={{
                borderWidth: 0,
                padding: 3,
                backgroundColor: colours.secondaryPurple,
                marginLeft: 0,
                marginVertical: 0,
                paddingBottom: 6,
                marginBottom: 7
              }}
              buttonStyle={{
                borderRadius: 16,
                backgroundColor: colours.primaryPurple,
                marginHorizontal: 4,
                paddingHorizontal: 12,
              }}
              innerBorderStyle={{
                width: 0,
              }}
              textStyle={{
                color: "white",
              }}
              selectedButtonStyle={{backgroundColor: 'grey'}}
              onPress={(value) => { setSelectedIndex(value) }}
            />
          </ScrollView>
        </View>
      </Animated.View>

      {/* Event List*/}
      <Animated.ScrollView
        // onScroll={scrollHandler}
      >
        <FlatList
          contentContainerStyle={{paddingBottom: 200}}
          showsVerticalScrollIndicator={false}
          data={events}
          renderItem={({item, index}) => (
            <View
              style={styles.event}
            >
              <Event
                id={item.id}
                navigation={navigation}
                userType={route.params.userType}
                onSaveEvent={showToast}
              />
            </View>
          )}
        />
      </Animated.ScrollView>

      {/* Toast */}
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
    paddingVertical: "8%",
    justifyContent: 'center',
  },
  title: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
    paddingStart: 8,
  },
});
