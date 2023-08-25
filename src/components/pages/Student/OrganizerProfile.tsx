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
import { useStateWithFireStoreCollection, useStateWithFireStoreDocument } from "../../../utils/useStateWithFirebase";
import { Loading } from "../Common/Loading";
import { EventObject, nextStartTime } from "../../../utils/model/EventObject";
import { searchAlgo } from "../../../utils/search";
import { Timestamp } from "firebase/firestore";

type props = NativeStackScreenProps<RootStackParamList, "EventOrganizerView">;

const OrganizerProfile = ({route, navigation}: props) => {

    const [loading, organizer, setOrganizer] = useStateWithFireStoreDocument<Organizer>("users", route.params.organizerID);
    const [listView, setListView] = useState(true);
    const [loading2, events, add] =useStateWithFireStoreCollection<EventObject>("events");
    const [dialogVisible, setdialogVisible] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const [search, setSearch] = useState("");

    if (loading) {
        return <Loading />;
    }

    if (!organizer) {
        return <Text>ID field is missing in organizer</Text>;
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