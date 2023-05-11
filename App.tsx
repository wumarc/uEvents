import React from "react";
import HomePage from "./src/components/pages/HomePage";
import ProfilePage from "./src/components/pages/ProfilePage";
import SavedEventsPage from "./src/components/pages/SavedEventsPage";
import SignedupEventsPage from "./src/components/pages/SignedupEventsPage";
import SearchPage from "./src/components/pages/SearchPage";
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';


const Tab = createMaterialBottomTabNavigator();

export default function App() {

  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen 
          name="Events" 
          component={SignedupEventsPage}
          options={{
            tabBarLabel: 'Events',
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="calendar" color={color} size={26} />
            ),
          }}
        />
        <Tab.Screen 
          name="Saved" 
          component={SavedEventsPage}
          options={{
            tabBarLabel: 'Saved',
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="calendar-heart" color={color} size={26} />
            ),
          }}
        />
        <Tab.Screen 
          name="Home" 
          component={HomePage} 
          options={{
            tabBarLabel: 'Home',
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="home" color={color} size={26} />
            ),
          }}
        />
        <Tab.Screen 
          name="Search" 
          component={SearchPage}
          options={{
            tabBarLabel: 'Search',
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="magnify" color={color} size={26} />
            ),
          }}
        />
        <Tab.Screen 
          name="Profile" 
          component={ProfilePage}
          options={{
            tabBarLabel: 'Profile',
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="account-circle" color={color} size={26} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );

}