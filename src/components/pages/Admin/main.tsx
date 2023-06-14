import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { SafeAreaView, StyleSheet } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Platform } from "react-native";
import { colours } from "../../subatoms/colours/colours";
import { FC } from "react";
import Profile from "./Profile";
// import 'react-native-gesture-handler';

const Tab = createMaterialBottomTabNavigator();
const Stack = createNativeStackNavigator();

export type RootStackParamList = {
  MainView: { userType: string };
  Profile: { userType: string };
};

type props = NativeStackScreenProps<RootStackParamList, "MainView">;

const MainView = ({ route, navigation }: props) => {
  return (
    <Tab.Navigator barStyle={{ backgroundColor: colours.secondaryPurple }}>
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
      {/* // TODO Validation page */}
      {/* <Tab.Screen
        name="Validation"
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
      /> */}
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
