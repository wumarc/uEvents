import Home from "./src/components/pages/Common/Home";
import Settings from "./src/components/pages/Common/Settings";
import { SavedEvents } from "./src/components/pages/Common/SavedEvents";
import { Tickets } from "./src/components/pages/Common/Tickets";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { NavigationContainer, Route } from "@react-navigation/native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { SafeAreaView, StatusBar, StyleSheet, Platform } from "react-native";
import { createNativeStackNavigator, NativeStackScreenProps } from "@react-navigation/native-stack";
import EventDetails from "./src/components/pages/Common/EventDetails";
import { FC } from "react";
import { useTheme } from "react-native-paper";
import OrganizerProfile from "./src/components/pages/Common/OrganizerProfile";
import BrowseOrganizers from "./src/components/pages/Common/BrowseOrganizers";
import HeaderLeft from "./src/components/molecules/HeaderLeft";
import { colours } from "./src/components/subatoms/Theme";
import HeaderRight from "./src/components/molecules/HeaderRight";
import ProfileHeaderRight from "./src/components/molecules/ProfileHeaderRight";
import { HiddenEvents } from "./src/components/pages/Common/HiddenEvents";
import BlockedOrganizers from "./src/components/pages/Common/BlockedOrganizers";
import { Login, Signup, WelcomePage } from "./src/components/pages/Common/SignIn";
import { Loading } from "./src/components/pages/Common/Loading";
import YourEvents from "./src/components/pages/EventOrganizer/YourEvents";
import { OrganizerSettings } from "./src/components/pages/EventOrganizer/OrganizerSettings";
import { StudentSettings } from "./src/components/pages/Student/StudentSettings";
import { AllEvents } from "./src/components/pages/Admin/AllEvents";
import Preview from "./src/components/pages/Admin/Preview";
import { CreateEventWeb } from "./src/components/pages/Admin/CreateEventWeb";
import { NewVersion } from "./src/components/pages/Admin/NewVersion";
import { AllOrganizers } from "./src/components/pages/Admin/AllOrganizers";
import { en, registerTranslation } from "react-native-paper-dates";
import { useUser } from "./src/utils/model/User";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { color } from "@rneui/base";

const Tab = createMaterialTopTabNavigator();
const Stack = createNativeStackNavigator();

registerTranslation("en", en);

// Navigator parameters
export type RootStackParamList = {
  MainView: {};
  AccountSettingsView: {};
  // CreateEventView: {};
  OrganizerSettings: { id?: string; new?: boolean };
  // OrganizerEventDetails: { eventID: string };
  // Step0: { eventID: string | undefined; useDefault: boolean; organizerName: string | undefined; isAdmin?: boolean };
  EventDetailsView: { eventID: string; organizerID: string; fake?: boolean; today?: Date };
  // EventSignUpView: {};
  Events: {};
  Saved: {};
  Home: {};
  Search: {};
  HeaderLeft: {};
  EventOrganizerView: { organizerID: string };
  HiddenEventsView: {};
  BlockedOrganizersView: {};
  AllEvents: {};
  CreateEvent: {};
  // EditEvent: { eventId: string };
  // UploadFile: { eventId: string };
  Preview: { eventId: string; organizerId: string; fake?: boolean };
  AllOrganizers: {};
  // OnePageCreateEvent: {};
  CreateEventWeb: { id?: string; fake?: boolean };
  Settings: {};
  NewVersion: {};
  YourEvents: {};
  Tickets: {};
  Welcome: {};
};

type props = NativeStackScreenProps<RootStackParamList, "MainView">;

