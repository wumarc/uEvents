import { View, Text, StyleSheet, ScrollView, ActivityIndicator, Linking } from "react-native";
import { EventObject } from "../../../utils/model/EventObject";
import { colours } from "../../subatoms/colours";
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

      <ScrollView style={{paddingHorizontal: '5%'}}>

        {/* Image */}
        <View style={{justifyContent: 'center', width: '100%', height: '35%'}}>
          <Image
            source={require('./1F3A5_color.png')}
            style={{width: "100%", height: "100%"}}
            resizeMode="contain"
          />
        </View>

        {/* Title */}
        <View style={{marginVertical: 15}}>
          <Text style={{fontSize: 20, fontWeight: '600', color: colours.titleGrey}}>{event.name}</Text>
        </View>

        {/* Date and location */}
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
          </View>
        </View>

        {/* <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Icon
            name='location-outline'
            type='ionicon'
            color= {colours.textGrey}
          />
          <Text>{event.location}</Text>
        </View> */}

        {/* Description */}
        <View style={styles.margin}>
          <Text style={{fontSize: 18, fontWeight: '600', marginBottom: 10, color: colours.titleGrey}}>Description</Text>
          <Text style={{color: colours.textGrey, fontSize: 17}}>Join us for an unforgettable camping experience in the heart of [Location] from [Dates]. The Wildlife Wilderness Camping Retreat offers a blend of relaxation and outdoor adventure, catering to both seasoned explorers and those new to the wilderness. Activities include guided nature hikes, fishing, kayaking, campfire nights, stargazing, and outdoor cooking workshops. {event.description}</Text>
        </View>

        <View style={styles.margin}>
          <Text style={{fontSize: 18, fontWeight: '600', color: colours.titleGrey}}>Location</Text>
        </View>

        <View style={styles.margin}>
          <Text style={{fontSize: 18, fontWeight: '600', color: colours.titleGrey}}>Other Information</Text>
        </View>

        <View></View>

      </ScrollView>

      <View style={styles.footer}>
        <Text style={{color: colours.textGrey, fontWeight: "600", fontSize: 15}}>
          {event.onCampus == true ? "On-Campus" : "Off-Campus"}
        </Text>
        <Button
          buttonStyle={{backgroundColor: colours.secondaryPurple, padding: 10, borderRadius: 10}}
          title={event.signUpLink == null ? "No Signup" : "Sign Up"}
          disabled={event.signUpLink == null}
          icon={{
            name: event.signUpLink == null ? "" : "external-link",
            type: "font-awesome",
            size: 15,
            color: "white",
          }}
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

    // <View style={styles.big_container}>
    //   <View style={{ flex: 1 }}>
    //     <ScrollView style={{ backgroundColor: colours.secondaryPurple }}>
          
    //       <ImageBackground
    //         style={{ height: 300, width: "100%", flexGrow: 1 }}
    //         source={image}
    //       >
    //         <LinearGradient
    //           colors={["#00000000", "#6B556B"]}
    //           style={{
    //             height: "100%",
    //             width: "100%",
    //             justifyContent: "flex-end",
    //           }}
    //         >
              
    //           <View style={{ marginVertical: "2%", paddingHorizontal: "2.3%" }}>
    //             <Text style={{ ...styles.title, paddingVertical: "0.5%" }}>
    //               {event.name}
    //             </Text>
    //             <Text
    //               style={{
    //                 color: "#e3e3e3",
    //                 fontSize: 16,
    //               }}
    //               onPress={() => {navigation.navigate("EventOrganizerView")}}
    //             >
    //               {event.organizer}
    //             </Text>
    //           </View>
    //         </LinearGradient>
    //       </ImageBackground>

    //       <LinearGradient
    //         colors={["#6B556B", colours.secondaryPurple]}
    //         style={{ height: "100%", flexGrow: 1, paddingHorizontal: "2.3%" }}
    //       >
    //         <View>
              
    //           <View
    //             style={{
    //               flexDirection: "row",
    //               marginVertical: "2%",
    //               justifyContent: "space-between",
    //             }}
    //           >
    //             <View style={{ flexDirection: "row", width: "70%" }}>
    //               <DateCard
    //                 line1={extractDay(event.startTime)}
    //                 line2={extractMonth(event.startTime)}
    //                 style={{ width: "34%" }}
    //               />
    //               <Text>{"    "}</Text>
    //               <DateCard
    //                 line1={extractDayOfWeek(event.startTime)}
    //                 line2={
    //                   extractTime(event.startTime) +
    //                   " - " +
    //                   (event.endTime ? extractTime(event.endTime!) : "End")
    //                 }
    //                 style={{ width: "34%" }}
    //               />
    //             </View>

    //             <View
    //               style={{
    //                 ...styles.price,
    //                 backgroundColor: event.priceMin
    //                   ? colours.primaryPurple
    //                   : "green",
    //               }}
    //             >
    //               <Text
    //                 style={{
    //                   color: "white",
    //                   fontWeight: "600",
    //                   fontSize: 20,
    //                 }}
    //               >
    //                 {event.priceMin
    //                   ? event.priceMax
    //                     ? "$" + event.priceMin + "- $" + event.priceMax
    //                     : "$" + event.priceMin
    //                   : "Free"}
    //               </Text>
    //             </View>
    //           </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 25,
    fontWeight: "600",
    flexWrap: "wrap",
    color: "white",
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
  price: {
    backgroundColor: colours.primaryPurple,
    borderRadius: 25,
    width: "25%",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default EventDetails;
