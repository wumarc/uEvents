import { View, Text, StyleSheet, ScrollView, ActivityIndicator, Linking } from "react-native";
import { EventObject } from "../../../utils/model/EventObject";
import { colours, fonts, spacing, windowHeight, windowWidth, buttons } from "../../subatoms/Theme";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "./main";
import { useStateWithFireStoreDocument } from "../../../utils/useStateWithFirebase";
import { Image, Icon, Button } from "@rneui/base";
import { SvgUri } from 'react-native-svg';
import { defaultOrganizer } from "../../../utils/model/Organizer";
import { useEffect, useState } from "react";
import { Loading } from "../Common/Loading";

type props = NativeStackScreenProps<RootStackParamList, "EventDetailsView">;
// To access the type of user, use route.params.userType

const EventDetails = ({ route, navigation }: props) => {
  
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

      <ScrollView style={{paddingHorizontal: spacing.horizontalMargin1, paddingBottom: 100}}>

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
          <Text style={fonts.title2}>{event.name}</Text>
        </View>

        {/* Date */}
        <View style={{flexDirection: 'row', ...spacing.verticalMargin1}}>

          <View style={{flexDirection: 'row', alignItems: 'center', width: windowWidth*0.45}}>
            <Text style={{...fonts.regular, marginLeft: windowWidth*0.01}}>📅 Tomorrow</Text>
          </View>

          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text style={{...fonts.regular, marginLeft: windowWidth*0.01}}>🕑 08:00 PM</Text>
            {/* extractTime(event.startTime) + " - " + (event.endTime ? extractTime(event.endTime!) : "End") */}
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
          <View style={{borderWidth: 2, borderColor: colours.primaryGrey, borderRadius: 15, justifyContent: 'center', alignItems: 'center', padding: '3%'}}>
            <Text style={fonts.title3}>{event.location}</Text>
            <Text style={fonts.small}>{event.address}</Text>
            <Button title={"Open on Google Maps"}
              buttonStyle={{...buttons.button1, marginTop: '3%'}}
              titleStyle={{fontSize: 13, fontWeight: '500', color: colours.white}}
              onPress={() => {Linking.openURL("https://www.google.com/maps/search/?api=1&query=" + event.address)}}
            />
          </View>
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
              <Text style={fonts.regular}>{event.organizerType == "Organizer Added" ? organizer.name: event.organizer}</Text>
            </View>
          </View>

        </View>

        <View style={spacing.verticalMargin1}>
          <Text style={{...fonts.title2, ...spacing.bottomMargin1}}>🔗 Source Link</Text>
          <Text style={{...fonts.small, textDecorationLine: 'underline'}} onPress={() => Linking.openURL(event.originalLink)}>{event.originalLink}</Text>
        </View>

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