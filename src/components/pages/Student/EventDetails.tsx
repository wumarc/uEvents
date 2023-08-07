import { View, Text, StyleSheet, ScrollView, ActivityIndicator, Linking } from "react-native";
import { EventObject } from "../../../utils/model/EventObject";
import { colours, fonts, spacing, windowHeight, windowWidth, buttons } from "../../subatoms/Theme";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "./main";
import { useStateWithFireStoreDocument } from "../../../utils/useStateWithFirebase";
import { Image, Icon, Button } from "@rneui/base";
import font from "../../subatoms/fonts/font";

type props = NativeStackScreenProps<RootStackParamList, "EventDetailsView">;
// To access the type of user, use route.params.userType

const EventDetails = ({ route, navigation }: props) => {
  
  const [loading, event, set] = useStateWithFireStoreDocument<EventObject>(
    "events",
    route.params.eventID
  );

  if (loading) {
    return <ActivityIndicator />;
  }

  return (
    <View style={{flex: 1, backgroundColor: colours.white}}>

      <ScrollView style={{paddingHorizontal: spacing.horizontalMargin1, paddingBottom: 100}}>

        {/* Image */}
        <View style={{justifyContent: 'center', width: '100%', height: windowHeight * 0.18}}>
          <Image source={require('./1F3A5_color.png')}
            style={{width: '100%', height: '100%'}}
            resizeMode="contain"
          />
        </View>

        {/* Title */}
        <View style={{marginVertical: 15}}>
          <Text style={fonts.title2}>{event.name}</Text>
        </View>

        {/* Date */}
        <View style={{flexDirection: 'row', ...spacing.verticalMargin1}}>

          <View style={{flexDirection: 'row', alignItems: 'center', width: windowWidth*0.45}}>
            <Icon
                name='calendar-outline'
                type='ionicon'
                color= {colours.black}
              />
            <Text style={{...fonts.regular, marginLeft: windowWidth*0.01}}>Tomorrow</Text>
          </View>

          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Icon
                name='time-outline'
                type='ionicon'
                color= {colours.black}
              />
            <Text style={{...fonts.regular, marginLeft: windowWidth*0.01}}>08:00 PM</Text>
            {/* extractTime(event.startTime) + " - " + (event.endTime ? extractTime(event.endTime!) : "End") */}
          </View>

        </View>

        {/* Description */}
        <View style={spacing.verticalMargin1}>
          <Text style={{...fonts.title2, ...spacing.bottomMargin1}}>ℹ️Description</Text>
          <Text style={fonts.regular}>Join us for an unforgettable camping experience in the heart of [Location] from [Dates]. The Wildlife Wilderness Camping Retreat offers a blend of relaxation and outdoor adventure, catering to both seasoned explorers and those new to the wilderness. Activities include guided nature hikes, fishing, kayaking, campfire nights, stargazing, and outdoor cooking workshops. Join us for an unforgettable camping experience in the heart of [Location] from [Dates]. The Wildlife Wilderness Camping Retreat offers a blend of relaxation and outdoor adventure, catering to both seasoned explorers and those new to the wilderness. {event.description}</Text>
        </View>

        {/* Location */}
        <View style={spacing.verticalMargin1}>
          <Text style={{...fonts.title2, ...spacing.bottomMargin1}}>📍Location</Text>
          <View style={{borderWidth: 2, borderColor: colours.primaryGrey, borderRadius: 15, justifyContent: 'center', alignItems: 'center', padding: '3%'}}>
            <Text style={fonts.title3}>{event.location}</Text>
            <Text style={fonts.small}>{event.address}100 Bank Street, Ottawa, ON, K1N5P9</Text>
            <Button title={"Open on Google Maps"}
              buttonStyle={{...buttons.button1, marginTop: '3%'}}
              titleStyle={{fontSize: 13, fontWeight: '500', color: colours.white}}
            />
          </View>
        </View>

        {/* Other information */}
        <View style={spacing.verticalMargin1}>
          <Text style={{...fonts.title2, ...spacing.bottomMargin1}}>📝Other Information</Text>
          <Text style={fonts.regular}>If you are vegetarian, please let us know by sending us an email</Text>
        </View>

        {/* Organizer */}
        <View>
          <Text style={fonts.title2}>🏠Organizer</Text>
          
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>

            {/* Icon / name */}
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Icon
                name='calendar-outline'
                type='ionicon'
                color= {colours.grey}
              />
              <Text style={fonts.regular}>{event.organizer}</Text>
            </View>
          </View>

        </View>

      </ScrollView>

      <View style={styles.footer}>
        <Text style={fonts.title3}>
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