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

                <Text style={{fontSize: 27, fontWeight: '600', paddingBottom: 10, paddingTop: 10}}>How should we call your event?</Text>
                
                <Text style={{fontSize: 15, color: colours.textGrey, fontWeight: '300'}}>Short names work best. Have fun with it!</Text>

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


const styles = StyleSheet.create({
    footer: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingVertical: 10,
        paddingHorizontal: '5%',
        alignItems: "center",
        backgroundColor: colours.primaryGrey,
      },
})

export const Step2 = () => {
    return (
        <View>

        </View>
    )
}

export const Step3 = () => {
    return (
        <View>

        </View>
    )
}

export const Step4 = () => {
    return (
        <View>

        </View>
    )
}

export const Step5 = () => {
    return (
        <View>

        </View>
    )
}

export const Step6 = () => {
    return (
        <View>

        </View>
    )
}

export const Step7 = () => {
    return (
        <View>

        </View>
    )
}

export const Step8 = () => {
    return (
        <View>

        </View>
    )
}

export const Step9 = () => {
    return (
        <View>

        </View>
    )
}

