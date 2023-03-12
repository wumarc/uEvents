import { BottomNavigation, Text } from "react-native-paper";
import { useState } from "react";
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { View } from "react-native";

const Profile = () => {

  return (
    <View style={{
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#00BFA5'
    }}>
 
      <Text>  This is the profile page! </Text>
 
    </View>
  );
  
};

export default Profile;