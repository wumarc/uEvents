import { View, Text, ScrollView, StyleSheet } from "react-native";
import { colours, fonts, spacing, windowWidth } from "../../subatoms/Theme";
import Event from "../../organisms/Event";
import { Avatar, ButtonGroup, Icon } from "react-native-elements";
import { useState } from "react";
import { Dialog } from "react-native-elements";
import * as Clipboard from 'expo-clipboard';
import { BottomSheet } from "@rneui/themed";
import { Button } from "@rneui/base";
import CustomButton from "../../atoms/CustomButton";
import { RootStackParamList } from "./main";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Organizer } from "../../../utils/model/Organizer";
import { useStateWithFireStoreDocument } from "../../../utils/useStateWithFirebase";
import { Loading } from "../Common/Loading";

type props = NativeStackScreenProps<RootStackParamList, "EventOrganizerView">;
const OrganizerProfile = ({route, navigation}: props) => {

    console.log(route.params.organizerID)
    const [loading, organizer, setOrganizer] = useStateWithFireStoreDocument<Organizer>("users", route.params.organizerID);

    const [dialogVisible, setdialogVisible] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    if (loading) {
        return <Loading />;
    }

    if (!organizer) {
        return <Text>Id field is missing in organizer</Text>;
    }

    return (
        <ScrollView style={{backgroundColor: colours.white, paddingHorizontal: spacing.page2}}>
            
            {/* Club logo */}
            <View style={{alignItems: 'center', ...spacing.verticalMargin1}}>
                <Avatar
                    size={150}
                    rounded
                    source={{uri: 'https://files.jotform.com/jufs/cvuo/91997878083278/5057107869824708883/logo.png?md5=6dY9Wg6_82qC1Q9bMfDynw&expires=1692906356'}}
                    containerStyle={{ backgroundColor: 'transparent'}}
                />
            </View>

            {/* Club title */}
            <View>
                <Text style={{...fonts.title2, textAlign: 'center'}}>{organizer.name}</Text>
            </View>

            {/* Club description */}
            <View style={spacing.verticalMargin1}>
                <Text style={{...fonts.regular, textAlign: 'center'}}>The University of Ottawa Chess Club is a space where students of all strengths can get together and share their passion for chess. We hold bi-weekly meetings where players compete both casually and competitively. Once a year we compete in the annual Canadian University Chess Championship (CUCC) against other Canadian universities.</Text>
            </View>

            {/* Club socials */}
            <View style={{justifyContent: 'center', flexDirection: 'row'}}>
                <Icon
                    name='logo-instagram'
                    type='ionicon'
                    color={colours.black}
                    size={35}
                    containerStyle={{...spacing.verticalMargin1}}
                    onPress={() => console.log('hello')}
                />
                <Icon
                    name='at-outline'
                    type='ionicon'
                    color={colours.black}
                    size={35}
                    containerStyle={{...spacing.verticalMargin1}}
                    onPress={() => setdialogVisible(true)}
                />
            </View>

            {/* Club events */}
            <View>
                <ButtonGroup
                    buttons={['Upcoming', 'Past']}
                    selectedIndex={0}
                    containerStyle={{height: 50}}
                    selectedButtonStyle={{backgroundColor: colours.purple}}
                    textStyle={{...fonts.regular}}
                />
            </View>
            
            {/* Report section */}
            <View style={{alignItems: 'center', ...spacing.verticalMargin1}}>
            <Text 
                style={{...fonts.small, color: 'blue'}}
                onPress={() => {setIsVisible(true)}}
            >
                Something wrong? Click to report the organizer
            </Text>
            </View>

            <Dialog isVisible={dialogVisible} onBackdropPress={() => setdialogVisible(false)}>
                <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                    <Text style={fonts.title2}>admin@uevents.org</Text>
                    <Button
                        buttonStyle={{backgroundColor: colours.white}} 
                        icon={<Icon name="copy" type="feather" color={colours.black} />} 
                        onPress={() => Clipboard.setStringAsync('admin@uevents.org')}
                    />
                </View>
            </Dialog>

            <BottomSheet 
            modalProps={{animationType: 'fade'}}
            onBackdropPress={() => setIsVisible(false)}
            isVisible={isVisible}
            scrollViewProps={{scrollEnabled:false}}
        >
            <View style={{
                backgroundColor: 'white', 
                paddingVertical: '7%',
                borderRadius: 15
            }}>
                <View style={{alignItems: 'center'}}>
                  <Text style={{...fonts.title1, fontSize: 100}} >👮</Text>
                  <Text style={{...fonts.regular, textAlign: 'center', marginBottom: '2%', marginHorizontal: '4%'}}>
                      Thank you for taking the time to report the user, we will look into it as soon as possible!
                  </Text>
                </View>
                <View style={{marginHorizontal: spacing.horizontalMargin1}}>
                    <CustomButton
                        buttonName="Report organizer"
                        onPressListener={() => {}}
                    />
                    <Button
                        style={{
                            paddingHorizontal: 10,
                            borderRadius: 15,
                            marginVertical: '1%'
                        }}
                        color={'transparent'}
                        titleStyle={{color: colours.purple, fontWeight: '600'}}
                        title={"Cancel"}
                        onPress={() => setIsVisible(false)}
                    />
                </View>

            </View>
        </BottomSheet>


        </ScrollView>
    );

}


const styles = StyleSheet.create({
});


export default OrganizerProfile;