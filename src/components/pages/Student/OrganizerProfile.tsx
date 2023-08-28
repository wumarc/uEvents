import { View, Text, ScrollView, StyleSheet, Linking, FlatList } from "react-native";
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
import { useStateWithFireStoreDocument, useStateWithFireStoreImage, useStateWithFireStoreCollection } from "../../../utils/useStateWithFirebase";
import { Loading } from "../Common/Loading";
import { EventObject, nextStartTime } from "../../../utils/model/EventObject";
import { searchAlgo } from "../../../utils/search";
import { Timestamp } from "firebase/firestore";

type props = NativeStackScreenProps<RootStackParamList, "EventOrganizerView">;

const OrganizerProfile = ({route, navigation}: props) => {

    const [loading, organizer, setOrganizer] = useStateWithFireStoreDocument<Organizer>("users", route.params.organizerID);
    const [loading2, url, found] = useStateWithFireStoreImage("organizers/" + route.params.imageID);

    const [listView, setListView] = useState(true);
    const [loading3, events, add] =useStateWithFireStoreCollection<EventObject>("events");
    const [dialogVisible, setdialogVisible] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const [search, setSearch] = useState("");

    if (loading || loading2 || loading3) {
        return <Loading />;
    }

    if (!organizer) {
        return (
            <View style={{alignItems: 'center', justifyContent: 'center', flex: 1, backgroundColor: colours.white}}>
                <Text style={fonts.title2}>Sorry an error has occured</Text>
                <Text style={fonts.regular}>ID field is missing in organizer</Text>
                <Text style={fonts.regular}>Please reach out to us at admin@uevents.org</Text>
            </View>
        );
    }

    /* ---------------------------- Filter the events --------------------------- */
    // Filtered events
    let filteredEvents = events as EventObject[];
    filteredEvents = searchAlgo(search, filteredEvents);
    // if (selectedIndex !== 0) {
    //   filteredEvents = filteredEvents.filter((event) =>
    //     event.categories.includes(
    //       Object.values(EventCategory)[selectedIndex] as EventCategory
    //     )
    //   );
    // }
    filteredEvents = filteredEvents.filter((event) => {
        let startTime = nextStartTime(event.startTime, event.recurrence);
        if (!startTime) {
        return false;
        }
        return startTime.toMillis() > Timestamp.now().toMillis();
    });

    filteredEvents = filteredEvents.filter((event) => 
        event.state == "Published")

    return (
        <ScrollView style={{backgroundColor: colours.white, paddingHorizontal: spacing.page2}}>
            
            {/* Club logo */}
            <View style={{alignItems: 'center', ...spacing.verticalMargin1}}>
                {url? <Avatar
                    size={150}
                    rounded
                    source={{uri: url}}
                    containerStyle={{ backgroundColor: 'transparent'}}
                /> : <Icon name="person" />}
                
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
                {organizer.instagram && 
                    <Icon
                        name='logo-instagram'
                        type='ionicon'
                        color={colours.black}
                        size={35}
                        containerStyle={{...spacing.verticalMargin1}}
                        onPress={() => Linking.openURL("https://www.instagram.com/" + organizer.instagram)}
                    />
            }
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
                {/* List */}
                <FlatList
                style={{}}
                showsVerticalScrollIndicator={false}
                data={filteredEvents}
                renderItem={({ item, index }) => (
                    <View style={{marginVertical: "2%"}}>
                    <Event
                        organizer={item.organizer}
                        id={item.id}
                        navigation={navigation}
                        userType={route.params.organizerID}
                        listView={listView}
                    />
                    </View>
                )}
                />
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