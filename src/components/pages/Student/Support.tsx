import { View, Text, StyleSheet, ScrollView } from "react-native";
import { colours } from "../../subatoms/colours";
import { Input } from "react-native-elements/dist/input/Input";

const Support = () => {

    return (
        <View style={styles.container}>
            
            <ScrollView>
            
                <View style={{marginVertical: '15%'}}>
                    <Text style={{fontSize: 18}}>
                        Have a questions or a complaint about uEvents? Fill out the form below and an uEvents member will be touch with you shortly.
                    </Text>
                </View>

                {/* Form */}
                <View>
                    {/* Name */}
                    <Input />
                    {/* Email */}
                    {/* Message */}
                    
                </View>


                <View>
                    {/* <Button
                    /> */}
                </View>

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

export default Support;