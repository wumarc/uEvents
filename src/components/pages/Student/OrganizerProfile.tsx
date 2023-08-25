import { View, Text, ScrollView, StyleSheet, Linking } from "react-native";
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
import { useStateWithFireStoreDocument, useStateWithFireStoreImage } from "../../../utils/useStateWithFirebase";
import { Loading } from "../Common/Loading";

type props = NativeStackScreenProps<RootStackParamList, "EventOrganizerView">;

const OrganizerProfile = ({route, navigation}: props) => {

    const [loading, organizer, setOrganizer] = useStateWithFireStoreDocument<Organizer>("users", route.params.organizerID);
    const [loading2, url, found] = useStateWithFireStoreImage("organizers/" + route.params.imageID);

    const [dialogVisible, setdialogVisible] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    if (loading || loading2) {
        return <Loading />;
    }

    if (!organizer) {
        return <Text>Id field is missing in organizer</Text>;
    }

    return (
        <ScrollView style={{backgroundColor: colours.white, paddingHorizontal: spacing.page2}}>
            
            {/* Club logo */}
            <View style={{alignItems: 'center', ...spacing.verticalMargin1}}>
                {url? <Avatar
                    size={150}
                    rounded
                    source={{uri: url}}
                    containerStyle={{ backgroundColor: 'transparent'}}
                />: <Icon name="person" />}
                
            </View>

            {/* Club title */}
            <View>
                <Text style={{...fonts.title2, textAlign: 'center'}}>{organizer.name}</Text>
            </View>

            {/* Club description */}
            <View style={spacing.verticalMargin1}>
                <Text style={{...fonts.regular, textAlign: 'center'}}>{organizer.description}</Text>
            </View>

            {/* Club socials */}
            <View style={{justifyContent: 'center', flexDirection: 'row'}}>
                <Icon
                    name='logo-instagram'
                    type='ionicon'
                    color={colours.black}
                    size={35}
                    containerStyle={{...spacing.verticalMargin1}}
                    onPress={() => Linking.openURL(organizer.instagram)}
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
                    <Text style={fonts.title2}>{organizer.email}</Text>
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