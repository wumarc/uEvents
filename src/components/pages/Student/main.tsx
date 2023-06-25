import Home from "./Home";
import Profile from "./Profile";
import SavedEvents from "./SavedEvents";
import EventsTickets from "./EventsTickets";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { SafeAreaView, StyleSheet } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import EventDetails from "./EventDetails";
import { Platform } from "react-native";
import { colours } from "../../subatoms/colours";
import EventSignUp from "./EventSignUp";
import { FC } from "react";
import { Text } from "react-native-elements";
import { useTheme } from "react-native-paper";

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

  const theme = useTheme();
  theme.colors.secondaryContainer = 'transparent';

  return (
    <Tab.Navigator 
      barStyle={{ backgroundColor: colours.secondaryPurple }}
      activeColor= {colours.primaryPurple}
      inactiveColor={"white"}
      initialRouteName="Home"
    >
      <Tab.Screen
        name="Saved"
        component={SavedEvents as any} // TODO fix error
        initialParams={{userType: route.params.userType}}
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
        component={Home as any} // TODO fix error
        initialParams={{ userType: route.params.userType }}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ color, focused }) => (
            <MaterialCommunityIcons
              name={focused ? "home" : "home-outline"}
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
          tabBarIcon: ({ color, focused }) => (
            <MaterialCommunityIcons
              name={ focused ? "account-circle" : "account-circle-outline"}
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
