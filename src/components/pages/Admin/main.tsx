import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { SafeAreaView, StyleSheet } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Platform } from "react-native";
import { colours } from "../../subatoms/Theme";
import { FC } from "react";
import Profile from "./Profile";
import allEvents from "./allEvents";
import CreateEvent from "./CreateEvent";
import EditEvent from "./EditEvent";
import UploadFile from "../../organisms/UploadFile";
import Preview from "./Preview";
import EventDetails from "../Student/EventDetails";
// import 'react-native-gesture-handler';

const Tab = createMaterialBottomTabNavigator();
const Stack = createNativeStackNavigator();

export type RootStackParamList = {
  MainView: { userType: string };
  Profile: { userType: string };
  allEvents: {};
  createEvent: { userType: string };
  EditEvent: { eventId: string };
  UploadFile: { eventId: string };
  Preview: { eventId: string };
};

type props = NativeStackScreenProps<RootStackParamList, "MainView">;

const MainView = ({ route, navigation }: props) => {
  return (
    <Tab.Navigator
      barStyle={{ backgroundColor: colours.purple }}
      initialRouteName="allEvents"
    >
      <Tab.Screen
        name="createEvent"
        component={CreateEvent as any} // TODO fix error
        initialParams={{ userType: route.params.userType }}
        options={{
          tabBarLabel: "Create",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="plus-circle"
              color={colours.primaryPurple}
              size={30}
            />
          ),
        }}
      />
      <Tab.Screen
        name="allEvents"
        component={allEvents as any} // TODO fix error
        options={{
          tabBarLabel: "All Events",
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
    backgroundColor: colours.purple,
    paddingTop: Platform.OS === "android" ? 25 : 0,
  },
});
