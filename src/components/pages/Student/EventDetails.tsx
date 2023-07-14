import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Linking,
  ImageBackground,
} from "react-native";
import { EventObject, extractMonth, extractDay, extractDayOfWeek } from "../../../utils/model/EventObject";
import { Button, Icon } from "react-native-elements";
import { colours } from "../../subatoms/colours";
import { Subtitle, regularText } from "../../subatoms/Theme";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "./main";
import { useStateWithFireStoreDocument } from "../../../utils/useStateWithFirebase";
import DateCard from "../../atoms/DateCard";
import { LinearGradient } from "expo-linear-gradient";

type props = NativeStackScreenProps<RootStackParamList, "EventDetailsView">;
// To access the type of user, use route.params.userType

const EventDetails = ({ route, navigation }: props) => {
  const [loading, event, set] = useStateWithFireStoreDocument<EventObject>(
    "events",
    route.params.eventID
  );

  // const [loading2, organizer, set2] = useStateWithFireStoreDocument<Organizer>(
  //   "users",
  //   route.params.organizerID
  // );

  if (loading) {
    return <ActivityIndicator />;
  }

  return (
    <View style={styles.big_container}>

      <View style={{flex: 1}}>
        <ScrollView style={{backgroundColor: colours.secondaryPurple}}>

          {/* Event Image */}
          <ImageBackground
            style={{ width: "100%", height: "20%" }}
            source={{
              uri: "https://i.pinimg.com/originals/a2/cd/2c/a2cd2c7e4383e563cc6a65489968b5af.jpg",
            }}
          >
            <LinearGradient
              colors={["#00000000", "#6B556B"]}
              style={{
                height: "100%",
                width: "100%",
                justifyContent: "flex-end",
              }}
            >
              {/* Event name and organizer */}
              <View style={{marginVertical: '2%', paddingHorizontal: '2.3%'}}>
                <Text style={{...styles.title, paddingVertical: '0.5%'}}>{event.name}</Text>
                <Text style={{
                  color: '#e3e3e3', 
                  fontSize: 16,
                }}>
                  {event.organizer}
                </Text>
              </View>
            </LinearGradient>

          </ImageBackground>
          
          <LinearGradient
            colors={["#6B556B", colours.secondaryPurple]}
            style={{ height: "100%", flexGrow: 1, paddingHorizontal: '2.3%'}}
          >
            <View>

              {/* Event date and on/off-campus */}
              <View style={{flexDirection: 'row', marginVertical: '2%', justifyContent: 'space-between'}}>
                
                <View style={{ flexDirection: "row", width: '70%'}}>
                  <DateCard
                    line1={extractDay(event.time)}
                    line2={extractMonth(event.time)}
                    style={{width: '34%'}}
                  />
                  <Text>{"    "}</Text>
                  <DateCard
                    line1={extractDayOfWeek(event.time)} 
                    line2={"TBD"}
                    style={{width: '34%'}}
                  />
                </View>

                <View style={{
                  ...styles.price,
                  backgroundColor: event.price > 0 ? colours.primaryPurple : 'green',
                }}>
                  <Text style={{
                    color: 'white',
                    fontWeight: '600',
                    fontSize: 20,
                  }}>
                    {event.price > 0 ? '$'+event.price : 'Free'}
                  </Text>
                </View>

              </View>

              {/* Location and Address */}
              <View style={{marginVertical: '1%', flexDirection: 'row', justifyContent: 'space-between'}}>
                <View>
                  <View>
                    <Text style={{ color: 'white', fontWeight: 'bold', paddingVertical: '0.5%', fontSize: 17}}>
                        {event.location}
                    </Text>
                  </View>
                  <View>
                    <Text style={{color: '#e3e3e3', fontWeight: '400'}}>
                        {event.address}
                    </Text>
                  </View>
                </View>
                
                <View style={{justifyContent:'center', alignItems: 'center'}}>
                    <Button
                      type="clear"
                      icon={{
                        name: "external-link",
                        type: "font-awesome",
                        size: 22,
                        color: "white",
                      }}
                      containerStyle= {{ backgroundColor: 'none' }}
                      onPress={() => {Linking.openURL("https://www.google.com/maps/search/?api=1&query=" + event.address)}}
                    />                  
                </View>

              </View>

              {/* Event Description */}
              <View style={{marginVertical: '4%'}}>
                <View>
                  <Text style={{
                    fontSize: 20,
                    fontWeight: "600",
                    flexWrap: "wrap",
                    color: "white",
                    paddingBottom: '1%',
                  }}>
                    About the event
                  </Text>
                </View>
                <View>
                  <Text style={{
                    color: '#e3e3e3',
                    fontWeight: '400',
                    fontSize: 17,
                  }}>
                    {event.description}
                  </Text>
                </View>
              </View>

              {/* Food */}
              {event.food && (
                <View style={{marginVertical: '2%'}}>
                <View>
                  <Text style={{fontSize: 20, fontWeight: "600", flexWrap: "wrap", color: "white", paddingBottom: '1%'}}>Food</Text>
                </View>
                <View>
                  <Text style={{color: '#e3e3e3', fontWeight: '400', fontSize: 17}}>{event.food}</Text>
                </View>
              </View>
              )}

              {/* Attire */}
              {event.attire && (
                <View style={{marginVertical: '2%'}}>
                <View>
                  <Text style={{fontSize: 20, fontWeight: "600", flexWrap: "wrap", color: "white", paddingBottom: '1%'}}>Attire</Text>
                </View>
                <View>
                  <Text style={{color: '#e3e3e3', fontWeight: '400', fontSize: 17}}>{event.attire}</Text>
                </View>
              </View>
              )}

              {/* toBring */}
              {event.toBring && (
                <View style={{marginVertical: '2%'}}>
                <View>
                  <Text style={{fontSize: 20, fontWeight: "600", flexWrap: "wrap", color: "white", paddingBottom: '1%'}}>What to Bring</Text>
                </View>
                <View>
                  <Text style={{color: '#e3e3e3', fontWeight: '400', fontSize: 17}}>{event.toBring}</Text>
                </View>
              </View>
              )}

              {/* Includes */}
              {event.includes && (
                <View style={{marginVertical: '2%'}}>
                <View>
                  <Text style={{fontSize: 20, fontWeight: "600", flexWrap: "wrap", color: "white", paddingBottom: '1%'}}>What's Included</Text>
                </View>
                <View>
                  <Text style={{color: '#e3e3e3', fontWeight: '400', fontSize: 17}}>{event.includes}</Text>
                </View>
              </View>
              )}

              {/* Transportation */}
              {event.transportation && (
                <View style={{marginVertical: '2%'}}>
                <View>
                  <Text style={{fontSize: 20, fontWeight: "600", flexWrap: "wrap", color: "white", paddingBottom: '1%'}}>Transportation</Text>
                </View>
                <View>
                  <Text style={{color: '#e3e3e3', fontWeight: '400', fontSize: 17}}>{event.transportation}</Text>
                </View>
              </View>
              )}

            </View>
          </LinearGradient>
    
        </ScrollView>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={{
          color: 'white', 
          fontWeight: '600', 
          fontSize: 19
        }}>
          {event.onCampus == true ? "On-Campus": "Off-Campus"}
        </Text>
        <Button
          buttonStyle={{
            backgroundColor: colours.primaryPurple,
            padding: 15,
            borderRadius: 15,
          }}
          title= {event.signUpLink == null ? "No Sign Up Required" : "Sign Up"}
          icon={{
            name: event.signUpLink == null  ? "" : "external-link",
            type: "font-awesome",
            size: 15,
            color: "white",
          }}
          // containerStyle= {{
          //   width: 150,
          //   marginHorizontal: 50,
          //   marginVertical: 10,
          // }}
          onPress={() => {
            Linking.openURL(event.signUpLink!);
            // navigation.navigate("EventSignUpView", {
            //   userType: route.params.userType,
            // });
          }}
        />
      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  big_container: {
    flex: 1,
    justifyContent: "space-between",
  },
  title: {
    fontSize: 25,
    fontWeight: "600",
    flexWrap: "wrap",
    color: "white",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
    paddingHorizontal: '2.3%',
    alignItems: "center",
    // backgroundColor: colours.secondaryGrey,
    backgroundColor: colours.secondaryPurple,
  },
  price: {
    backgroundColor: colours.primaryPurple,
    borderRadius: 25,
    width: '25%',
    justifyContent: 'center',
    alignItems: 'center',
  }
});

export default EventDetails;
