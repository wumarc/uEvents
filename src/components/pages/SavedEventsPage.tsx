import { View, Text } from "react-native";
import Event from "../organisms/Event";

const SavedEventsPage = () => {

    return (
      <View>
        <Text>Your Saved Events</Text>
        <Event />
        <Event />
        <Event />
        <Event />
        <Event />
      </View>
    );
    
  };
  
  export default SavedEventsPage;