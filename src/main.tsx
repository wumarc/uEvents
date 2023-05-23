import Home from "./components/pages/Home";
import Profile from "./components/pages/Profile";
import SavedEvents from "./components/pages/SavedEvents";
import EventsTickets from "./components/pages/EventsTickets";
import Search from "./components/pages/Search";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { SafeAreaView, StyleSheet } from "react-native";
import { Platform } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import EventDetails from "./components/organisms/EventDetails";
import { View, Text } from "react-native";
import { colours } from "./components/subatomic/colours/colours";
// import 'react-native-gesture-handler';

const Tab = createMaterialBottomTabNavigator();
const Stack = createNativeStackNavigator();

const MainView = () => {
  return (
    <Tab.Navigator 
      barStyle={{ backgroundColor: colours.secondary }}
    >
      <Tab.Screen
        name="Events"
        component={EventsTickets}
        options={{
          tabBarLabel: "Tickets",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="calendar" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Saved"
        component={SavedEvents}
        options={{
          tabBarLabel: "Saved",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="calendar-heart"
              color={color}
              size={26}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="home" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Search"
        component={Search}
        options={{
          tabBarLabel: "Search",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="magnify" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarLabel: "Profile",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="account-circle"
              color={color}
              size={26}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const DetailedView = () => {
  return <EventDetails />;
};

const SignupView = () => {
  return (
    <View>
      <Text>Signup View</Text>
    </View>
  );
};

export default function Main() {
  return (
    <NavigationContainer>
      <SafeAreaView style={styles.container}>
        <Stack.Navigator initialRouteName="MainView">
          {/* Main View */}
          <Stack.Screen
            name="MainView"
            component={MainView}
            options={{
              headerShown: false,
            }}
          />
          {/* Any other view that adds a stack to the main view, we only have detailedView for events */}
          <Stack.Screen name="DetailedView" component={DetailedView} />
          <Stack.Screen name="SignupView" component={SignupView} />
        </Stack.Navigator>
      </SafeAreaView>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colours.secondary,
    paddingTop: Platform.OS === "android" ? 25 : 0,
  },
});
