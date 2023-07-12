import {
  FlatList,
  ScrollView,
  StyleSheet,
  View,
  Animated
} from "react-native";
import { useEffect, useRef, useState } from "react";
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

const CONTAINER_HEIGHT = 100;

const Home = ({ route, navigation }: props) => {
  // const [loading, dbListenedValue, set, add, remove] =
  //   useSateWithFireStoreArray<EventObject>("event/eventList", "eventListObj");
  
  const scrollY = useRef(new Animated.Value(0)).current;
  const offsetAnim = useRef(new Animated.Value(0)).current;
  const [focused, setFocused] = useState('home');
  const clampedScroll = Animated.diffClamp(
    Animated.add(
      scrollY.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 1],
        extrapolateLeft: 'clamp',
      }),
      offsetAnim,
    ),
    0,
    CONTAINER_HEIGHT
  )
  var _clampedScrollValue = 0;
  var _offsetValue = 0;
  var _scrollValue = 0;
  useEffect(() => {
    scrollY.addListener(({ value }) => {
      const diff = value - _scrollValue;
      _scrollValue = value;
      _clampedScrollValue = Math.min(
        Math.max(_clampedScrollValue + diff, 0),
        CONTAINER_HEIGHT,
      )
    });
    offsetAnim.addListener(({ value }) => {
      _offsetValue = value;
    })
  }, []);

  var scrollEndTimer = null;
  const onMomentumScrollBegin = () => {
    clearTimeout(scrollEndTimer)
  }
  const onMomentumScrollEnd = () => {
    const toValue = _scrollValue > CONTAINER_HEIGHT &&
      _clampedScrollValue > (CONTAINER_HEIGHT) / 2
      ? _offsetValue + CONTAINER_HEIGHT : _offsetValue - CONTAINER_HEIGHT;

    Animated.timing(offsetAnim, {
      toValue,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }
  const onScrollEndDrag = () => {
    scrollEndTimer = setTimeout(onMomentumScrollEnd, 250);
  }

  const headerTranslate = clampedScroll.interpolate({
    inputRange: [0, CONTAINER_HEIGHT],
    outputRange: [0, -CONTAINER_HEIGHT],
    extrapolate: 'clamp',
  })
  const opacity = clampedScroll.interpolate({
    inputRange: [0, CONTAINER_HEIGHT - 20, CONTAINER_HEIGHT],
    outputRange: [1, 0.05, 0],
    extrapolate: 'clamp',
  })
  const bottomTabTranslate = clampedScroll.interpolate({
    inputRange: [0, CONTAINER_HEIGHT],
    outputRange: [0, CONTAINER_HEIGHT * 2],
    extrapolate: 'clamp',
  })

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
    <View>

      {/* Event List*/}
      <Animated.FlatList
        style={{paddingTop: 100}}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
        onMomentumScrollBegin={onMomentumScrollBegin}
        onMomentumScrollEnd={onMomentumScrollEnd}
        onScrollEndDrag={onScrollEndDrag}
        scrollEventThrottle={1}
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

      {/* Search bar and Filter */}
      <Animated.View
        style={[styles.view, { top: 0, transform: [{ translateY: headerTranslate }]}]}
      >
        <SearchBar
          platform="default"
          inputContainerStyle={{borderRadius: 20, backgroundColor: 'white', margin: 0}}
          inputStyle={{}}
          containerStyle={{ backgroundColor: colours.secondaryPurple, borderWidth: 0, borderBottomColor: 'transparent', borderTopColor: 'transparent'}}
          // leftIconContainerStyle={{backgroundColor: 'green', padding: 3}}
          rightIconContainerStyle={{}}
          loadingProps={{}}
          onChangeText={() => {}}
          placeholder="Search events by name"
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

      {/* Toast */}
      <Toast/>

    </View>
  );
};

export default Home;

export const styles = StyleSheet.create({
  view: {
    position: 'absolute',
    // left: 0,
    // right: 0,
    height: CONTAINER_HEIGHT,
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
