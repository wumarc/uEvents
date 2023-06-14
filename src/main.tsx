import Home from "./components/pages/Student/Home";
import Profile from "./components/pages/Student/Profile";
import SavedEvents from "./components/pages/Student/SavedEvents";
import EventsTickets from "./components/pages/Student/EventsTickets";
import Search from "./components/pages/Student/Search";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { Easing, SafeAreaView, StyleSheet } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import EventDetails from "./components/pages/Student/EventDetails";
import { View, Text, Platform } from "react-native";
import { colours } from "./components/subatoms/colours/colours";
import EventSignUp from "./components/pages/Student/EventSignUp";
import ConfirmedEvent from "./components/pages/Student/ConfirmedEvent";
import { getFirebaseUserIDOrEmpty } from "./utils/util";
import {
  addDocumentToCollection,
  useStateWithFireStoreDocument,
} from "./utils/useStateWithFirebase";
import { AccountSelectionPage } from "./components/pages/Common/AccountSelection";
import CreateEvent from "./components/pages/EventOrganizer/CreateEvent";
import { CardStyleInterpolators } from "@react-navigation/stack";
// import 'react-native-gesture-handler';

const Tab = createMaterialBottomTabNavigator();
const Stack = createNativeStackNavigator();

export type RootStackParamList = {
  MainView: { userType: string };
  EventDetailsView: { userType: string; eventID: string; organizerID: string };
  EventSignUpView: { userType: string };
  ConfirmedEventView: { userType: string };
  Events: { userType: string };
  Saved: { userType: string };
  Home: { userType: string };
  Search: { userType: string };
  Profile: { userType: string };
  CreateEventView: { userType: string };
};

type props = NativeStackScreenProps<RootStackParamList, "MainView">;

const MainView = ({ route, navigation }: props) => {
  return (
    <Tab.Navigator barStyle={{ backgroundColor: colours.secondaryPurple }}>
      <Tab.Screen
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
      />
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
      <Tab.Screen
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
      />
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

export default function Main() {
  const [loading, userData, setUserData] = useStateWithFireStoreDocument(
    "users",
    getFirebaseUserIDOrEmpty()
  );

  if (loading) {
    return <Text>Loading</Text>;
  }

  if (!userData) {
    return <AccountSelectionPage />;
  }

  return (
    <NavigationContainer>
      <SafeAreaView style={styles.container}>
        <Stack.Navigator initialRouteName="MainView">
          {/* Main View */}
          <Stack.Screen
            name="MainView"
            component={MainView as any} // TODO fix error
            initialParams={{ userType: userData.type }}
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
              title: "Event",
              // Add transition effect to stacks
            }}
          />
          <Stack.Screen name="EventSignUpView" component={EventSignUp} />
          <Stack.Screen name="ConfirmedEventView" component={ConfirmedEvent} />
          <Stack.Screen
            name="CreateEventView"
            component={CreateEvent as any} // TODO fix error
          />
          {/* <Stack.Screen name="ClubProfileView" component={} /> */}
        </Stack.Navigator>
      </SafeAreaView>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colours.secondaryPurple,
    paddingTop: Platform.OS === "android" ? 25 : 0,
  },
});
