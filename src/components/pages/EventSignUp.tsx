import { View, Text, StyleSheet } from "react-native"
import { Input } from '@rneui/themed';
import { Button } from "react-native-elements";
import { colours } from "../subatoms/colours/colours";

const EventSignUp = () => {

    return (
        <View>
            <Text>Going?</Text>
            
            <Input/>
            <Input />

            <Button
                buttonStyle={styles.button}
                title="Confirm"
            />
        </View>
    )
    
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: colours.primary,
    }
})


export default EventSignUp;