import Home from "./Home";
import Settings from "./Settings";
import SavedEvents from "./SavedEvents";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { SafeAreaView, StatusBar, StyleSheet, Platform } from "react-native";
import { createNativeStackNavigator, NativeStackScreenProps } from "@react-navigation/native-stack";
import EventDetails from "./EventDetails";
import { FC } from "react";
import { useTheme } from "react-native-paper";
import AccountSettings from "./AccountSettings";
import OrganizerProfile from "./OrganizerProfile";
import BrowseOrganizers from "./BrowseOrganizers";
import HeaderLeft from "../../molecules/HeaderLeft";
import { colours } from "../../subatoms/Theme";
import HeaderRight from "../../molecules/HeaderRight";
import ProfileHeaderRight from "../../molecules/ProfileHeaderRight";
import { HiddenEvents } from "./HiddenEvents";
import BlockedOrganizers from "./BlockedOrganizers";

const Tab = createMaterialBottomTabNavigator();
const Stack = createNativeStackNavigator();

export type RootStackParamList = {
  MainView: {};
  AccountSettingsView: {};
  EventDetailsView: { eventID: string; organizerID: string; imageID: string };
  EventSignUpView: {};
  Events: {};
  Saved: {};
  Home: {};
  Search: {};
  OrganizerProfile: { organizerID: string };
  Profile: {};
  HeaderLeft: {};
  EventOrganizerView: { organizerID: string; imageID: string };
  HiddenEventsView: {};
  BlockedOrganizersView: {};
};

type props = NativeStackScreenProps<RootStackParamList, "MainView">;

const MainView = ({ route, navigation }: props) => {
  useTheme().colors.secondaryContainer = "transparent"; // This removes the background color of the bottom bar

  return (
    <Tab.Navigator barStyle={{ backgroundColor: "#f7f7f7" }} activeColor={colours.purple} inactiveColor={colours.grey} initialRouteName="Home">
      <Tab.Screen
        name="Home"
        component={Home as any} // TODO fix error
        initialParams={{}}
        options={{
          tabBarLabel: "Events",
          tabBarIcon: ({ focused }) => (
            <MaterialCommunityIcons name={focused ? "jellyfish" : "jellyfish-outline"} color={focused ? colours.purple : colours.grey} size={30} />
          ),
        }}
      />
      <Tab.Screen
        name="BrowseOrganizers"
        component={BrowseOrganizers as any} // TODO fix error
        initialParams={{}}
        options={{
          tabBarLabel: "Organizers",
          tabBarIcon: ({ focused }) => (
            <MaterialCommunityIcons name={focused ? "office-building" : "office-building-outline"} color={focused ? colours.purple : colours.grey} size={30} />
          ),
        }}
      />
      <Tab.Screen
        name="Saved"
        // listeners={{ tabPress: (e) => showHeader.saved }}
        component={SavedEvents as any} // TODO fix error
        initialParams={{}}
        options={{
          tabBarLabel: "Saved",
          title: "Saved",
          tabBarIcon: ({ focused }) => (
            <MaterialCommunityIcons name={focused ? "heart" : "heart-outline"} color={focused ? colours.purple : colours.grey} size={30} />
          ),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={Settings as any} // TODO fix error
        initialParams={{}}
        options={{
          tabBarLabel: "Settings",
          tabBarIcon: ({ focused }) => (
            <MaterialCommunityIcons name={focused ? "cog" : "cog-outline"} color={focused ? colours.purple : colours.grey} size={30} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const Main: FC<{ userType: string }> = (props) => {
  return (
    // <ThemeProvider theme={renTheme}>
    <NavigationContainer>
      <StatusBar backgroundColor="transparent" translucent={true} barStyle="dark-content" />
      <SafeAreaView style={styles.container}>
        <Stack.Navigator
          initialRouteName="MainView"
          screenOptions={{
            headerTitleAlign: "center",
            animation: "slide_from_right",
            //see this for more animation: https://stackoverflow.com/questions/69984434/not-work-transitionpresets-react-navigation-version-6
          }}
        >
          {/* Main View */}
          <Stack.Screen
            name="MainView"
            component={MainView as any} // TODO fix error
            initialParams={{}}
            options={{ headerShown: false }}
          />
          {/* Any other view that adds a stack to the main view */}
          <Stack.Screen
            name="EventDetailsView"
            component={EventDetails as any} // TODO fix error
            options={({ route, navigation }) => {
              return {
                title: "Event Details",
                headerStyle: { backgroundColor: colours.white },
                headerTintColor: colours.black,
                headerLeft: () => <HeaderLeft navigation={navigation} />,
                headerRight: () => <HeaderRight eventID={route.params.eventID} navigation={navigation} />,
              };
            }}
          />
          <Stack.Screen
            name="AccountSettingsView"
            component={AccountSettings as any}
            options={({ navigation }) => ({
              title: "Account Settings",
              headerStyle: { backgroundColor: colours.white },
              // headerTitleStyle: {fontWeight: fonts.regular}, This property breaks on Android
              headerTintColor: colours.black,
              headerLeft: () => <HeaderLeft navigation={navigation} />,
            })}
          />
          <Stack.Screen
            name="EventOrganizerView"
            component={OrganizerProfile as any}
            options={({ navigation, route }) => ({
              title: "Profile",
              headerStyle: { backgroundColor: colours.white },
              headerLeft: () => <HeaderLeft navigation={navigation} />,
              headerRight: () => <ProfileHeaderRight organizer={route.params.organizerID} navigation={navigation} />,
            })}
          />
          <Stack.Screen
            name="HiddenEventsView"
            component={HiddenEvents as any}
            options={({ navigation }) => ({
              title: "Hidden Events",
              headerStyle: { backgroundColor: colours.white },
              headerLeft: () => <HeaderLeft navigation={navigation} />,
            })}
          />
          <Stack.Screen
            name="BlockedOrganizersView"
            component={BlockedOrganizers as any}
            options={({ navigation }) => ({
              title: "Blocked Organizers",
              headerStyle: { backgroundColor: colours.white },
              headerLeft: () => <HeaderLeft navigation={navigation} />,
            })}
          />
        </Stack.Navigator>
      </SafeAreaView>
    </NavigationContainer>
  );
};

export default Main;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colours.white,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
});
