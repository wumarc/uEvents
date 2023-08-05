import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { SafeAreaView, StyleSheet } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Platform } from "react-native";
import { colours } from "../../subatoms/colours";
import CreateEvent from "../EventOrganizer/CreateEvent";
import { FC, useState } from "react";
import Home from "./Home";
import Profile from "./Profile";
import { useTheme } from "react-native-paper";
import { StatusBar } from "react-native";
import { Step1, Step2, Step3, Step4, Step5, Step6, Step7, Step8, Step9 } from "./EventCreationSteps";

const Tab = createMaterialBottomTabNavigator();
const Stack = createNativeStackNavigator();

export type RootStackParamList = {
  MainView: { userType: string };
  CreateEventView: { userType: string };
  Profile: { userType: string };
};

type props = NativeStackScreenProps<RootStackParamList, "MainView">;

const MainView = ({ route, navigation }: props) => {

  const theme = useTheme();
  theme.colors.secondaryContainer = "transparent";

  return (
    <Tab.Navigator 
      barStyle={{backgroundColor: '#f7f7f7'}}
      activeColor={colours.secondaryPurple}
      inactiveColor={'#979797'}
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
              color={focused? colours.secondaryPurple : '#979797'}
              size={30}
            />
          ),
        }}
      />
      <Tab.Screen
        name="CreateEvent"
        component={CreateEvent as any} // TODO fix error
        initialParams={{ userType: route.params.userType }}
        options={{
          tabBarLabel: "Create",
          tabBarIcon: ({ color, focused }) => (
            <MaterialCommunityIcons
              name={focused ? "plus-circle" : "plus-circle-outline"}
              color={focused? colours.secondaryPurple : '#979797'}
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
              name={focused ? "account-circle" : "account-circle-outline"}
              color={focused? colours.secondaryPurple : '#979797'}
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
      <SafeAreaView style={styles.container}>
        <Stack.Navigator initialRouteName="MainView">
          {/* Main View */}
          <Stack.Screen
            name="MainView"
            component={MainView as any} // TODO fix error
            initialParams={{ userType: props.userType }}
            options={{ headerShown: false}}
          />
          {/* Create Event View */}
          <Stack.Screen
            name="CreateEventView"
            component={CreateEvent as any} // TODO fix error
            initialParams={{ userType: props.userType }}
            // options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Step1"
            component={Step1 as any}
            options={{ headerShown: true }}
          />
          <Stack.Screen
            name="Step2"
            component={Step2 as any}
            options={{ headerShown: true }}
          />
          <Stack.Screen
            name="Step3"
            component={Step3 as any}
            options={{ headerShown: true }}
          />
          <Stack.Screen
            name="Step4"
            component={Step4 as any}
            options={{ headerShown: true }}
          />
          <Stack.Screen
            name="Step5"
            component={Step5 as any}
            options={{ headerShown: true }}
          />
          <Stack.Screen
            name="Step6"
            component={Step6 as any}
            options={{ headerShown: true }}
          />
          <Stack.Screen
            name="Step7"
            component={Step7 as any}
            options={{ headerShown: true }}
          />
          <Stack.Screen
            name="Step8"
            component={Step8 as any}
            options={{ headerShown: true }}
          />
          <Stack.Screen
            name="Step9"
            component={Step9 as any}
            options={{ headerShown: true }}
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
    backgroundColor: '#ededed',
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
});
