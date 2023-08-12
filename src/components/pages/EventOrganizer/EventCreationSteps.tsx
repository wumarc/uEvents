import { View, Text, ScrollView, StyleSheet, Animated } from "react-native"
import { Input } from "react-native-elements"
import { useState } from "react";
import { Button } from "@rneui/base";
import { colours, fonts } from "../../subatoms/Theme";

export const Step0 = ({route, navigation}: any) => {
    
    const [step, setStep] = useState(1);
    const slideAnim = useState(new Animated.Value(0))[0];

    const nextStep = () => {
        // Slide out current step
        Animated.timing(slideAnim, {
          toValue: -800, // Slide to left
          duration: 200,
          useNativeDriver: true,
        }).start(() => {
          // Update step
          setStep(step + 1);
    
          // Slide in next step
          Animated.timing(slideAnim, {
            toValue: 0, // Slide back to original position
            duration: 200,
            useNativeDriver: true,
          }).start();
        });
      };

    return (
        <View style={{flex: 1, backgroundColor: colours.white, justifyContent: 'space-between'}}>
            
            {/* Render the right step dynamically */}
            <Animated.View style={{ transform: [{ translateX: slideAnim }] }}>
                {step == 1 && <Step1 />}
                {step == 2 && <Step2 />}
                {step == 3 && <Step3 />}
                {step == 4 && <Step4 />}
                {step == 5 && <Step5 />}
                {step == 6 && <Step6 />}
                {step == 7 && <Step7 />}
                {step == 8 && <Step8 />}
                {step == 9 && <Step9 />}
            </Animated.View>

            {/* Static Footer */}
            <View style={styles.footer}>
                <Button
                    buttonStyle={{backgroundColor: colours.purple, padding: 10, borderRadius: 10}}
                    title={"Back"}
                    onPress={() => {setStep(step - 1)}}
                    titleStyle={{ fontSize: 15, fontWeight: "600" }}
                />
                <Button
                    buttonStyle={{backgroundColor: colours.purple, padding: 10, borderRadius: 10}}
                    title={"Next"}
                    onPress={() => {setStep(step + 1), nextStep()}}
                    titleStyle={{ fontSize: 15, fontWeight: "600" }}
                />
            </View>

        </View>
    );
}

export const Step1 = ({route, navigation}: any) => {
    
    const [charactersAvailable, setCharactersAvailable] = useState<number>(35);
    
    return (       
        <View>
            <Text style={fonts.title1}>How should we call your event?</Text>
            
            <Text style={fonts.regular}>Short names work best. Have fun with it!</Text>

            <View style={{marginVertical: '5%'}}>
                <Text>{charactersAvailable} <Text style={{color: colours.grey}}>characters available</Text></Text>
                <Input
                    onChange={(e) => {setCharactersAvailable(35 - e.nativeEvent.text.length)}}
                    maxLength={35}
                />
            </View>
        </View>
    )
}

export const Step2 = ({route, navigation}: any) => {
    return (
        
            
            <ScrollView>
                <Text>Provide a description of your event</Text>
            </ScrollView>
            
        
    )
}

export const Step3 = ({route, navigation}: any) => {
    return (
        

            <ScrollView>
                <Text>Are you hosting event on campus?</Text>
            </ScrollView>

        
    )
}

export const Step4 = ({route, navigation}: any) => {
    return (
        

            <ScrollView>
                <Text>Where is your event located?</Text>
            </ScrollView>

        
    )
}

export const Step5 = ({route, navigation}: any) => {
    return (
        
            
            <ScrollView>
                <Text>Step 5</Text>
            </ScrollView>

        
    )
}

export const Step6 = ({route, navigation}: any) => {
    return (
        
            
            <ScrollView>
                <Text>Step 6</Text>
            </ScrollView>


    )
}

export const Step7 = ({route, navigation}: any) => {
    return (
        <ScrollView>
            <Text>Step 7</Text>
        </ScrollView>
    )
}

export const Step8 = ({route, navigation}: any) => {
    return (
            <ScrollView>
                <Text>Step 8</Text>
            </ScrollView>
    )
}

export const Step9 = ({route, navigation}: any) => {
    return (

            <ScrollView>
                <Text>Step 9</Text>
            </ScrollView>
    )
}

const styles = StyleSheet.create({
    footer: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingVertical: 10,
        paddingHorizontal: '5%',
        alignItems: "center",
        backgroundColor: colours.white,
        borderTopColor: colours.primaryGrey,
        borderTopWidth: 1,
    },
})
