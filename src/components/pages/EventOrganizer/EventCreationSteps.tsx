import { View, Text, ScrollView, StyleSheet, Modal, KeyboardAvoidingView} from "react-native"
import { Icon, Input } from "react-native-elements"
import { useState } from "react";
import { Button } from "@rneui/base";
import { colours, fonts, spacing, windowHeight, windowWidth } from "../../subatoms/Theme";
import { ProgressBar } from "react-native-paper";
import {Calendar, LocaleConfig} from 'react-native-calendars';

export const Step0 = ({route, navigation}: any) => {
    
    const [step, setStep] = useState(1);

    return (
        <View style={{flex: 1, backgroundColor: colours.white, justifyContent: 'space-between'}}>
            
            {/* Render the right step dynamically */}
            <ScrollView>
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
            </ScrollView>

            {/* Static Footer */}
            <View>
                <ProgressBar
                    progress={step*0.1}
                    color={colours.purple}
                />
                <View style={styles.footer_buttons}>
                    <Button
                        buttonStyle={{backgroundColor: colours.white}}
                        title={"Back"}
                        onPress={() => step==1 ? navigation.pop() : setStep(step -1)}
                        titleStyle={{...fonts.title3}}
                        // disabledStyle={{backgroundColor: colours.white}}
                        // disabledTitleStyle={{color: colours.white}}
                        // disabled={step==1}
                    />
                    <Button
                        buttonStyle={{backgroundColor: colours.purple, padding: 15, borderRadius: 10}}
                        title={"Next"}
                        onPress={() => {setStep(step + 1)}} 
                        titleStyle={{...fonts.title2, color: colours.white}}
                    />
                </View>
            </View>

        </View>
    );
}

export const Step1 = ({route, navigation}: any) => {
    
    const [charactersAvailable, setCharactersAvailable] = useState<number>(35);
    
    return (       
        <KeyboardAvoidingView>
            <Text style={fonts.title1}>How should we call your event?</Text>
            
            <Text style={fonts.regular}>Short names work best. Have fun with it!</Text>

            <View style={{marginVertical: '5%'}}>
                <Text>{charactersAvailable} <Text style={{color: colours.grey}}>characters available</Text></Text>
                <Input
                    selectionColor={colours.purple}
                    autoCapitalize="none"
                    inputStyle={{height: windowHeight*0.13}}
                    inputContainerStyle={{
                        borderColor: colours.grey,
                        borderWidth: 1,
                        paddingVertical: 4,
                        paddingHorizontal: 10,
                        borderRadius: 6,
                    }}
                    textAlignVertical= 'top'
                    multiline={true}
                    containerStyle={{paddingHorizontal: 0}}
                    onChange={(e) => {setCharactersAvailable(35 - e.nativeEvent.text.length)}}
                    maxLength={35}
                />
            </View>
        </KeyboardAvoidingView>
    )
}

export const Step2 = ({route, navigation}: any) => {

    const [nextStep, setNextStep] = useState<boolean>(false);
    const [onCampus, setOnCampus] = useState<boolean>(false);

    return (
        <View>
            {!nextStep &&
                <View>
                    <Text style={fonts.title1}>Is your event taking place on campus?</Text>
                    <View>
                        <Button
                            title={"Yes"} buttonStyle={{backgroundColor: colours.purple, padding: 15, borderRadius: 10, marginBottom: 10}}
                            onPress={() => {setNextStep(true); setOnCampus(true)}}
                        />
                        <Button
                            title={"No"} buttonStyle={{backgroundColor: colours.purple, padding: 15, borderRadius: 10}}
                            onPress={() => {setNextStep(true); setOnCampus(false)}}
                        />
                    </View>
                </View>
            }

            {nextStep &&
                <View>
                    <Text style={fonts.title1}>{onCampus ? "In which building is your event taking place?" : "Where will the event take place?"}</Text>
                    <View>
                        <Text>{onCampus ? "Dropdown" : "Please provide the building name and then the address"}</Text>
                    </View>
                </View>
            }

        </View>
    )
}

