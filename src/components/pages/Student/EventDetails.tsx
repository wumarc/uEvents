import { View, Text, StyleSheet, ScrollView, ActivityIndicator, Linking, ImageBackground } from "react-native";
import { EventObject, getTimeInAMPM, relativeDate } from "../../../utils/model/EventObject";
import { colours, fonts, spacing, windowHeight, windowWidth, buttons } from "../../subatoms/Theme";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "./main";
import { useStateWithFireStoreDocument } from "../../../utils/useStateWithFirebase";
import { Image, Icon, Button, color } from "@rneui/base";
import { SvgUri } from 'react-native-svg';
import { defaultOrganizer } from "../../../utils/model/Organizer";
import { useEffect, useState } from "react";
import { Loading } from "../Common/Loading";
import { BottomSheet } from "@rneui/themed";
import CustomInput from "../../atoms/CustomInput";
import CustomButton from "../../atoms/CustomButton";
import { Badge } from "react-native-elements";

type props = NativeStackScreenProps<RootStackParamList, "EventDetailsView">;
// To access the type of user, use route.params.userType

const EventDetails = ({ route, navigation }: props) => {
  
  const [isVisible, setIsVisible] = useState(false);
  const [loading, event, set] = useStateWithFireStoreDocument<EventObject>(
    "events",
    route.params.eventID
  );
  const [loading2, organizer, set2] = useStateWithFireStoreDocument<EventObject>(
    "users",
    route.params.organizerID
  );

  // useEffect(() => {
  //   if (!loading) {
  //     const [loading2, organizer, set2] = useStateWithFireStoreDocument<EventObject>(
  //       "users",
  //       event.organizer
  //     );
  //     if (!loading2) {
  //       setOrganizerName(organizer.name);
  //     }
  //   }
  // }, [event]);

  if (loading || loading2) {
    return <Loading />;
  }

  return (
    <View style={{flex: 1, backgroundColor: colours.white}}>

      <ScrollView style={{paddingHorizontal: spacing.horizontalMargin1, paddingBottom: 100}} showsVerticalScrollIndicator={false}>

        {/* Image */}
        <View style={{justifyContent: 'center', width: '100%', height: windowHeight * 0.18}}>
        <SvgUri
          width="100%"
          height="100%"
          uri={"https://openmoji.org/data/color/svg/" + (event.emoji ?? "❓").codePointAt(0)?.toString(16).toUpperCase() + ".svg"}
          fill="black"
        />
        </View>

        {/* Title */}
        <View style={{marginVertical: 5}}>
          <Text style={{...fonts.title2, textAlign: 'center'}}>{event.name}</Text>
        </View>

        {/* Date */}
        <View style={{flexDirection: 'row', ...spacing.verticalMargin1}}>

          <View style={{flexDirection: 'row', alignItems: 'center', width: windowWidth*0.45}}>
            <Text style={{...fonts.regular, marginLeft: windowWidth*0.01}}>📅 {relativeDate(event.startTime)}</Text>
          </View>

          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text style={{...fonts.regular, marginLeft: windowWidth*0.01}}>
              🕧 {getTimeInAMPM(event.startTime.toDate()) + "-"}{event.endTime ? getTimeInAMPM(event.endTime.toDate()) : "End"}
            </Text>
          </View>

        </View>

        {/* Description */}
        <View style={spacing.verticalMargin1}>
          <Text style={{...fonts.title2, ...spacing.bottomMargin1}}>ℹ️ Description</Text>
          <Text style={fonts.regular}>{event.description}</Text>
        </View>

        {/* Location */}
          <View style={spacing.verticalMargin1}>
            <Text style={{...fonts.title2, ...spacing.bottomMargin1}}>📍 Location</Text>
            <ImageBackground 
              source={require('./map.png')} 
              style={{flex: 1}}
              imageStyle={{borderRadius: 15, opacity: 0.3}}
            >
              <View style={{borderColor: colours.primaryGrey, borderRadius: 15, justifyContent: 'center', alignItems: 'center', padding: '3%'}}>
                <Text style={{...fonts.title3, textAlign: 'center'}}>{event.location}</Text>
                {event.roomNumber && <Text style={{...fonts.title3, textAlign: 'center'}}>Room {event.roomNumber}</Text>}
                <Text style={{...fonts.small, textAlign: 'center'}}>{event.address}</Text>
                <Button title={"Google Maps"}
                  buttonStyle={{...buttons.button1, marginTop: '3%', backgroundColor: '#4285F4'}}
                  titleStyle={{fontSize: 13, fontWeight: '500', color: colours.white}}
                  onPress={() => {Linking.openURL("https://www.google.com/maps/search/?api=1&query=" + event.address)}}
                />
              </View>
            </ImageBackground>
          </View>

        {/* Organizer */}
        <View style={spacing.verticalMargin1}>
          <Text style={{...fonts.title2, ...spacing.bottomMargin1}}>🏠 Organizer</Text>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            {/* Icon / name */}
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              {/* <Icon
                name='calendar-outline'
                type='ionicon'
                color= {colours.grey}
              /> */}
              <Text style={fonts.regular}>
                {event.organizerType == "Manually Added" ? event.organizer : organizer.name}
              </Text>
            </View>
          </View>

        </View>

        {/* Tags */}
        <View style={spacing.verticalMargin1}>
          <Text style={{...fonts.title2, ...spacing.bottomMargin1}}>🏷️ Tags</Text>
          <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
            {event.categories.map((category, index) => {
              return (
                //TODO use something else other than badge in the future
                <Badge
                  key={index}
                  value={category}
                  badgeStyle={{
                    backgroundColor: colours.white,
                    marginHorizontal: 3,
                    borderWidth: 1,
                    borderColor: colours.grey,
                  }}
                  textStyle={{fontSize: 13, color: colours.grey}}
                  containerStyle={{marginVertical: 2}}
                />
              )
            })}
          </View>
        </View>

        {event.originalLink &&
          <View style={spacing.verticalMargin1}>
            <Text style={{...fonts.title2, ...spacing.bottomMargin1}}>🔗 Source Link</Text>
            <Text style={{...fonts.small, textDecorationLine: 'underline'}} onPress={() => Linking.openURL(event.originalLink)}>{event.originalLink}</Text>
          </View>
        }

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
                      Thank you for taking the time to report, we will look into it as soon as possible!
                  </Text>
                </View>
                <View style={{marginHorizontal: spacing.horizontalMargin1}}>
                    <CustomButton
                        buttonName="Submit report"
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

      <View style={styles.footer}>
        <Text style={fonts.title2}>
          {event.priceMin ? event.priceMax
            ? "$" + event.priceMin + "- $" + event.priceMax : "$" + event.priceMin
            : "Free"
          }
        </Text>
        <Button
          buttonStyle={{backgroundColor: colours.purple, padding: 10, borderRadius: 10}}
          title={event.signUpLink == null ? "No Signup Required" : "Sign Up"}
          disabled={event.signUpLink == null}
          titleStyle={{ fontSize: 15, fontWeight: "600" }}
          onPress={() => {if (event.signUpLink != null) { Linking.openURL(event.signUpLink!);}}}
        />
      </View>

    </View>

  );
};

const styles = StyleSheet.create({
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
    paddingHorizontal: '5%',
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: colours.primaryGrey,
    backgroundColor: colours.white,
  },
});

export default EventDetails;