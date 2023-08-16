import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { SafeAreaView, StyleSheet } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Platform } from "react-native";
import { FC, useState } from "react";
import { useTheme } from "react-native-paper";
import { StatusBar } from "react-native";
import { Step0 } from "./CreateEvent";
import { colours } from "../../subatoms/Theme";
import Home from "./Home";
import Settings from "./Settings";
import Profile from "./Profile";
import HeaderLeft from "../../molecules/HeaderLeft";
import EventDetails from "../Student/EventDetails";

const Tab = createMaterialBottomTabNavigator();
const Stack = createNativeStackNavigator();

export type RootStackParamList = {
  MainView: { userType: string };
  CreateEventView: { userType: string };
  Profile: { userType: string };
};

type props = NativeStackScreenProps<RootStackParamList, "MainView">;

const MainView = ({ route, navigation }: props) => {
  useTheme().colors.secondaryContainer = "transparent"; // This removes the background color of the bottom bar

  return (
    <Tab.Navigator
      barStyle={{ backgroundColor: "#f7f7f7" }}
      activeColor={colours.purple}
      inactiveColor={colours.grey}
      initialRouteName="Home"
    >
      <Tab.Screen
        name="Home"
        component={Home as any} // TODO fix error
        initialParams={{ userType: route.params.userType }}
        options={{
          tabBarLabel: "Events",
          tabBarIcon: ({ color, focused }) => (
            <MaterialCommunityIcons
              name={focused ? "calendar" : "calendar-outline"}
              color={focused ? colours.purple : colours.grey}
              size={30}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={Settings as any} // TODO fix error
        initialParams={{ userType: route.params.userType }}
        options={{
          tabBarLabel: "Settings",
          tabBarIcon: ({ color, focused }) => (
            <MaterialCommunityIcons
              name={focused ? "cog" : "cog-outline"}
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
  const [form, setForm] = useState({});

  return (
    <NavigationContainer>
      <StatusBar
        backgroundColor="transparent"
        translucent={true}
        barStyle="dark-content"
      />
      <SafeAreaView style={styles.container}>
        <Stack.Navigator initialRouteName="MainView">
          {/* Main View */}
          <Stack.Screen
            name="MainView"
            component={MainView as any} // TODO fix error
            initialParams={{ userType: props.userType }}
            options={{ headerShown: false }}
          />
          {/* Create Event View */}
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
          <Stack.Screen
            name="Profile"
            component={Profile as any}
            initialParams={{ userType: props.userType }}
            options={({ navigation }) => ({
              headerLeft: () => <HeaderLeft navigation={navigation} />,
            })}
          />
          <Stack.Screen
            name="EventDetailsView"
            component={EventDetails as any} // TODO fix error
            options={({ route, navigation }) => {
              return {
                title: "Event Details",
                headerStyle: { backgroundColor: colours.white },
                headerTintColor: colours.black,
                headerLeft: () => <HeaderLeft navigation={navigation} />,
              };
            }}
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
