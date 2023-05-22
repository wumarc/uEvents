import { View, Text, ScrollView } from "react-native";
import { useEffect, useState } from "react";
import { SearchBar } from '@rneui/themed';
import { EventObject, mockEventClimbing, mockEventGaming, mockEventPainting } from "../utils/model/EventObject";
import Event from "../components/organisms/Event";
import { colours } from "../../theme/colours/colours";

const SearchPage = () => {

  const [filteredEvent, setFilteredEvent] = useState<EventObject[]>([]);
  const [allEvents, setAllEvents] = useState<EventObject[]>([
    mockEventClimbing,
    mockEventGaming,
    mockEventPainting
  ]);
  const [value, setValue] = useState<string>("");

  useEffect(() => {
    setFilteredEvent(allEvents.filter(event => event.name.toLowerCase().includes(value.toLowerCase())));
    console.log("------------");
      {filteredEvent.map(event => {
        return (console.log(event.name));
      })}
    console.log("------------");
  }, [value]);

  return (
    <View>
      
      {/* Search Bar */}
      <SearchBar
        platform="default"
        containerStyle={{backgroundColor: colours.secondary}}
        inputContainerStyle={{}}
        inputStyle={{}}
        leftIconContainerStyle={{}}
        rightIconContainerStyle={{}}
        lightTheme
        loadingProps={{}}
        onChangeText={newVal => {setValue(newVal)}}
        placeholder="What event are you looking for?"
        placeholderTextColor="#888"
        round
        value={value}
      />

      {/* Search Results */}
      <ScrollView>
        {filteredEvent.map((event, index) => {
          return (
            <View key={index}>
              <Event event={event} />
            </View>
          )}
        )}
      </ScrollView>

    </View>
  );
    
};
  
export default SearchPage;