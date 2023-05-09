import React from "react";
import HomePage from "./src/components/pages/HomePage";
import ProfilePage from "./src/components/pages/ProfilePage";
import SavedEventsPage from "./src/components/pages/SavedEventsPage";
import SignedupEventsPage from "./src/components/pages/SignedupEventsPage";
import SearchPage from "./src/components/pages/SearchPage";
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';

const Tab = createMaterialBottomTabNavigator();

export default function App() {

  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Events" component={SignedupEventsPage} />
        <Tab.Screen name="Saved" component={SavedEventsPage} />
        <Tab.Screen name="Home" component={HomePage} />
        <Tab.Screen name="Search" component={SearchPage} />
        <Tab.Screen name="Profile" component={ProfilePage} />
      </Tab.Navigator>
    </NavigationContainer>
  );

}