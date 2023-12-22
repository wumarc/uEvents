import { View, Text, ScrollView, FlatList } from "react-native";
import { useEffect, useState } from "react";
import { SearchBar } from "@rneui/themed";
import { EventObject } from "../../../utils/model/EventObject";
import Event from "../../organisms/Event";
import { colours } from "../../subatoms/Theme";
import { TouchableOpacity } from "react-native";
import { useStateWithFireStoreCollection } from "../../../utils/useStateWithFirebase";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "./main";

type props = NativeStackScreenProps<RootStackParamList, "Search">;
// To access the type of user, use route.params.userType

const Search = ({ route, navigation }: props) => {
  const [loading, events, add] = useStateWithFireStoreCollection<EventObject>("events");

  const [value, setValue] = useState<string>("");

  if (loading) {
    return <Text>Loading</Text>;
  }

  // useEffect(() => {
  //   setFilteredEvent(
  //     allEvents.filter((event) =>
  //       event.name.toLowerCase().includes(value.toLowerCase())
  //     )
  //   );
  //   console.log("------------");
  //   {
  //     filteredEvent.map((event) => {
  //       return console.log(event.name);
  //     });
  //   }
  //   console.log("------------");
  // }, [value]);

  function filterEvents(event: EventObject): boolean {
    return event.name.toLowerCase().includes(value.toLowerCase());
  }

  return (
    <View>
      {/* Search Bar */}
      <SearchBar
        platform="default"
        containerStyle={{ backgroundColor: colours.secondaryGrey }}
        inputContainerStyle={{}}
        inputStyle={{}}
        leftIconContainerStyle={{}}
        rightIconContainerStyle={{}}
        lightTheme
        loadingProps={{}}
        onChangeText={(newVal) => {
          setValue(newVal);
        }}
        placeholder="Search?"
        placeholderTextColor="#121212"
        round
        value={value}
      />

      {/* Search Results */}
      {/* <ScrollView>
        {filteredEvent.map((event, index) => {
          return (
            <TouchableOpacity
              key={index}
              onPress={() => {
                navigation.navigate("EventDetailsView");
              }}
            >
              <Event
                isSaved={false} 
                saveEvent={() => {}} 
                key={index}
                event={mockEventClimbing}
              />
            </TouchableOpacity>
          );
        })}
      </ScrollView> */}

      <FlatList
        data={events?.filter(filterEvents)}
        renderItem={({ item }) => <Event organizer={item.organizer} id={item.id} userType={route.params.userType} navigation={navigation} />}
      />
    </View>
  );
};

export default Search;
