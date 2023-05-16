import { View, Text } from "react-native";
import Event from "../organisms/Event";

const SignedupEventsPage = () => {

    return (
        <View>
          <Text>Events you are going to</Text>
          <Event />
        </View>
    );
    
  };
  
export default SignedupEventsPage;