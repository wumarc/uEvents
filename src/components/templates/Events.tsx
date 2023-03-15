import { BottomNavigation, Text } from "react-native-paper";
import { View } from "react-native";
import { useState } from "react";
import { SafeAreaProvider } from 'react-native-safe-area-context';

const Events = () => {

  return (
    <View style={{
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#00BFA5'
    }}>
 
      <Text> This is the events page! </Text>
 
    </View>
  );
  
};

export default Events;