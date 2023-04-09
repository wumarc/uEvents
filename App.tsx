import React from "react";
import MainScreen from "./src/screens/MainScreen";
import { Provider as PaperProvider } from "react-native-paper";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from '@react-navigation/native';
import ProfileScreen from "./src/screens/ProfileScreen";
import EventDetails from "./src/components/organisms/EventDetails";
import ProfileButton from "./src/components/atoms/ProfileButton";


export default function App() {

  const Stack = createStackNavigator();

  const config = {
    animation: 'spring',
    config: {
      stiffness: 1000,
      damping: 500,
      mass: 3,
      overshootClamping: true,
      restDisplacementThreshold: 0.01,
      restSpeedThreshold: 0.01,
    },
  };

  return (
      <PaperProvider>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Main">
            <Stack.Screen
              name="Main"
              component={MainScreen}
              options={({navigation}) => ({
                title: 'uEvents',
                headerTintColor: '#ff99ff',
                headerTitleAlign: 'center',
                headerTitleStyle: {
                  fontWeight: 'bold',
                  fontFamily: 'sans-serif',
                  fontSize: 30
                },
                headerRight: () => <ProfileButton navigation={navigation}/>
              })}
            />
            <Stack.Screen
              name="Profile"
              component={ProfileScreen}
              // options={{
              //   gestureDirection: 'vertical',
              //   transitionSpec: {
              //     open: config,
              //     close: config
              //   }
              // }}
            />
            <Stack.Screen
              name="EventDetails"
              component={EventDetails}
              options={{
                title: 'Event'
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
  );
}