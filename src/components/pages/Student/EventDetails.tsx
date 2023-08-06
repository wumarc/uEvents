import { View, Text, StyleSheet, ScrollView, ActivityIndicator, Linking } from "react-native";
import { EventObject } from "../../../utils/model/EventObject";
import { colours, fonts, padding, windowHeight, windowWidth } from "../../subatoms/Theme";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "./main";
import { useStateWithFireStoreDocument } from "../../../utils/useStateWithFirebase";
import { Image, Icon, Button } from "@rneui/base";

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
    <View style={styles.container}>

      <ScrollView style={{paddingHorizontal: padding.HorizontalStack, paddingBottom: 100}}>

        {/* Image */}
        <View style={{justifyContent: 'center', width: '100%', height: windowHeight * 0.18}}>
          <Image
            source={require('./1F3A5_color.png')}
            style={{width: '100%', height: '100%'}}
            resizeMode="contain"
          />
        </View>

        {/* Title */}
        <View style={{marginVertical: 15}}>
          <Text style={fonts.title2}>{event.name}</Text>
        </View>

        {/* Date */}
        <View style={{flexDirection: 'row'}}>

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
        <View style={styles.margin}>
          <Text style={fonts.title2}>Description</Text>
          <Text style={fonts.regular}>Join us for an unforgettable camping experience in the heart of [Location] from [Dates]. The Wildlife Wilderness Camping Retreat offers a blend of relaxation and outdoor adventure, catering to both seasoned explorers and those new to the wilderness. Activities include guided nature hikes, fishing, kayaking, campfire nights, stargazing, and outdoor cooking workshops. Join us for an unforgettable camping experience in the heart of [Location] from [Dates]. The Wildlife Wilderness Camping Retreat offers a blend of relaxation and outdoor adventure, catering to both seasoned explorers and those new to the wilderness. {event.description}</Text>
        </View>

        {/* Other information */}
        <View style={styles.margin}>
          <Text style={fonts.title2}>Other Information</Text>
          <Text style={fonts.regular}>If you are vegetarian, please let us know by sending us an email</Text>
        </View>

        {/* Location */}
        <View>
          <Text style={fonts.title2}>Location</Text>
          <View>
            <View style={{backgroundColor: colours.primaryGrey, justifyContent: 'center', alignItems: 'center'}}>
              <Text style={fonts.regular}>{event.location}</Text>
              <Text style={fonts.small}>{event.address}100 Bank Street</Text>
              <Text style={fonts.small}>Ottawa, ON, K1N5P9</Text>
            </View>
          </View>
        </View>

        {/* Organizer */}
        <View>
          <Text style={fonts.title2}>Organizer</Text>
          
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>

            {/* Icon / name */}
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Icon
                name='calendar-outline'
                type='ionicon'
                color= {colours.textGrey}
              />
              <Text>{event.organizer}</Text>
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
          {/* {event.priceMin ? event.priceMax ? "$" + event.priceMin + "- $" + event.priceMax : "$" + event.priceMin : "Free"} */}
        </Text>
        <Button
          buttonStyle={{backgroundColor: colours.purple, padding: 10, borderRadius: 10}}
          title={event.signUpLink == null ? "No Signup Required" : "Sign Up"}
          disabled={event.signUpLink == null}
          titleStyle={{ fontSize: 15, fontWeight: "600" }}
          // containerStyle= {{
          //   width: 150,
          //   marginHorizontal: 50,
          //   marginVertical: 10,
          // }}
          onPress={() => {if (event.signUpLink != null) { Linking.openURL(event.signUpLink!);}}}
        />
      </View>

    </View>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colours.white,
  },
  margin: {
    marginVertical: "4%",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
    paddingHorizontal: '5%',
    alignItems: "center",
    backgroundColor: colours.primaryGrey,
  },
});

export default EventDetails;