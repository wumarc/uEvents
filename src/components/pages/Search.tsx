import { View, Text, ScrollView, FlatList } from "react-native";
import { useEffect, useState } from "react";
import { SearchBar } from "@rneui/themed";
import {
  EventObject,
  mockEventClimbing,
  mockEventGaming,
  mockEventPainting,
} from "../../utils/model/EventObject";
import Event from "../organisms/Event";
import { colours } from "../subatoms/colours/colours";
import { TouchableOpacity } from "react-native";
import { useStateWithFireStoreCollection } from "../../utils/useStateWithFirebase";

const Search = ({ navigation }: any) => {
  const [loading, events, add] =
    useStateWithFireStoreCollection<EventObject>("events");

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
        containerStyle={{ backgroundColor: colours.secondaryPurple }}
        inputContainerStyle={{}}
        inputStyle={{}}
        leftIconContainerStyle={{}}
        rightIconContainerStyle={{}}
        lightTheme
        loadingProps={{}}
        onChangeText={(newVal) => {
          setValue(newVal);
        }}
        placeholder="What event are you looking for?"
        placeholderTextColor="#8A4287"
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
        renderItem={({ item }) => <Event id={item.id} />}
      />
    </View>
  );
};

export default Search;
