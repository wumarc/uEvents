import {
  StyleSheet,
  View,
  FlatList,
  StatusBar,
  ScrollView,
  Text,
} from "react-native";
import { useState } from "react";
import {
  useSateWithFireStore,
  useSateWithFireStoreArray,
  useStateWithFireStoreCollection,
} from "../../../utils/useStateWithFirebase";
import { EventObject, nextStartTime } from "../../../utils/model/EventObject";
import Event from "../../organisms/Event";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "./main";
import { Toast } from "react-native-toast-message/lib/src/Toast";
import { searchAlgo } from "../../../utils/search";
import { EventCategory } from "../../../utils/model/EventObject";
import { Timestamp } from "firebase/firestore";
import { colours, fonts, spacing } from "../../subatoms/Theme";
import { Loading } from "../Common/Loading";
import { SearchBar } from "react-native-elements";
import {
  buildCategories,
  calculateNumberOfEvents,
} from "../../../utils/categories";

type props = NativeStackScreenProps<RootStackParamList, "Home">;
// To access the type of user, use route.params.userType

const Home = ({ route, navigation }: props) => {
  /* ---------------------------------- Hooks --------------------------------- */

  const [search, setSearch] = useState("");
  const [listView, setListView] = useState(true);
  const [loading, events, add] =
    useStateWithFireStoreCollection<EventObject>("events");
  const [selectedIndex, setSelectedIndex] = useState(0);
  // const [loading2, categories, setCategories] = useSateWithFireStore<string[]>(
  //   "categories/names",
  //   "list",
  //   []
  // );

  // const [loading3, categoriesValue, setCategoriesValue] = useSateWithFireStore<
  //   number[]
  // >("categories/values", "list", []);

  if (loading) {
    return <Loading />;
  }

  /* ---------------------------------- Toast --------------------------------- */

  const showToast = (save: boolean) => {
    // https://github.com/calintamas/react-native-toast-message/blob/945189fec9746b79d8b5b450e298ef391f8022fb/docs/custom-layouts.md
    Toast.show({
      type: "success",
      text1: save ? "Event Saved" : "Event Unsaved",
      position: "bottom",
      bottomOffset: 0,
      visibilityTime: 1800,
    });
  };

  /* --------------------------- Categories handling -------------------------- */
  // let numberOfEvents = calculateNumberOfEvents(categories, categoriesValue);
  // if (
  //   numberOfEvents != events?.length &&
  //   events != undefined &&
  //   !Number.isNaN(numberOfEvents)
  // ) {
  //   // Case where the categories are not updated
  //   // Should never happen but just in case
  //   let [newCategories, newCategoriesValue] = buildCategories(events);
  //   setCategories(newCategories);
  //   setCategoriesValue(newCategoriesValue);
  // }

  /* ---------------------------- Filter the events --------------------------- */

  // Filtered events
  let filteredEvents = events as EventObject[];
  filteredEvents = searchAlgo(search, filteredEvents);
  // if (selectedIndex !== 0) {
  //   filteredEvents = filteredEvents.filter((event) =>
  //     event.categories.includes(
  //       Object.values(EventCategory)[selectedIndex] as EventCategory
  //     )
  //   );
  // }
  filteredEvents = filteredEvents.filter((event) => {
    let startTime = nextStartTime(event.startTime, event.recurrence);
    if (!startTime) {
      return false;
    }
    return startTime.toMillis() > Timestamp.now().toMillis();
  });

  filteredEvents = filteredEvents.filter((event) => 
    event.state == "Published")

  return (
    <View style={styles.container}>
      <StatusBar translucent />

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Event title */}
        <View style={styles.pageTitle}>
          <Text style={fonts.title1}>Upcoming Events</Text>
        </View>

        {/* Search Bar */}
        <View>
          <SearchBar
            platform="default"
            inputContainerStyle={{
              borderRadius: 6,
              height: 38,
              backgroundColor: "#ebebeb",
            }}
            containerStyle={{
              backgroundColor: "white",
              flex: 1,
              borderBottomColor: "transparent",
              borderTopColor: "transparent",
            }}
            onChangeText={(value) => setSearch(value)}
            placeholder="Search events by name or category"
            // placeholderTextColor="white"
            value={search}
            autoCapitalize="none"
            selectionColor={colours.purple}
          />
        </View>

        {/* List */}
        <FlatList
          style={{}}
          showsVerticalScrollIndicator={false}
          data={filteredEvents}
          renderItem={({ item, index }) => (
            <View style={styles.event}>
              <Event
                organizer={item.organizer}
                id={item.id}
                navigation={navigation}
                userType={route.params.userType}
                onSaveEvent={showToast}
                listView={listView}
              />
            </View>
          )}
        />
      </ScrollView>

      {/* Search bar and Filter */}
      {/* <View
        style={{
          top: 0,
          position: "absolute",
          width: "100%",
          flexDirection: "column",
          display: "flex",
          backgroundColor: 'white'
        }}
      >
        <View style={{ display: "flex", flexDirection: "row" }}>
          <View style={{ flexGrow: 1 }}>
            <View style={{ flexGrow: 0 }}>
            <Toggle
              trackBar={{
                activeBackgroundColor: colours.primaryPurple,
                inActiveBackgroundColor: colours.primaryPurple,
                width: 80,
                // height: 45,
              }}
              trackBarStyle={{
                borderColor: colours.primaryPurple,
              }}
              thumbButton={{
                activeBackgroundColor: colours.secondaryPurple,
                inActiveBackgroundColor: colours.secondaryPurple,
              }}
              onPress={() => setListView(!listView)}
              leftComponent={
                <Icon size={18} type="feather" name="list" color={"white"} />
              }
              rightComponent={
                <Icon size={18} type="feather" name="square" color={"white"} />
              }
            />
          </View>
          </View>
        </View> */}
      {/* <View style={{ backgroundColor: colours.secondaryPurple }}>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            <ButtonGroup
              buttons={Object.values(EventCategory)}
              selectedIndex={selectedIndex}
              buttonContainerStyle={{ borderRadius: 20, borderWidth: 0 }}
              containerStyle={{
                borderWidth: 0,
                padding: 3,
                backgroundColor: colours.secondaryPurple,
                marginLeft: 0,
                marginVertical: 0,
                paddingBottom: 6,
                marginBottom: 7,
              }}
              buttonStyle={{
                borderRadius: 16,
                backgroundColor: colours.primaryPurple,
                marginHorizontal: 4,
                paddingHorizontal: 12,
              }}
              innerBorderStyle={{ width: 0 }}
              textStyle={{ color: "white" }}
              selectedButtonStyle={{ backgroundColor: "green" }}
              onPress={(value) => setSelectedIndex(value)}
            />
          </ScrollView>
        </View> */}
      {/* </View> */}

      {/* Event List*/}
      {/* <FlatList
        style={{ paddingTop: headerHeight - 20 }} // MODIFIED
        // refreshControl={
        //   <RefreshControl refreshing={} onRefresh={} />
        // }
        scrollEventThrottle={1}
        contentContainerStyle={{ paddingBottom: 200 }} // MODIFIED: why modified?
        showsVerticalScrollIndicator={false}
        data={filteredEvents}
        renderItem={({ item, index }) => (
          <View style={styles.event}>
            <Event
              id={item.id}
              navigation={navigation}
              userType={route.params.userType}
              onSaveEvent={showToast}
              listView={listView}
            />
          </View>
        )}
      /> */}

      {/* Toast */}
      <Toast />
    </View>
  );
};

export default Home;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colours.white,
    paddingHorizontal: spacing.page,
  },
  view: {
    position: "absolute",
    width: "100%",
    flexDirection: "column",
    backgroundColor: colours.purple,
  },
  event: {
    // paddingVertical: 20, // MODIFIED
    // justifyContent: "center",
    // margin: 1
    marginVertical: "2%",
  },
  titleContainer: {
    paddingLeft: "3%",
    marginVertical: "3%",
  },
  pageTitle: {
    flexDirection: "row",
    padding: "3%",
  },
});
