import Home from "./Home";
import Profile from "./Profile";
import SavedEvents from "./SavedEvents";
import EventsTickets from "./EventsTickets";
import Search from "./Search";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { SafeAreaView, StyleSheet } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import EventDetails from "./EventDetails";
import { Platform } from "react-native";
import { colours } from "../../subatoms/colours/colours";
import EventSignUp from "./EventSignUp";
import { FC } from "react";
import { Text } from "react-native-elements";

const Tab = createMaterialBottomTabNavigator();
const Stack = createNativeStackNavigator();

export type RootStackParamList = {
  MainView: { userType: string };
  EventDetailsView: { userType: string; eventID: string; organizerID: string };
  EventSignUpView: { userType: string };
  Events: { userType: string };
  Saved: { userType: string };
  Home: { userType: string };
  Search: { userType: string };
  Profile: { userType: string };
};

type props = NativeStackScreenProps<RootStackParamList, "MainView">;

const MainView = ({ route, navigation }: props) => {
  return (
    <Tab.Navigator 
      barStyle={{ backgroundColor: colours.secondaryPurple }}
      initialRouteName="Home"
    >
      {/* <Tab.Screen
        name="Events"
        component={EventsTickets as any} // TODO fix error
        initialParams={{ userType: route.params.userType }}
        options={{
          tabBarLabel: "Tickets",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="ticket"
              color={colours.primaryPurple}
              size={30}
            />
          ),
        }}
      /> */}
      <Tab.Screen
        name="Saved"
        component={SavedEvents as any} // TODO fix error
        initialParams={{ userType: route.params.userType }}
        options={{
          tabBarLabel: "Saved",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="heart"
              color={colours.primaryPurple}
              size={30}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Home"
        component={Home as any} // TODO fix error
        initialParams={{ userType: route.params.userType }}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="home"
              color={colours.primaryPurple}
              size={30}
            />
          ),
        }}
      />
      {/* <Tab.Screen
        name="Search"
        component={Search as any} // TODO fix error
        initialParams={{ userType: route.params.userType }}
        options={{
          tabBarLabel: "Search",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="magnify"
              color={colours.primaryPurple}
              size={30}
            />
          ),
        }}
      /> */}
      <Tab.Screen
        name="Profile"
        component={Profile as any} // TODO fix error
        initialParams={{ userType: route.params.userType }}
        options={{
          tabBarLabel: "Profile",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="account-circle"
              color={colours.primaryPurple}
              size={30}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const Main: FC<{ userType: string }> = (props) => {
  return (
    <NavigationContainer>
      <SafeAreaView style={styles.container}>
        <Stack.Navigator initialRouteName="MainView">
          {/* Main View */}
          <Stack.Screen
            name="MainView"
            component={MainView as any} // TODO fix error
            initialParams={{ userType: props.userType }}
            options={{
              headerShown: false,
            }}
          />
          {/* Any other view that adds a stack to the main view */}
          <Stack.Screen
            name="EventDetailsView"
            component={EventDetails as any} // TODO fix error
            options={{
              // headerLeft: () => (),
              headerRight: () => <Text>Save</Text>,
              title: "",
              headerTransparent: true,
              // Add transition effect to stacks
            }}
          />
          <Stack.Screen 
            name="EventSignUpView" 
            component={EventSignUp}
            options={{
              title: "Complete your RSVP",
            }}
          />
          {/* <Stack.Screen name="ClubProfileView" component={} /> */}
        </Stack.Navigator>
      </SafeAreaView>
    </NavigationContainer>
  );
};

export default Main;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colours.secondaryPurple,
    paddingTop: Platform.OS === "android" ? 25 : 0,
  },
});
