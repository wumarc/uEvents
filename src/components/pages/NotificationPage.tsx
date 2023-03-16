import { BottomNavigation, Text } from "react-native-paper";
import { useState } from "react";
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { View } from "react-native";


const NotificationPage = () => {

  return (
    <View style={{
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#00BFA5'
    }}>
 
      <Text> This is the notification page! </Text>
 
    </View>
  );
  
};

export default NotificationPage;