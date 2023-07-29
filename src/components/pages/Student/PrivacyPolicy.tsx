import { View, Text, ScrollView } from "react-native";
import { StyleSheet } from "react-native";
import { colours } from "../../subatoms/colours";

const PrivacyPolicy = () => {

    return (
        <View style={styles.container}>
            
            <ScrollView>

            </ScrollView>

        </View>
    );

};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colours.secondaryPurple,
        paddingHorizontal: '4%'
    },
    
})

export default PrivacyPolicy;