import { FlatList, SafeAreaView, StatusBar, StyleSheet, Text, View } from "react-native";
import { useEffect, useState } from "react";
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../firebaseConfig";
import { EventObject } from "../../model/EventObject";
import Event from "../organisms/Event";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProfileButton from "./ProfileButton";
import HomePageEventsList from "./HomePageEventsList";
import EventDetails from "../organisms/EventDetails";

const HomePage = () => {

  const Stack = createNativeStackNavigator();

  return (
      <SafeAreaView style={styles.container}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Home">
            <Stack.Screen 
              name="Home" 
              options={{
                headerTitle: () => <Text style={styles.title}> uEvents </Text>,
                headerRight: () => <ProfileButton />
              }}
              component={HomePageEventsList} 
            />
            <Stack.Screen
              name="Event"
              component={EventDetails}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaView>     
  );

};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // marginTop: StatusBar.currentHeight,
    marginTop: 30
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#ff99ff'
  }
})

export default HomePage;