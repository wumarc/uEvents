import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { SafeAreaView, StatusBar, StyleSheet } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Platform } from "react-native";
import { colours } from "../../subatoms/Theme";
import { FC } from "react";
import Profile from "./Profile";
import CreateEvent from "./CreateEvent";
import EditEvent from "./EditEvent";
import UploadFile from "../../organisms/UploadFile";
import Preview from "./Preview";
import EventDetails from "../Student/EventDetails";
import { Step0 } from "../EventOrganizer/CreateEvent";
import HeaderLeft from "../../molecules/HeaderLeft";
import { AllEvents } from "./AllEvents";
import { AllOrganizers } from "./AllOrganizers";
import { useTheme } from "react-native-paper";
import Home from "../Student/Home";
import OrganizerProfile from "../Student/OrganizerProfile";
import ProfileHeaderRight from "../../molecules/ProfileHeaderRight";

const Tab = createMaterialBottomTabNavigator();
const Stack = createNativeStackNavigator();

export type RootStackParamList = {
  MainView: { userType: string };
  Profile: { userType: string };
  AllEvents: {};
  createEvent: { userType: string };
  EditEvent: { eventId: string };
  UploadFile: { eventId: string };
  Preview: { eventId: string, organizerId: string };
  EventDetailsView: {
    userType: string;
    eventID: string;
    organizerID: string;
    imageID: string;
  };
  Step0: { eventID: string | undefined; useDefault: boolean; organizerName: string | undefined, isAdmin?: boolean };
  AllOrganizers: {};  
  EventOrganizerView: { organizerID: string, imageID: string };
};

type props = NativeStackScreenProps<RootStackParamList, "MainView">;

const MainView = ({ route, navigation }: props) => {
  useTheme().colors.secondaryContainer = "transparent"; // This removes the background color of the bottom bar
  
  return (
    <Tab.Navigator
      barStyle={{ backgroundColor: "#f7f7f7" }}
      activeColor={colours.purple}
      inactiveColor={colours.grey}
      initialRouteName="allEvents"
    >
      <Tab.Screen
        name="createEvent"
        component={CreateEvent as any} // TODO fix error
        initialParams={{ userType: route.params.userType }}
        options={{
          tabBarLabel: "Create",
          tabBarIcon: ({ focused }) => (
            <MaterialCommunityIcons
              name="plus-circle"
              color={focused ? colours.purple : colours.grey}
              size={30}
            />
          ),
        }}
      />
      <Tab.Screen
        name="AllEvents"
        component={AllEvents as any} // TODO fix error
        options={{
          tabBarLabel: "All Events",
          tabBarIcon: ({ focused }) => (
            <MaterialCommunityIcons
              name="ticket"
              color={focused ? colours.purple : colours.grey}
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
          tabBarIcon: ({ focused }) => (
            <MaterialCommunityIcons
              name={focused ? "jellyfish" : "jellyfish-outline"}
              color={focused ? colours.purple : colours.grey}
              size={30}
            />
          ),
        }}
      />
      <Tab.Screen
        name="AllOrganizers"
        component={AllOrganizers as any} // TODO fix error
        options={{
          tabBarLabel: "Organizers",
          tabBarIcon: ({ focused }) => (
            <MaterialCommunityIcons
              name="ticket"
              color={focused ? colours.purple : colours.grey}
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
          tabBarIcon: ({ focused }) => (
            <MaterialCommunityIcons
              name="account-circle"
              color={focused ? colours.purple : colours.grey}
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
    <>
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
            <Stack.Screen
              name="EditEvent"
              component={EditEvent as any} // TODO fix error
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="UploadFile"
              component={UploadFile as any} // TODO fix error
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="Preview"
              component={Preview as any} // TODO fix error
            />
            <Stack.Screen
              name="EventDetailsView"
              component={EventDetails as any} // TODO fix error
            />
            <Stack.Screen
              name="EventOrganizerView"
              component={OrganizerProfile as any}
              options={({ navigation }) => ({
                title: "Profile",
                headerStyle: { backgroundColor: colours.white },
                headerLeft: () => <HeaderLeft navigation={navigation} />,
                headerRight: () => <ProfileHeaderRight eventID={""} />,
              })}
            />
            <Stack.Screen
            name="Step0"
            component={Step0 as any}
            options={({ navigation }) => ({
              headerShown: true,
              headerTitle: "",
              headerLeft: () => (
                <HeaderLeft navigation={navigation} type={"cross"} />
              ),
              animation: "slide_from_bottom",
            })}
          />
          </Stack.Navigator>
        </SafeAreaView>
      </NavigationContainer>
    </>
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
