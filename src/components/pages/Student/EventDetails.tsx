import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Linking,
  ImageBackground,
} from "react-native";
import { EventObject } from "../../../utils/model/EventObject";
import { Button } from "react-native-elements";
import { colours } from "../../subatoms/colours";
import { Subtitle, regularText } from "../../subatoms/Theme";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "./main";
import { useStateWithFireStoreDocument } from "../../../utils/useStateWithFirebase";
import { StatusBar } from "react-native";
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
            style={{ width: "100%", height: "100%" }}
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
              <View style={{flexDirection: 'row', marginVertical: '2%'}}>
                
                <View style={{ flexDirection: "row", width: '70%'}}>
                  <DateCard
                    line1={"29"} 
                    line2={"December"}
                    style={{width: '34%'}}
                  />
                  <Text>{"    "}</Text>
                  <DateCard
                    line1={"Tuesday"} 
                    line2={"10:00 PM - 11:00 PM"}
                    style={{width: '34%'}}
                  />
                </View>

                <View style={styles.onOffCampus}>
                  <Text style={{color: 'white', fontWeight: '600'}}>{event.onCampus == true ? "On-Campus": "Off-Campus"}</Text>
                </View>

              </View>

              {/* Location and Address */}
              <View style={{marginVertical: '1%'}}>
                <View>
                  <Text style={{
                    color: 'white', 
                    fontWeight: 'bold', 
                    paddingVertical: '0.5%', 
                    fontSize: 17
                  }}>
                      {event.location}
                  </Text>
                </View>
                <View>
                  <Text style={{
                    color: '#e3e3e3',
                    fontWeight: '400',
                  }}>
                      {event.address}
                  </Text>
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

              {/* Other Details */}
              <View>
                <View></View>
                <View></View>
              </View>

            </View>
          </LinearGradient>
    
        </ScrollView>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.price}>{event.price > 0 ? '$'+event.price : 'Free'}</Text>
        <Button
          buttonStyle={{
            backgroundColor: colours.primaryPurple,
            padding: 15,
            borderRadius: 15,
          }}
          title="View"
          icon={{
            name: "external-link",
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
            Linking.openURL("https://www.google.com");
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
    paddingHorizontal: 5,
    alignItems: "center",
    // backgroundColor: colours.secondaryGrey,
    backgroundColor: colours.secondaryPurple,
  },
  price: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
  },
  onOffCampus: {
    backgroundColor: colours.primaryPurple,
    borderRadius: 25,
    width: '30%', 
    justifyContent: 'center', 
    alignItems: 'center',
    
  }
});

export default EventDetails;
