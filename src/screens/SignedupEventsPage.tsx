import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import Event from "../components/organisms/Event";
import { mockEventClimbing } from "../utils/model/EventObject";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import EventDetails from "../components/organisms/EventDetails";;
import { Button } from "@rneui/base";

let placeholders = ['1', '1', '1', '1', '1']

const HomeView = ({navigation}: {navigation: any}) => {
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
            onPress={() => {navigation.navigate('DetailsView')}}
          >
              <Event
                key={index}
                event={mockEventClimbing}
              />
          </TouchableOpacity>
        );
      })}

    </ScrollView>
  )
}

const DetailsView = ({navigation}: {navigation: any}) => {
  return (
    <View>
      <EventDetails/>
    </View>
  )
}

const Stack = createNativeStackNavigator();

const SignedupEventsPage = () => {
  
  return (
    <Stack.Navigator initialRouteName="HomeView">
      <Stack.Screen 
        name="HomeView" 
        component={HomeView}
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen 
        name="DetailsView" 
        component={DetailsView}
      />
    </Stack.Navigator>
  );

};

export default SignedupEventsPage;
