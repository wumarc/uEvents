import { View, Text } from "react-native";
import Event from "../organisms/Event";
import { ScrollView } from "react-native";

const SavedEventsPage = () => {

    return (
      <ScrollView>
        <Text>Your Saved Events</Text>
        <Event />
        <Event />
        <Event />
        <Event />
        <Event />
      </ScrollView>
    );
    
  };
  
  export default SavedEventsPage;