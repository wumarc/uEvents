import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import {
  EventObject,
  extractMonth,
  extractDay,
  extractDayOfWeek,
  extractTime,
} from "../../../utils/model/EventObject";
import { Button } from "react-native-elements";
import { colours } from "../../subatoms/colours";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "./main";
import { useStateWithFireStoreDocument } from "../../../utils/useStateWithFirebase";
import DateCard from "../../atoms/DateCard";
import { LinearGradient } from "expo-linear-gradient";
import { Image } from "@rneui/base";
import { Icon } from "@rneui/base";

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

      {/* Image */}
      <View>
        {/* <Image source={image} /> */}
      </View>

      {/* Title */}
      <View style={{marginVertical: 15}}>
        <Text style={{fontSize: 20, fontWeight: '600'}}>{event.name}</Text>
      </View>

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

      {/* Description */}
      <View style={styles.margin}>
        <Text style={{fontSize: 18, fontWeight: '600', marginBottom: 10}}>Description</Text>
        <Text style={{color: colours.textGrey, fontSize: 17}}>Join us for an unforgettable camping experience in the heart of [Location] from [Dates]. The Wildlife Wilderness Camping Retreat offers a blend of relaxation and outdoor adventure, catering to both seasoned explorers and those new to the wilderness. Activities include guided nature hikes, fishing, kayaking, campfire nights, stargazing, and outdoor cooking workshops. {event.description}</Text>
      </View>

      <View style={styles.margin}>
        <Text style={{fontSize: 18, fontWeight: '600'}}>Location</Text>
      </View>

      <View style={styles.margin}>
        <Text style={{fontSize: 18, fontWeight: '600'}}>Other Information</Text>
      </View>

      <View></View>
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

              
    //           <View
    //             style={{
    //               marginVertical: "1%",
    //               flexDirection: "row",
    //               justifyContent: "space-between",
    //               width: "100%",
    //             }}
    //           >
    //             <View style={{ width: "90%" }}>
    //               <View>
    //                 <Text
    //                   style={{
    //                     color: "white",
    //                     fontWeight: "bold",
    //                     paddingVertical: "0.5%",
    //                     fontSize: 17,
    //                   }}
    //                 >
    //                   {event.location}
    //                 </Text>
    //               </View>
    //               <View>
    //                 <Text
    //                   style={{
    //                     color: "#0645AD",
    //                     fontWeight: "400",
    //                     textDecorationLine: "underline",
    //                   }}
    //                 >
    //                   {event.address}
    //                 </Text>
    //               </View>
    //             </View>

    //             <View
    //               style={{ justifyContent: "center", alignItems: "center" }}
    //             >
    //               <Button
    //                 type="clear"
    //                 icon={{
    //                   name: "external-link",
    //                   type: "font-awesome",
    //                   size: 22,
    //                   color: "white",
    //                 }}
    //                 containerStyle={{ backgroundColor: "none" }}
    //                 onPress={() => {
    //                   Linking.openURL(
    //                     "https://www.google.com/maps/search/?api=1&query=" +
    //                       event.address
    //                   );
    //                 }}
    //               />
    //             </View>
    //           </View>

              
    //           <View style={{ marginVertical: "4%" }}>
    //             <View>
    //               <Text
    //                 style={{
    //                   fontSize: 20,
    //                   fontWeight: "600",
    //                   flexWrap: "wrap",
    //                   color: "white",
    //                   paddingBottom: "1%",
    //                 }}
    //               >
    //                 About the event
    //               </Text>
    //             </View>
    //             <View>
    //               <Text
    //                 style={{
    //                   color: "#e3e3e3",
    //                   fontWeight: "400",
    //                   fontSize: 17,
    //                 }}
    //               >
    //                 {event.description}
    //               </Text>
    //             </View>
    //           </View>

              
    //           {event.food && (
    //             <View style={{ marginVertical: "2%" }}>
    //               <View>
    //                 <Text
    //                   style={{
    //                     fontSize: 20,
    //                     fontWeight: "600",
    //                     flexWrap: "wrap",
    //                     color: "white",
    //                     paddingBottom: "1%",
    //                   }}
    //                 >
    //                   Food
    //                 </Text>
    //               </View>
    //               <View>
    //                 <Text
    //                   style={{
    //                     color: "#e3e3e3",
    //                     fontWeight: "400",
    //                     fontSize: 17,
    //                   }}
    //                 >
    //                   {event.food}
    //                 </Text>
    //               </View>
    //             </View>
    //           )}

    //           {/* Attire */}
    //           {event.attire && (
    //             <View style={{ marginVertical: "2%" }}>
    //               <View>
    //                 <Text
    //                   style={{
    //                     fontSize: 20,
    //                     fontWeight: "600",
    //                     flexWrap: "wrap",
    //                     color: "white",
    //                     paddingBottom: "1%",
    //                   }}
    //                 >
    //                   What to Wear
    //                 </Text>
    //               </View>
    //               <View>
    //                 <Text
    //                   style={{
    //                     color: "#e3e3e3",
    //                     fontWeight: "400",
    //                     fontSize: 17,
    //                   }}
    //                 >
    //                   {event.attire}
    //                 </Text>
    //               </View>
    //             </View>
    //           )}

              
    //           {event.toBring && (
    //             <View style={{ marginVertical: "2%" }}>
    //               <View>
    //                 <Text
    //                   style={{
    //                     fontSize: 20,
    //                     fontWeight: "600",
    //                     flexWrap: "wrap",
    //                     color: "white",
    //                     paddingBottom: "1%",
    //                   }}
    //                 >
    //                   What to Bring
    //                 </Text>
    //               </View>
    //               <View>
    //                 <Text
    //                   style={{
    //                     color: "#e3e3e3",
    //                     fontWeight: "400",
    //                     fontSize: 17,
    //                   }}
    //                 >
    //                   {event.toBring}
    //                 </Text>
    //               </View>
    //             </View>
    //           )}

              
    //           {event.includes && (
    //             <View style={{ marginVertical: "2%" }}>
    //               <View>
    //                 <Text
    //                   style={{
    //                     fontSize: 20,
    //                     fontWeight: "600",
    //                     flexWrap: "wrap",
    //                     color: "white",
    //                     paddingBottom: "1%",
    //                   }}
    //                 >
    //                   What's Included
    //                 </Text>
    //               </View>
    //               <View>
    //                 <Text
    //                   style={{
    //                     color: "#e3e3e3",
    //                     fontWeight: "400",
    //                     fontSize: 17,
    //                   }}
    //                 >
    //                   {event.includes}
    //                 </Text>
    //               </View>
    //             </View>
    //           )}

              
    //           {event.transportation && (
    //             <View style={{ marginVertical: "2%" }}>
    //               <View>
    //                 <Text
    //                   style={{
    //                     fontSize: 20,
    //                     fontWeight: "600",
    //                     flexWrap: "wrap",
    //                     color: "white",
    //                     paddingBottom: "1%",
    //                   }}
    //                 >
    //                   Transportation
    //                 </Text>
    //               </View>
    //               <View>
    //                 <Text
    //                   style={{
    //                     color: "#e3e3e3",
    //                     fontWeight: "400",
    //                     fontSize: 17,
    //                   }}
    //                 >
    //                   {event.transportation}
    //                 </Text>
    //               </View>
    //             </View>
    //           )}

              
    //           {event.originalLink && (
    //             <View style={{ marginVertical: "2%" }}>
    //               <View>
    //                 <Text
    //                   style={{
    //                     fontSize: 20,
    //                     fontWeight: "600",
    //                     flexWrap: "wrap",
    //                     color: "white",
    //                     paddingBottom: "1%",
    //                   }}
    //                 >
    //                   Original Link
    //                 </Text>
    //               </View>
    //               <View>
    //                 <Text
    //                   style={{
    //                     color: "blue",
    //                     fontWeight: "400",
    //                     fontSize: 12,
    //                     textDecorationLine: "underline",
    //                   }}
    //                   onPress={() => Linking.openURL(event.originalLink)}
    //                 >
    //                   {event.originalLink}
    //                 </Text>
    //               </View>
    //             </View>
    //           )}
    //         </View>
    //       </LinearGradient>
    //     </ScrollView>
    //   </View>

    //   <View style={styles.footer}>
    //     <Text
    //       style={{
    //         color: "white",
    //         fontWeight: "600",
    //         fontSize: 19,
    //       }}
    //     >
    //       {event.onCampus == true ? "On-Campus" : "Off-Campus"}
    //     </Text>
    //     <Button
    //       buttonStyle={{
    //         backgroundColor: colours.primaryPurple,
    //         padding: 15,
    //         borderRadius: 15,
    //       }}
    //       title={event.signUpLink == null ? "No Sign Up Required" : "Sign Up"}
    //       icon={{
    //         name: event.signUpLink == null ? "" : "external-link",
    //         type: "font-awesome",
    //         size: 15,
    //         color: "white",
    //       }}
    //       // containerStyle= {{
    //       //   width: 150,
    //       //   marginHorizontal: 50,
    //       //   marginVertical: 10,
    //       // }}
    //       onPress={() => {
    //         if (event.signUpLink != null) {
    //           Linking.openURL(event.signUpLink!);
    //         }
    //         // navigation.navigate("EventSignUpView", {
    //         //   userType: route.params.userType,
    //         // });
    //       }}
    //     />
    //   </View>
    // </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: "6%",
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
    paddingHorizontal: "2.3%",
    alignItems: "center",
    backgroundColor: colours.secondaryPurple,
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