// Tabs
const MainView = ({ route, navigation }: props) => {
  useTheme().colors.secondaryContainer = "transparent"; // This removes the background color of the bottom bar

  // States
  const [loading, userData, setUserData, isLogged, isStudent, isOrganizer, isAdmin, isBeta] = useUser();

  // Loading
  if (loading) {
    return <Loading />;
  }

  return (
    <Tab.Navigator
      initialRouteName="Home"
      tabBarPosition="bottom"
      screenOptions={{
        tabBarActiveTintColor: colours.purple,
        tabBarLabelStyle: { fontSize: 9, textTransform: "none" },
        tabBarStyle: { backgroundColor: "#f7f7f7" },
        swipeEnabled: true,
        tabBarIndicatorStyle: { backgroundColor: colours.purple },
      }}
      // barStyle={{ backgroundColor: "#f7f7f7" }}
      // activeColor={colours.purple}
      // inactiveColor={colours.grey}
    >
      {/* Create event form. Admin */}
      {isAdmin && (
        <Tab.Screen
          name="CreateEvent"
          component={CreateEventWeb as any}
          options={{
            tabBarLabel: "Create",
            tabBarIcon: ({ focused }) => <MaterialCommunityIcons name="plus-circle" color={focused ? colours.purple : colours.grey} size={30} />,
          }}
        />
      )}
      {isAdmin && (
        <Tab.Screen
          name="CreateEventFake"
          component={CreateEventWeb as any}
          initialParams={{
            fake: true,
          }}
          options={{
            tabBarLabel: "Create Fake",
            tabBarIcon: ({ focused }) => <MaterialCommunityIcons name="plus" color={focused ? colours.purple : colours.grey} size={30} />,
          }}
        />
      )}
      {/* All events. Admin */}
      {isAdmin && (
        <Tab.Screen
          name="AllEvents"
          component={AllEvents as any}
          options={{
            tabBarLabel: "Events (Admin)",
            tabBarIcon: ({ focused }) => <MaterialCommunityIcons name="ticket" color={focused ? colours.purple : colours.grey} size={30} />,
          }}
        />
      )}
      {/* All organizers. Admin */}
      {isAdmin && (
        <Tab.Screen
          name="AllOrganizers"
          component={AllOrganizers as any}
          options={{
            tabBarLabel: "Organizers (Admin)",
            tabBarIcon: ({ focused }) => (
              <MaterialCommunityIcons
                name={focused ? "office-building" : "office-building-outline"}
                color={focused ? colours.purple : colours.grey}
                size={30}
              />
            ),
          }}
        />
      )}
      {/* Your events. Organizer */}
      {isOrganizer && (
        <Tab.Screen
          name="YourEvents"
          component={YourEvents as any}
          options={{
            tabBarLabel: "Your Events",
            tabBarIcon: ({ color, focused }) => (
              <MaterialCommunityIcons name={focused ? "calendar" : "calendar-outline"} color={focused ? colours.purple : colours.grey} size={30} />
            ),
          }}
        />
      )}

      {/* Home page to browse events. Student, Organizer, Admin */}
      <Tab.Screen
        name="Home"
        component={Home as any}
        options={{
          tabBarLabel: "Events",
          tabBarLabelStyle: { fontSize: 12, textTransform: "none" },
          tabBarIcon: ({ focused }) => (
            <MaterialCommunityIcons name={focused ? "jellyfish" : "jellyfish-outline"} color={focused ? colours.purple : colours.grey} size={26} />
          ),
        }}
      />
      {/* Browse Organizers. Student, Organizer, Admin */}
      <Tab.Screen
        name="BrowseOrganizers"
        component={BrowseOrganizers as any}
        options={{
          tabBarLabel: "Clubs",
          tabBarLabelStyle: { fontSize: 12, textTransform: "none" },
          tabBarIcon: ({ focused }) => (
            <MaterialCommunityIcons name={focused ? "office-building" : "office-building"} color={focused ? colours.purple : colours.grey} size={26} />
          ),
        }}
      />
      {/* Saved events. Student, Organizer, Admin */}
      <Tab.Screen
        name="Saved"
        component={SavedEvents as any}
        options={{
          tabBarLabel: "Saved",
          tabBarLabelStyle: { fontSize: 12, textTransform: "none" },
          title: "Saved",
          tabBarIcon: ({ focused }) => (
            <MaterialCommunityIcons name={focused ? "heart" : "heart-outline"} color={focused ? colours.purple : colours.grey} size={26} />
          ),
        }}
      />
      {/* Tickets. Student */}
      {isBeta && (
        <Tab.Screen
          name="Tickets"
          component={Tickets as any}
          options={{
            tabBarLabel: "Tickets",
            tabBarLabelStyle: { fontSize: 12, textTransform: "none" },
            title: "Tickets",
            tabBarIcon: ({ focused }) => (
              <MaterialCommunityIcons name={focused ? "ticket" : "ticket-outline"} color={focused ? colours.purple : colours.grey} size={26} />
            ),
          }}
        />
      )}
      {/* Settings. Student, Organizer, Admin */}
      <Tab.Screen
        name="Settings"
        component={Settings as any}
        options={{
          tabBarLabel: "Settings",
          tabBarLabelStyle: { fontSize: 12, textTransform: "none" },
          tabBarIcon: ({ focused }) => (
            <MaterialCommunityIcons name={focused ? "cog" : "cog-outline"} color={focused ? colours.purple : colours.grey} size={28} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

// Other screens
const Main: FC = (props) => {
  // States
  const [loading, userData, setUserData, isLogged, isStudent, isOrganizer, isAdmin, isBeta] = useUser();

  // Loading
  if (loading) {
    return <Loading />;
  }

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
          <Stack.Screen name="MainView" component={MainView as any} initialParams={{}} options={{ headerShown: false }} />
          {/* Any other view that adds a stack to the main view */}
          {/* Event Details. Student, Organizer, Admin */}
          <Stack.Screen
            name="EventDetailsView"
            component={EventDetails as any}
            options={({ route, navigation }: any) => {
              return {
                title: "Event Details",
                headerStyle: { backgroundColor: colours.white },
                headerTintColor: colours.black,
                headerLeft: () => <HeaderLeft navigation={navigation} />,
                headerRight: () => <HeaderRight eventID={route.params.eventID} navigation={navigation} />,
              };
            }}
          />
          {/* Organizer */}
          {/* Account Settings. Student */}
          <Stack.Screen
            name="AccountSettingsView"
            component={StudentSettings as any}
            options={({ navigation }) => ({
              title: "Account Settings",
              headerStyle: { backgroundColor: colours.white },
              // headerTitleStyle: {fontWeight: fonts.regular}, This property breaks on Android
              headerTintColor: colours.black,
              headerLeft: () => <HeaderLeft navigation={navigation} />,
            })}
          />
          {/* Account Settings. Organizer */}
          <Stack.Screen
            name="OrganizerSettings"
            component={OrganizerSettings as any}
            options={({ navigation }) => ({
              headerLeft: () => <HeaderLeft navigation={navigation} />,
              title: "Settings",
            })}
          />
          {/* Organizer Profile. Student, Organizer, Admin */}
          <Stack.Screen
            name="EventOrganizerView"
            component={OrganizerProfile as any}
            options={({ navigation, route }: any) => ({
              title: "Profile",
              headerStyle: { backgroundColor: colours.white },
              headerLeft: () => <HeaderLeft navigation={navigation} />,
              headerRight: () => <ProfileHeaderRight organizer={route.params.organizerID} navigation={navigation} />,
            })}
          />
          {/* Profile. Student, Organizer, Admin */}
          <Stack.Screen
            name="HiddenEventsView"
            component={HiddenEvents as any}
            options={({ navigation }) => ({
              title: "Hidden Events",
              headerStyle: { backgroundColor: colours.white },
              headerLeft: () => <HeaderLeft navigation={navigation} />,
            })}
          />
          {/* Blocked Organizers. Student, Organizer, Admin */}
          <Stack.Screen
            name="BlockedOrganizersView"
            component={BlockedOrganizers as any}
            options={({ navigation }) => ({
              title: "Blocked Organizers",
              headerStyle: { backgroundColor: colours.white },
              headerLeft: () => <HeaderLeft navigation={navigation} />,
            })}
          />
          {/* Login welcome page. Student, Organizer, Admin */}
          <Stack.Screen
            name="Welcome"
            component={WelcomePage}
            options={({ navigation }) => ({
              headerTitle: "Sign In",
              headerStyle: { backgroundColor: colours.white },
              headerLeft: () => <HeaderLeft navigation={navigation} />,
            })}
          />
          {/* Login. Student, Organizer, Admin */}
          <Stack.Screen
            name="Login"
            component={Login}
            initialParams={{ signInHandler: {} }}
            options={{
              headerTintColor: colours.black,
              headerBackTitleVisible: false,
            }}
          />
          {/* Sign Up. Student, Organizer, Admin */}
          <Stack.Screen
            name="Signup"
            component={Signup}
            initialParams={{ signInHandler: {} }}
            options={{
              headerTintColor: colours.black,
              headerBackTitleVisible: false,
              headerTitle: "Register",
            }}
          />
          {/* Event Preview. Admin */}
          {isAdmin && (
            <Stack.Screen
              name="Preview"
              component={Preview as any} // TODO fix error
            />
          )}
          {/* Create event form (web). Admin */}
          {(isAdmin || isOrganizer) && (
            <Stack.Screen
              name="CreateEventWeb"
              component={CreateEventWeb as any}
              options={({ navigation }) => ({
                headerLeft: () => <HeaderLeft navigation={navigation} />,
              })}
            />
          )}
          {/* New version page */}
          {isAdmin && (
            <Stack.Screen
              name="NewVersion"
              component={NewVersion as any}
              options={({ navigation }) => ({
                headerLeft: () => <HeaderLeft navigation={navigation} />,
              })}
            />
          )}
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
