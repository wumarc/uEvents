import { View, Text, StyleSheet } from "react-native";
import { colours } from "../../subatoms/colours";
import CustomInput from "../../atoms/CustomInput";

const Support = () => {

    return (
        <View style={styles.container}>
            
            <View>
                <Text>Have a questions or a complaint about uEvents? Fill out the form below and an uEvents member will be touch with you shortly.</Text>
            </View>

            {/* Form */}
            <View>
                {/* Name */}
                {/* Email */}
                {/* Message */}
                
            </View>


            <View>
                {/* <Button
                /> */}
            </View>


        </View>
    );

};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colours.secondaryPurple,
        paddingHorizontal: '2.3%'
    }
})

export default Support;