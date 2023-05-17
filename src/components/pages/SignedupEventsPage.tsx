import { View, Text } from "react-native";
import Event from "../organisms/Event";
import { ScrollView } from "react-native";

const SignedupEventsPage = () => {

    return (
        <ScrollView>
          <Text>Events you are going to</Text>
          <Event />
        </ScrollView>
    );
    
  };
  
export default SignedupEventsPage;