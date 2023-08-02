import Home from "./Home";
import Profile from "./Profile";
import SavedEvents from "./SavedEvents";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { SafeAreaView, StatusBar, StyleSheet } from "react-native";
import { createNativeStackNavigator, NativeStackScreenProps } from "@react-navigation/native-stack";
import EventDetails from "./EventDetails";
import { Platform } from "react-native";
import { colours } from "../../subatoms/colours";
import EventSignUp from "./EventSignUp";
import { FC, useState } from "react";
import { useTheme } from "react-native-paper";
import PrivacyPolicy from "./PrivacyPolicy";
import Support from "./Support";
import AccountSettings from "./AccountSettings";
import OrganizerProfile from "./OrganizerProfile";
import Organizers from "./Organizers";

const Tab = createMaterialBottomTabNavigator();
const Stack = createNativeStackNavigator();

export type RootStackParamList = {
  MainView: { userType: string };
  EventDetailsView: {
    userType: string;
    eventID: string;
    organizerID: string;
    imageID: string;
  };
  EventSignUpView: { userType: string };
  Events: { userType: string };
  Saved: { userType: string };
  Home: { userType: string };
  Search: { userType: string };
  Profile: { userType: string };
};

type props = NativeStackScreenProps<RootStackParamList, "MainView">;

const MainView = ({ route, navigation}: props) => {
  
  useTheme().colors.secondaryContainer = "transparent"; // This removes the background color of the bottom bar

  return (
    <Tab.Navigator
      barStyle={{backgroundColor: 'white'}}
      activeColor={colours.primaryPurple}
      inactiveColor={colours.primaryPurple}
      initialRouteName="Home"
    >
      <Tab.Screen
        name="Saved"
        // listeners={{ tabPress: (e) => showHeader.saved }}
        component={SavedEvents as any} // TODO fix error
        initialParams={{ userType: route.params.userType }}
        options={{
          tabBarLabel: "Saved",
          title: "Saved",
          tabBarIcon: ({ color, focused }) => (
            <MaterialCommunityIcons
              name={focused ? "heart" : "heart-outline"}
              color={colours.primaryPurple}
              size={30}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Home"
        // listeners={{ tabPress: (e) => showHeader.home }}
        component={Home as any} // TODO fix error
        initialParams={{ userType: route.params.userType }}
        options={{
          tabBarLabel: "Events",
          tabBarIcon: ({ color, focused }) => (
            <MaterialCommunityIcons
              name={focused ? "jellyfish" : "jellyfish-outline"}
              color={colours.primaryPurple}
              size={30}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Organizers"
        // listeners={{ tabPress: (e) => showHeader.profile }}
        component={Organizers as any} // TODO fix error
        initialParams={{ userType: route.params.userType }}
        options={{
          tabBarLabel: "Organizers",
          tabBarIcon: ({ color, focused }) => (
            <MaterialCommunityIcons
              name={focused ? "office-building" : "office-building-outline"}
              color={colours.primaryPurple}
              size={30}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        // listeners={{ tabPress: (e) => showHeader.profile }}
        component={Profile as any} // TODO fix error
        initialParams={{ userType: route.params.userType }}
        options={{
          tabBarLabel: "Settings",
          tabBarIcon: ({ color, focused }) => (
            <MaterialCommunityIcons
              name={focused ? "cog" : "cog-outline"}
              color={colours.primaryPurple}
              size={30}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

// This is a custom hook to show the header only on the home page
// const customHeaderHook = () => {
//   const [globalCurrentTab, setGlobalCurrentTab] = useState("Home");
//   const home = () => {setGlobalCurrentTab("Home")}
//   const saved = () => {setGlobalCurrentTab("Saved")}
//   const profile = () => {setGlobalCurrentTab("Profile")}
//   const getGlobalCurrentTab = () => {return globalCurrentTab}
//   return {home, saved, profile, getGlobalCurrentTab}
// }

const Main: FC<{ userType: string }> = (props) => {
  
  // const showHeader = customHeaderHook();

  return (
    <NavigationContainer>
      <SafeAreaView style={styles.container}>
        <Stack.Navigator initialRouteName="MainView">
          {/* Main View */}
          <Stack.Screen
            name="MainView"
            component={MainView as any} // TODO fix error
            initialParams={{ userType: props.userType }}
            options={{ // TODO
              // headerShown: showHeader.getGlobalCurrentTab() == "Home", // Show header only if you're on the home page
              headerShown: false,
            }}
          />
          {/* Any other view that adds a stack to the main view */}
          <Stack.Screen
            name="EventDetailsView"
            component={EventDetails as any} // TODO fix error
            options={{
              // headerRight: () => <Text>Save</Text>,
              title: "",
              headerTransparent: true,
              headerTintColor: colours.primaryPurple,
              // headerLeft: () => <HeaderLeft/>
            }}
          />
          <Stack.Screen
            name="EventSignUpView"
            component={EventSignUp as any}
            options={{title: "Complete your RSVP"}}
          />
          <Stack.Screen 
            name="AccountSettingsView" 
            component={AccountSettings as any}
            options={{
              title: "Account Settings",
              headerStyle: {backgroundColor: colours.secondaryPurple},
              headerTintColor: 'white',
              headerTitleStyle: {fontWeight: 'bold'}
            }}
          />
          <Stack.Screen 
            name="PrivacyPolicyView" 
            component={PrivacyPolicy as any}
            options={{
              title: "Privacy Policy",
              headerStyle: {backgroundColor: colours.secondaryPurple},
              headerTintColor: 'white',
              headerTitleStyle: {fontWeight: 'bold'}
            }}
          />
          <Stack.Screen 
            name="SupportView" 
            component={Support as any}
            options={{
              title: "Support",
              headerStyle: {backgroundColor: colours.secondaryPurple},
              headerTintColor: 'white',
              headerTitleStyle: {fontWeight: 'bold'}
            }}
          />
          <Stack.Screen
            name="EventOrganizerView"
            component={OrganizerProfile as any}
            options={{
              title: "Organizer Profile",
              headerStyle: {backgroundColor: colours.secondaryPurple},
              headerTintColor: 'white',
              headerTitleStyle: {fontWeight: 'bold'}
            }}
          />
          {/* <Stack.Screen name="ChangePasswordView" component={ChangePassword} /> */}
        </Stack.Navigator>
      </SafeAreaView>
    </NavigationContainer>
  );
};

export default Main;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: colours.secondaryPurple,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
});