import { View, Text, ScrollView, StyleSheet } from "react-native"
import { Input } from "react-native-elements"
import { useState } from "react";
import { Button } from "@rneui/base";
import { colours, fonts, spacing } from "../../subatoms/Theme";

export const Step0 = ({route, navigation}: any) => {
    
    const [step, setStep] = useState(1);

    return (
        <View style={{flex: 1, backgroundColor: colours.white, justifyContent: 'space-between'}}>
            
            {/* Render the right step dynamically */}
            <View style={{paddingHorizontal: spacing.page2, ...spacing.verticalPadding1}}>
                {step == 1 && <Step1 />}
                {step == 2 && <Step2 />}
                {step == 3 && <Step3 />}
                {step == 4 && <Step4 />}
                {step == 5 && <Step5 />}
                {step == 6 && <Step6 />}
                {step == 7 && <Step7 />}
                {step == 8 && <Step8 />}
                {step == 9 && <Step9 />}
                {step == 10 && <Step10 />}
                {step == 11 && <Step11 />}
            </View>

            {/* Static Footer */}
            <View style={styles.footer}>
                <Button
                    buttonStyle={{backgroundColor: colours.white}}
                    title={"Back"}
                    onPress={() => setStep(step -1)}
                    titleStyle={ step==1 ? {color: colours.white} : {...fonts.title3} }
                    disabledStyle={{backgroundColor: colours.white}}
                    disabledTitleStyle={{color: colours.white}}
                    disabled={step==1}
                />
                <Button
                    buttonStyle={{backgroundColor: colours.purple, padding: 15, borderRadius: 10}}
                    title={"Next"}
                    onPress={() => {setStep(step + 1)}} 
                    titleStyle={{...fonts.title2, color: colours.white}}
                />
            </View>

        </View>
    );
}

export const Step1 = ({route, navigation}: any) => {
    
    const [charactersAvailable, setCharactersAvailable] = useState<number>(35);
    
    return (       
        <ScrollView>
            <Text style={fonts.title1}>How should we call your event?</Text>
            
            <Text style={fonts.regular}>Short names work best. Have fun with it!</Text>

            <View style={{marginVertical: '5%'}}>
                <Text>{charactersAvailable} <Text style={{color: colours.grey}}>characters available</Text></Text>
                <Input
                    onChange={(e) => {setCharactersAvailable(35 - e.nativeEvent.text.length)}}
                    maxLength={35}
                />
            </View>
        </ScrollView>
    )
}

export const Step2 = ({route, navigation}: any) => {
    return (
        
            
            <ScrollView>
                <Text style={fonts.title1}>Is your event taking place on campus?</Text>
            </ScrollView>
            
        
    )
}

export const Step3 = ({route, navigation}: any) => {
    return (
        

            <ScrollView>
                <Text style={fonts.title1}>In which building is your event taking place? | Where will your event be located?</Text>
            </ScrollView>

        
    )
}

export const Step4 = ({route, navigation}: any) => {
    return (
        

            <ScrollView>
                <Text style={fonts.title1}>Provide the date and time of your event</Text>
            </ScrollView>

        
    )
}

export const Step5 = ({route, navigation}: any) => {
    return (
        
            
            <ScrollView>
                <Text style={fonts.title1}>Provide a description of your event</Text>
            </ScrollView>

        
    )
}

export const Step6 = ({route, navigation}: any) => {
    return (
        
            
            <ScrollView>
                <Text style={fonts.title1}>Price</Text>
            </ScrollView>


    )
}

export const Step7 = ({route, navigation}: any) => {
    return (
        <ScrollView>
            <Text style={fonts.title1}>If your event requires additional sign up, please provide the link here</Text>
        </ScrollView>
    )
}

export const Step8 = ({route, navigation}: any) => {
    return (
            <ScrollView>
                <Text style={fonts.title1}>Recurrence?</Text>
            </ScrollView>
    )
}

export const Step9 = ({route, navigation}: any) => {
    return (

            <ScrollView>
                <Text style={fonts.title1}>Finish up and publish</Text>
                <Text style={fonts.title2}>Let's take a look at your event to confirm all the information are correct</Text>
            </ScrollView>
    )
}

export const Step10 = ({route, navigation}: any) => {
    return (
        <View><Text>Show Event</Text></View>
    )
}

export const Step11 = ({route, navigation}: any) => {
    return (
        <View><Text>You're all set! A member of the uEvents team will shortly approve your event very shortly.</Text></View>
    )
}


const styles = StyleSheet.create({
    footer: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingVertical: '3%',
        paddingHorizontal: '5%',
        alignItems: "center",
        backgroundColor: colours.white,
        borderTopColor: colours.primaryGrey,
        borderTopWidth: 2,
    },
})
