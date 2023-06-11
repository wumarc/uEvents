import { View, Text, StyleSheet, TextInput, SafeAreaView } from "react-native"
// import { Input } from '@rneui/themed';
import { Button } from "react-native-elements";
import { colours } from "../subatoms/colours/colours";
import React from 'react';
import { Input } from "@rneui/base";

const EventSignUp = ({navigation}: any) => {
    const [number, onChangeNumber] = React.useState('');

    return (
        <View>
            
            <View style={styles.margin}>
                <Text style={styles.rsvp}>Complete your RSVP! {`\n`}</Text>

                <Text style={styles.backgroundText}>This information will shared with "" administrators and the leaders of your group. {`\n`}</Text>

                {/* first name input*/}
                <Text>First Name: </Text>
                <TextInput
                    style={styles.input}
                    onChangeText={onChangeNumber}
                    value={number}
                    placeholder="First Name"
                    keyboardType="numeric"
                    maxLength = {15}
                    numberOfLines = {6}
                />    
                
                {/* last name input*/}
                <Text>Last Name: </Text>
                <TextInput
                    style={styles.input}
                    // onChangeText={onChangeNumber}
                    // value={number}
                    placeholder="Last Name"
                    keyboardType="numeric"
                    maxLength = {15}
                />  
            </View>

        {/* confirm button */}
            <View style={styles.buttonContainer}>
                <Button
                        // paddingRight: 20,
                        buttonStyle={styles.buttonText}
                        // shape="rounded-pill"
                        title="Confirm"
                        onPress={() => {navigation.navigate('ConfirmedEventView')}}
                />
            </View>


        </View>


    )
    
}

const styles = StyleSheet.create({
    margin: {
        paddingTop: 20,
        paddingLeft: 20,
    },
    rsvp: {
        fontSize: 18,
    },
    buttonText: {
        backgroundColor: colours.primaryPurple,
    },
    buttonContainer: {
 
        alignSelf: "center",
        width: '90%',
        flexDirection: "column",
        marginVertical: 10,

    },
    input: {
        height: 40,
        margin: 12,
        // borderWidth: 1,
        padding: 10,
        borderBottomWidth: 0.4,
    },
    backgroundText: {
        color: colours.darkGreyText,
    }
})


export default EventSignUp;