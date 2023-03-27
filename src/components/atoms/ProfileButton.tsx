import { StyleSheet, Text, View } from "react-native";
import { Button } from "react-native-paper";

const ProfileButton = ({navigation}: any) => {
    
    return (
        <View>
            <Button 
                icon="account-circle"
                labelStyle={{fontSize: 30}}
                onPress= {() => navigation.navigate("Profile")}
            >
            </Button>
        </View>
    );

};

export default ProfileButton;