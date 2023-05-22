import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import Event from "../components/organisms/Event";
import { mockEventClimbing } from "../utils/model/EventObject";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import EventDetails from "../components/organisms/EventDetails";;
import { StyleSheet } from "react-native";

let placeholders = ['1', '1', '1', '1', '1']

const SignedupEventsPage = ({navigation}: any) => {
  
  return (
    <ScrollView
      style={{
        height: "100%",
        width: "100%",
      }}
    >
      {/* Title of page */}
      <View><Text>Your Signed Up Events</Text></View>

      {/* List of events, we will eventually replace placeholders with events from the db */}
      {placeholders.map((item, index) => {
        return (
          <TouchableOpacity
            key={index}
            onPress={() => {navigation.navigate('DetailedView')}}
          >
              <Event
                key={index}
                event={mockEventClimbing}
              />
          </TouchableOpacity>
        );
      })}

    </ScrollView>
  );

};


const styles = StyleSheet.create({
  
})


export default SignedupEventsPage;
