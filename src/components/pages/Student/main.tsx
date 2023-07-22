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
import { FC } from "react";
import { useTheme } from "react-native-paper";
import PrivacyPolicy from "./PrivacyPolicy";
import Support from "./Support";
import AccountSettings from "./AccountSettings";

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

const MainView = ({ route, navigation }: props) => {
  const theme = useTheme();
  theme.colors.secondaryContainer = "transparent";

  return (
    <Tab.Navigator
      barStyle={{ backgroundColor: colours.secondaryPurple }}
      activeColor={colours.primaryPurple}
      inactiveColor={"white"}
      initialRouteName="Home"
    >
      <Tab.Screen
        name="Saved"
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
        component={Home as any} // TODO fix error
        initialParams={{ userType: route.params.userType }}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ color, focused }) => (
            <MaterialCommunityIcons
              name={focused ? "jellyfish" : "jellyfish-outline"}
              color={colours.primaryPurple}
              size={30}
            />
          ),
        }}
      />
      {/* <Tab.Screen
        name="Forum"
        component={Forum as any} // TODO fix error
        initialParams={{ userType: route.params.userType }}
        options={{
          tabBarLabel: "Forum",
          tabBarIcon: ({ color, focused }) => (
            <MaterialCommunityIcons
              name={focused ? "chat-processing" : "chat-processing-outline"}
              color={colours.primaryPurple}
              size={30}
            />
          )
        }}
      /> */}
      <Tab.Screen
        name="Profile"
        component={Profile as any} // TODO fix error
        initialParams={{ userType: route.params.userType }}
        options={{
          tabBarLabel: "Profile",
          tabBarIcon: ({ color, focused }) => (
            <MaterialCommunityIcons
              name={focused ? "account-circle" : "account-circle-outline"}
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
            options={{title: "Account Settings"}}
          />
          <Stack.Screen 
            name="PrivacyPolicyView" 
            component={PrivacyPolicy as any}
            options={{title: "Privacy Policy"}}
          />
          <Stack.Screen 
            name="SupportView" 
            component={Support as any}
            options={{
              headerStyle: {backgroundColor: colours.secondaryPurple},
              title: "Support",
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
    backgroundColor: colours.secondaryPurple,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
});