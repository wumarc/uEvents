import { View, Text, StyleSheet, ScrollView, ActivityIndicator, Linking } from "react-native";
import { EventObject } from "../../../utils/model/EventObject";
import { colours } from "../../subatoms/colours";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "./main";
import { useStateWithFireStoreDocument } from "../../../utils/useStateWithFirebase";
import { Image, Icon, Button } from "@rneui/base";
import {Dimensions} from 'react-native';

type props = NativeStackScreenProps<RootStackParamList, "EventDetailsView">;
// To access the type of user, use route.params.userType

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const EventDetails = ({ route, navigation }: props) => {
  const [loading, event, set] = useStateWithFireStoreDocument<EventObject>(
    "events",
    route.params.eventID
  );

  // const [loading2, url, found] = useStateWithFireStoreImage(
  //   route.params.imageID
  // );

  if (loading) {
    return <ActivityIndicator />;
  }

  let image = {
    uri:
      "https://storage.googleapis.com/uevents-a9365.appspot.com/events/" +
      route.params.imageID,
  };

  return (
    <View style={styles.container}>

        <ScrollView style={{paddingHorizontal: '5%', paddingBottom: 100}}>

          {/* Image */}
          <View style={{justifyContent: 'center', width: '100%', height: windowHeight * 0.2 }}>
            <Image
              source={require('./1F3A5_color.png')}
              style={{width: '100%', height: '100%'}}
              resizeMode="contain"
            />
          </View>

          {/* Title */}
          <View style={{marginVertical: 15}}>
            <Text style={{fontSize: 20, fontWeight: '600', color: colours.titleGrey}}>{event.name}</Text>
          </View>

          {/* Date */}
          <View style={{flexDirection: 'row'}}>
            <View style={{flexDirection: 'row', alignItems: 'center', width: '40%'}}>
              <Icon
                  name='calendar-outline'
                  type='ionicon'
                  color= {colours.textGrey}
                />
              <Text style={{color: colours.textGrey}}>Today</Text>
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Icon
                  name='time-outline'
                  type='ionicon'
                  color= {colours.textGrey}
                />
              <Text style={{color: colours.textGrey}}>08:00 PM</Text>
              {/* extractTime(event.startTime) + " - " + (event.endTime ? extractTime(event.endTime!) : "End") */}
            </View>
          </View>

          {/* Description */}
          <View style={styles.margin}>
            <Text style={{fontSize: 18, fontWeight: '600', marginBottom: 10, color: colours.titleGrey}}>Description</Text>
            <Text style={{color: colours.textGrey, fontSize: 17}}>Join us for an unforgettable camping experience in the heart of [Location] from [Dates]. The Wildlife Wilderness Camping Retreat offers a blend of relaxation and outdoor adventure, catering to both seasoned explorers and those new to the wilderness. Activities include guided nature hikes, fishing, kayaking, campfire nights, stargazing, and outdoor cooking workshops. Join us for an unforgettable camping experience in the heart of [Location] from [Dates]. The Wildlife Wilderness Camping Retreat offers a blend of relaxation and outdoor adventure, catering to both seasoned explorers and those new to the wilderness. {event.description}</Text>
          </View>

          {/* Other information */}
          <View style={styles.margin}>
            <Text style={{fontSize: 18, fontWeight: '600', marginBottom: 10, color: colours.titleGrey}}>Other Information</Text>
            <Text style={{color: colours.textGrey, fontSize: 17}}>If you are vegetarian, please let us know by sending us an email</Text>
          </View>

          {/* Location */}
          <View>
            <Text style={{fontSize: 18, fontWeight: '600', marginBottom: 10, color: colours.titleGrey}}>Location</Text>
            <View>
              <View style={{backgroundColor: colours.primaryGrey, justifyContent: 'center', alignItems: 'center'}}>
                <Text style={{color: colours.textGrey, fontWeight: 'bold'}}>{event.location}</Text>
                <Text style={{color: colours.textGrey, marginTop: 10}}>{event.address}100 Bank Street</Text>
                <Text style={{color: colours.textGrey}}>Ottawa, ON, K1N5P9</Text>
              </View>
            </View>
          </View>

          {/* Organizer */}
          <View>
            <Text style={{fontSize: 18, fontWeight: '600', marginBottom: 10, color: colours.titleGrey}}>Organizer</Text>
            
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
        <Text style={{color: colours.textGrey, fontWeight: "600", fontSize: 15}}>
          {event.priceMin 
            ? event.priceMax
            ? "$" + event.priceMin + "- $" + event.priceMax
            : "$" + event.priceMin
            : "Free"
          }
          {/* {event.priceMin ? event.priceMax ? "$" + event.priceMin + "- $" + event.priceMax : "$" + event.priceMin : "Free"} */}
        </Text>
        <Button
          buttonStyle={{backgroundColor: colours.secondaryPurple, padding: 10, borderRadius: 10}}
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