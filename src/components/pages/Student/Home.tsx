import {
  ScrollView,
  StyleSheet,
  View,
  Animated,
} from "react-native";
import { useEffect, useRef, useState } from "react";
import { Text } from "@rneui/themed";
import { useStateWithFireStoreCollection } from "../../../utils/useStateWithFirebase";
import { EventObject, nextStartTime } from "../../../utils/model/EventObject";
import Event from "../../organisms/Event";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "./main";
import { Toast } from "react-native-toast-message/lib/src/Toast";
import { SearchBar } from "@rneui/themed";
import { colours } from "../../subatoms/colours";
import { Button, ButtonGroup } from "react-native-elements";
import { searchAlgo } from "../../../utils/search";
import { EventCategory } from "../../../utils/model/EventObject";
import { Timestamp } from "firebase/firestore";
import Toggle from "react-native-toggle-element"
import { Icon } from "react-native-elements";
import { color } from "@rneui/base";

type props = NativeStackScreenProps<RootStackParamList, "Home">;
// To access the type of user, use route.params.userType

const CONTAINER_HEIGHT = 100;

const Home = ({ route, navigation }: props) => {
  // const [loading, dbListenedValue, set, add, remove] =
  //   useSateWithFireStoreArray<EventObject>("event/eventList", "eventListObj");

  const [search, setSearch] = useState("");

  const scrollY = useRef(new Animated.Value(0)).current;
  const offsetAnim = useRef(new Animated.Value(0)).current;
  const clampedScroll = Animated.diffClamp(
    Animated.add(
      scrollY.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 1],
        extrapolateLeft: "clamp",
      }),
      offsetAnim
    ),
    0,
    CONTAINER_HEIGHT
  );
  var _clampedScrollValue = 0;
  var _offsetValue = 0;
  var _scrollValue = 0;

  useEffect(() => {
    scrollY.addListener(({ value }) => {
      const diff = value - _scrollValue;
      _scrollValue = value;
      _clampedScrollValue = Math.min(
        Math.max(_clampedScrollValue + diff, 0),
        CONTAINER_HEIGHT
      );
    });
    offsetAnim.addListener(({ value }) => {
      _offsetValue = value;
    });
  }, []);

  var scrollEndTimer = null;

  const onMomentumScrollBegin = () => {
    clearTimeout(scrollEndTimer);
  };

  const onMomentumScrollEnd = () => {
    const toValue =
      _scrollValue > CONTAINER_HEIGHT &&
      _clampedScrollValue > CONTAINER_HEIGHT / 2
        ? _offsetValue + CONTAINER_HEIGHT
        : _offsetValue - CONTAINER_HEIGHT;

    Animated.timing(offsetAnim, {
      toValue,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  const onScrollEndDrag = () => {
    scrollEndTimer = setTimeout(onMomentumScrollEnd, 250);
  };

  const headerTranslate = clampedScroll.interpolate({
    inputRange: [0, CONTAINER_HEIGHT],
    outputRange: [0, -CONTAINER_HEIGHT],
    extrapolate: "clamp",
  });

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
      bottomOffset: 0,
      visibilityTime: 1800,
    });
  };

  // Filtered events
  let filteredEvents = events as EventObject[];
  filteredEvents = searchAlgo(search, filteredEvents);
  if (selectedIndex !== 0) {
    filteredEvents = filteredEvents.filter((event) =>
      event.categories.includes(
        Object.values(EventCategory)[selectedIndex] as EventCategory
      )
    );
  }
  filteredEvents = filteredEvents.filter((event) => {
    let startTime = nextStartTime(event.startTime, event.recurrence);
    if (!startTime) {
      return false;
    }
    return startTime.toMillis() > Timestamp.now().toMillis();
  });

  return (
    // NOTE: This is weird but the flatlist is not scrollable if the view is not flex: 1
    <View style={{ flex: 1, flexDirection: "row" }}>
      {/* Event List*/}
      <Animated.FlatList
        style={{
          paddingTop: 113, // MODIFIED
        }}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
        // refreshControl={
        //   <RefreshControl refreshing={} onRefresh={} />
        // }
        onMomentumScrollBegin={onMomentumScrollBegin}
        onMomentumScrollEnd={onMomentumScrollEnd}
        onScrollEndDrag={onScrollEndDrag}
        scrollEventThrottle={1}
        contentContainerStyle={{ paddingBottom: 200 }} // MODIFIED: why modified?
        showsVerticalScrollIndicator={false}
        data={filteredEvents}
        renderItem={({ item, index }) => (
          <View style={styles.event}>
            <Event
              id={item.id}
              imageId={item.images[0] ?? ""}
              navigation={navigation}
              userType={route.params.userType}
              onSaveEvent={showToast}
            />
          </View>
        )}
      />

      {/* Search bar and Filter */}
      <Animated.View
        style={[
          styles.view,
          { top: 0, transform: [{ translateY: headerTranslate }] },
        ]}
      >
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <View>
            <Toggle
              value={"toggleValue"}
              trackBar={{
                activeBackgroundColor: colours.primaryPurple, 
                inActiveBackgroundColor: colours.primaryPurple,
                width: 80,
                height: 45,
                // borderWidth: 1,
              }}
              trackBarStyle={{
                borderColor: colours.primaryPurple,
              }}
              thumbButton={{
                activeBackgroundColor: colours.secondaryPurple, 
                inActiveBackgroundColor: colours.secondaryPurple
              }}
              // onPress={(newState) => setToggleValue(newState)}
              leftComponent={<Icon size={18} type="feather" name='list' color={'white'}/>}
              rightComponent={<Icon size={18} type="feather" name='square' color={'white'}/>}
            />
          </View>
          <View>
            <Text style={{fontFamily: 'Zapfino'}}>uEvents</Text>
          </View>
          <View>
            <Button
              buttonStyle={{ width: 10 }}
              containerStyle={{ margin: 5 }}
              disabledStyle={{
                borderWidth: 2,
                borderColor: "#00F"
              }}
              disabledTitleStyle={{ color: "#00F" }}
              // linearGradientProps={null}
              icon={<Icon type="ionicons" name="search-outline" size={15} color="#0FF" />}
              // iconContainerStyle={{ background: "#000" }}
              loadingProps={{ animating: true }}
              loadingStyle={{}}
              onPress={() => alert("click")}
              titleProps={{}}
              titleStyle={{ marginHorizontal: 5 }}
            />
          </View>
        </View>
        <SearchBar
          platform="default"
          inputContainerStyle={{
            borderRadius: 20,
            backgroundColor: "white",
            margin: 0,
          }}
          containerStyle={{
            backgroundColor: colours.secondaryPurple,
            borderWidth: 0,
            borderBottomColor: "transparent",
            borderTopColor: "transparent",
          }}
          onChangeText={(value) => {
            setSearch(value);
          }}
          placeholder="Search events by name"
          placeholderTextColor="#121212"
          value={search}
          autoCapitalize="none"
          selectionColor={colours.primaryPurple}
        />
        <View style={{ backgroundColor: colours.secondaryPurple }}>
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
        </View>
      </Animated.View>

      {/* Toast */}
      <Toast />
    </View>
  );
};

export default Home;

export const styles = StyleSheet.create({
  view: {
    position: "absolute",
    width: "100%",
    // left: 0,
    // right: 0,
    // height: CONTAINER_HEIGHT, // MODIFIED
  },
  event: {
    paddingVertical: 20, // MODIFIED
    justifyContent: "center",
  },
  title: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
    paddingStart: 8,
  },
});