export const Step3 = ({route, navigation}: any) => {
    
    const [selected, setSelected] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedDates, setSelectedDates] = useState({ startDate: null, endDate: null });

    const onDayPress = (day) => {
        const { startDate, endDate } = selectedDates;
        if (startDate && endDate) {
          setSelectedDates({ startDate: day.dateString, endDate: null });
          return;
        }
        if (startDate) {
          setSelectedDates({ ...selectedDates, endDate: day.dateString });
          return;
        }
        setSelectedDates({ ...selectedDates, startDate: day.dateString });
    };

    return (
        <View>
            <Text style={fonts.title1}>Please provide the date and time of your event</Text>

            <Button
                title={"Pick a date"}
                buttonStyle={{backgroundColor: colours.purple, padding: 15, borderRadius: 10}}
                onPress={() => {setModalVisible(true)}}
            />
            <View style={{width: windowWidth, height: windowHeight*0.5, justifyContent: 'center', marginTop: 10}}>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {setModalVisible(!modalVisible)}}
                >
                    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)'}}>
                        <View style={{width: '90%', backgroundColor: 'white', borderRadius: 10}}>
                            <Calendar
                                onDayPress={day => {setSelected(day.dateString)}}
                                markedDates={{[selected]: {selected: true, disableTouchEvent: true}}}
                                minDate={'2023-08-12'}
                                maxDate={"2023-12-12"}
                                allowSelectionOutOfRange={false}
                                markingType="multi-period"
                                hideExtraDays={true}
                                firstDay={1}
                                disableAllTouchEventsForDisabledDays={true}
                                style={{ borderWidth: 1, borderColor: 'gray', height: 350 }}
                                theme={{
                                    textSectionTitleColor: '#b6c1cd',
                                    selectedDayBackgroundColor: colours.purple,
                                    arrowColor: colours.purple,
                                    todayTextColor: colours.purple,
                                }}
                            />
                            <Button
                                title= {"Done"}
                                buttonStyle={{backgroundColor: colours.purple, padding: 10, borderRadius: 10}}
                                onPress={() => {setModalVisible(false)}}
                            />
                        </View>
                    </View>
                </Modal>
            </View>
        </View>  
    )

}

export const Step4 = ({route, navigation}: any) => {

    const [charactersAvailable, setCharactersAvailable] = useState<number>(200);

    return (
        <View>
            <View>
                <Text style={fonts.title1}>Provide a description of your event</Text>
                <Text style={fonts.regular}>Share more details about your event.</Text>
            </View>

            <Text>{charactersAvailable} <Text style={{color: colours.grey}}>characters available</Text></Text>
            <Input
                selectionColor={colours.black}
                autoCapitalize="none"
                inputStyle={{height: windowHeight*0.13}}
                inputContainerStyle={{
                    borderColor: colours.grey,
                    borderWidth: 1,
                    paddingVertical: 4,
                    paddingHorizontal: 10,
                    borderRadius: 6,
                }}
                textAlignVertical= 'top'
                multiline={true}
                containerStyle={{paddingHorizontal: 0}}
                onChange={(e) => {setCharactersAvailable(200 - e.nativeEvent.text.length)}}
                maxLength={200}
            />

        </View>
    )
}

export const Step5 = ({route, navigation}: any) => {
    return (
        <View>
            
            <View>
                <Text style={fonts.title1}>Now, set your price</Text>
                <Text style={fonts.regular}>If your event is free, just leave it blank</Text>
            </View>

            {/* Price */}
            <View>
                <Input
                    selectionColor={colours.black}
                    autoCapitalize="none"
                    placeholder="Free"
                    leftIcon={<Icon name="dollar" type="font-awesome" size={40} color={colours.black}/>}
                    inputContainerStyle={{
                        borderColor: colours.grey,
                        borderBottomWidth: 0,
                        paddingVertical: 4,
                        paddingHorizontal: 10,
                        borderRadius: 6,
                        width: windowWidth*0.5,
                        height: windowHeight*0.1,
                    }}
                    inputStyle={{fontSize: 50, fontWeight: 'bold'}}
                    containerStyle={{padding: 20, justifyContent: 'center', alignItems: 'center'}}
                    onChange={(e) => {}}
                />
            </View>
        </View>
    )
}

export const Step6 = ({route, navigation}: any) => {
    return (
        
            
            <View>
                <Text style={fonts.title1}>If your event requires additional sign up, please provide the link here</Text>
            </View>


    )
}

export const Step7 = ({route, navigation}: any) => {
    return (
        <View>
            <Text style={fonts.title1}>Recurrence</Text>
        </View>
    )
}

export const Step8 = ({route, navigation}: any) => {
    return (
            <View>
                <Text style={fonts.title1}>Finish up and publish</Text>
                <Text style={fonts.title2}>Let's take a look at your event to confirm all the information are correct</Text>
            </View>
    )
}

export const Step9 = ({route, navigation}: any) => {
    return (

            <View>
                <Text>Show Event</Text> 
            </View>
    )
}

export const Step10 = ({route, navigation}: any) => {
    return (
        <View>
            <Text>Show Event</Text>
        </View>
    )
}

export const Step11 = ({route, navigation}: any) => {
    return (
        <View>
            <Text>You're all set! A member of the uEvents team will approve your event very shortly.</Text>

            <Text>You can view your event on the Events page</Text>

            <Button
                title={"Back to Home Page"}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    footer_buttons: {
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
