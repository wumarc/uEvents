import { StyleSheet, Text, View } from "react-native";
import { Button } from "react-native-paper";

const ProfileButton = () => {
    
    return (
        <View>
            <Button 
                icon="account-circle"
                labelStyle={{fontSize: 30}}
            >
            </Button>
        </View>
    );

};

export default ProfileButton;