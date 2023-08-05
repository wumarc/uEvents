import { View, Text, ScrollView, StyleSheet } from "react-native"
import { Input } from "react-native-elements"
import { useState } from "react";
import { Button } from "@rneui/base";
import { colours } from "../../subatoms/colours";

export const Step1 = ({route, navigation}: any) => {
    
    const [charactersAvailable, setCharactersAvailable] = useState<number>(35);
    
    return (
        <View style={{paddingHorizontal: '5%', flex: 1}}>
            
            <ScrollView>

                <Text style={styles.formTitle}>How should we call your event?</Text>
                
                <Text style={styles.formDescription}>Short names work best. Have fun with it!</Text>

                <View style={{marginVertical: '5%'}}>
                    <Text>{charactersAvailable} <Text style={{color: colours.textGrey}}>characters available</Text></Text>
                    <Input
                        onChange={(e) => {setCharactersAvailable(35 - e.nativeEvent.text.length)}}
                        maxLength={35}
                    />
                </View>

            </ScrollView>

            <View style={styles.footer}>
                <Text style={{color: colours.textGrey, fontWeight: "600", fontSize: 15}}>Back</Text>
                <Button
                    buttonStyle={{backgroundColor: colours.secondaryPurple, padding: 10, borderRadius: 10}}
                    title={"Next"}
                    onPress={() => {navigation.navigate('Step2')}}
                    titleStyle={{ fontSize: 15, fontWeight: "600" }}
                />
            </View>

        </View>
    )
}

export const Step2 = ({route, navigation}: any) => {
    return (
        <View style={{paddingHorizontal: '5%', flex: 1}}>
            
            <ScrollView>
                <Text>Provide a description of your event</Text>
            </ScrollView>
            
            <View style={styles.footer}>
                <Text style={{color: colours.textGrey, fontWeight: "600", fontSize: 15}}>Back</Text>
                <Button
                    buttonStyle={{backgroundColor: colours.secondaryPurple, padding: 10, borderRadius: 10}}
                    title={"Next"}
                    onPress={() => {navigation.navigate('Step3')}}
                    titleStyle={{ fontSize: 15, fontWeight: "600" }}
                />
            </View>

        </View>
    )
}

export const Step3 = ({route, navigation}: any) => {
    return (
        <View style={{paddingHorizontal: '5%', flex: 1}}>

            <ScrollView>
                <Text>Are you hosting event on campus?</Text>
            </ScrollView>

            <View style={styles.footer}>
                <Text style={{color: colours.textGrey, fontWeight: "600", fontSize: 15}}>Back</Text>
                <Button
                    buttonStyle={{backgroundColor: colours.secondaryPurple, padding: 10, borderRadius: 10}}
                    title={"Next"}
                    onPress={() => {navigation.navigate('Step4')}}
                    titleStyle={{ fontSize: 15, fontWeight: "600" }}
                />
            </View>

        </View>
    )
}

export const Step4 = ({route, navigation}: any) => {
    return (
        <View style={{paddingHorizontal: '5%', flex: 1}}>

            <ScrollView>
                <Text>Where is your event located?</Text>
            </ScrollView>

            <View style={styles.footer}>
                <Text style={{color: colours.textGrey, fontWeight: "600", fontSize: 15}}>Back</Text>
                <Button
                    buttonStyle={{backgroundColor: colours.secondaryPurple, padding: 10, borderRadius: 10}}
                    title={"Next"}
                    onPress={() => {navigation.navigate('Step5')}}
                    titleStyle={{ fontSize: 15, fontWeight: "600" }}
                />
            </View>
        </View>
    )
}

export const Step5 = ({route, navigation}: any) => {
    return (
        <View style={{paddingHorizontal: '5%', flex: 1}}>
            
            <ScrollView>
                <Text>Step 5</Text>
            </ScrollView>

            <View style={styles.footer}>
                <Text style={{color: colours.textGrey, fontWeight: "600", fontSize: 15}}>Back</Text>
                <Button
                    buttonStyle={{backgroundColor: colours.secondaryPurple, padding: 10, borderRadius: 10}}
                    title={"Next"}
                    onPress={() => {navigation.navigate('Step6')}}
                    titleStyle={{ fontSize: 15, fontWeight: "600" }}
                />
            </View>

        </View>
    )
}

export const Step6 = ({route, navigation}: any) => {
    return (
        <View style={{paddingHorizontal: '5%', flex: 1}}>
            
            <ScrollView>
                <Text>Step 6</Text>
            </ScrollView>

            <View style={styles.footer}>
                <Text style={{color: colours.textGrey, fontWeight: "600", fontSize: 15}}>Back</Text>
                <Button
                    buttonStyle={{backgroundColor: colours.secondaryPurple, padding: 10, borderRadius: 10}}
                    title={"Next"}
                    onPress={() => {navigation.navigate('Step7')}}
                    titleStyle={{ fontSize: 15, fontWeight: "600" }}
                />
            </View>

        </View>
    )
}

export const Step7 = ({route, navigation}: any) => {
    return (
        <View style={{paddingHorizontal: '5%', flex: 1}}>

            <ScrollView>
                <Text>Step 7</Text>
            </ScrollView>

            <View style={styles.footer}>
                <Text style={{color: colours.textGrey, fontWeight: "600", fontSize: 15}}>Back</Text>
                <Button
                    buttonStyle={{backgroundColor: colours.secondaryPurple, padding: 10, borderRadius: 10}}
                    title={"Next"}
                    onPress={() => {navigation.navigate('Step8')}}
                    titleStyle={{ fontSize: 15, fontWeight: "600" }}
                />
            </View>

        </View>
    )
}

export const Step8 = ({route, navigation}: any) => {
    return (
        <View style={{paddingHorizontal: '5%', flex: 1}}>

            <ScrollView>
                <Text>Step 8</Text>
            </ScrollView>

            <View style={styles.footer}>
                <Text style={{color: colours.textGrey, fontWeight: "600", fontSize: 15}}>Back</Text>
                <Button
                    buttonStyle={{backgroundColor: colours.secondaryPurple, padding: 10, borderRadius: 10}}
                    title={"Next"}
                    onPress={() => {navigation.navigate('Step9')}}
                    titleStyle={{ fontSize: 15, fontWeight: "600" }}
                />
            </View>
        </View>
    )
}

export const Step9 = ({route, navigation}: any) => {
    return (
        <View style={{paddingHorizontal: '5%', flex: 1}}>

            <ScrollView>
                <Text>Step 9</Text>
            </ScrollView>

            <View style={styles.footer}>
                <Text style={{color: colours.textGrey, fontWeight: "600", fontSize: 15}}>Back</Text>
                <Button
                    buttonStyle={{backgroundColor: colours.secondaryPurple, padding: 10, borderRadius: 10}}
                    title={"Next"}
                    onPress={() => {}}
                    titleStyle={{ fontSize: 15, fontWeight: "600" }}
                />
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    footer: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingVertical: 10,
        paddingHorizontal: '5%',
        alignItems: "center",
        backgroundColor: colours.primaryGrey,
    },
    formTitle: {
        fontSize: 27,
        fontWeight: '600',
        paddingBottom: 10,
        paddingTop: 10
    },
    formDescription: {
        fontSize: 15, 
        color: colours.textGrey,
        fontWeight: '300'
    }
})
