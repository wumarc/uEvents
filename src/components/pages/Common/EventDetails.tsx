import { View, Text, StyleSheet, ScrollView, Linking, ImageBackground, TouchableOpacity } from "react-native";
import { EventObject, getTimeInAMPM } from "../../../utils/model/EventObject";
import { colours, fonts, spacing, windowHeight, buttons } from "../../subatoms/Theme";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useStateWithFireStoreDocument } from "../../../utils/useStateWithFirebase";
import { Button } from "@rneui/base";
import { Icon } from "react-native-elements";
import { Organizer } from "../../../utils/model/Organizer";
import { useState } from "react";
import { Loading } from "./Loading";
import { Badge } from "react-native-elements";
import FirebaseImage from "../../organisms/FirebaseImage";
import { getNextDate } from "../../../utils/util";
import { Platform } from "react-native";
import { RootStackParamList } from "../../../../main";
import { EmojiImage } from "../../organisms/EmojiImage";
import { customLogEvent } from "../../../utils/analytics";
import { useUser } from "../../../utils/model/User";

type props = NativeStackScreenProps<RootStackParamList, "EventDetailsView">;
// To access the type of user, use route.params.userType

const EventDetails = ({ route, navigation }: props) => {
  // Fake
  let isFake = route.params.fake ?? false;
  let dbPath = isFake ? "events-test" : "events";

  // States
  const [loading3, userData, setUserData, isLogged, isStudent, isOrganizer, isAdmin, isBeta] = useUser();
  const [loading, event, set] = useStateWithFireStoreDocument<EventObject>(dbPath, route.params.eventID);
  const [loading2, organizer, set2] = useStateWithFireStoreDocument<Organizer>("users", route.params.organizerID);
  const [backupUrl, setBackupUrl] = useState<string | undefined>(undefined);

  // Loading
  if (loading || loading2 || loading3) {
    return <Loading />;
  }

  let today = route.params.today ?? new Date();

  let [startTime, endTime] = getNextDate(event, today);

  let dateString = startTime.toDateString();
  if (endTime && endTime.getTime() - startTime.getTime() > 24 * 60 * 60 * 1000) {
    dateString += " - " + endTime.toDateString();
  }

  let timeString = "";
  if (event.allDay) {
    timeString = "All Day";
  } else {
    if (endTime) {
      timeString = getTimeInAMPM(startTime) + " - " + getTimeInAMPM(endTime);
    } else {
      timeString = getTimeInAMPM(startTime);
    }
  }

  return (
    <View style={{ flex: 1, backgroundColor: colours.white }}>
      <ScrollView style={{ paddingHorizontal: spacing.horizontalMargin1, paddingBottom: 100 }} showsVerticalScrollIndicator={false}>
        {/* Image */}
        <EmojiImage emoji={event.emoji} style={{ justifyContent: "center", width: "100%", height: Platform.OS != "web" ? windowHeight * 0.18 : 200 }} />

        {/* Title */}
        <View style={{ marginVertical: 5 }}>
          <Text style={{ ...fonts.title2, textAlign: "center" }}>{event.name}</Text>
        </View>

        {/* Date and time */}
        <View style={{ ...spacing.verticalMargin1 }}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <View style={{ height: 30, width: 30 }}>
              <EmojiImage emoji="📅" />
            </View>
            {/* {relativeDate(event.startTime)} */}
            {/* Return the startTime in the format of day of the week month day */}
            <Text style={fonts.regular}>{dateString}</Text>
          </View>

          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <View style={{ height: 30, width: 30 }}>
              <EmojiImage emoji="🕐" />
            </View>
            <Text style={fonts.regular}>{timeString}</Text>
          </View>

          {event.recurrenceType == "Weekly" && (
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <View style={{ height: 30, width: 30 }}>
                <EmojiImage emoji="🔁" />
              </View>
              <Text style={fonts.regular}>Every week {event.recurrenceEnd ? "until " + event.recurrenceEnd.toDate().toDateString() : ""}</Text>
            </View>
          )}
        </View>

        {/* Description */}
        <View style={spacing.verticalMargin1}>
          <View style={{ flexDirection: "row", alignItems: "center", ...spacing.bottomMargin1 }}>
            <View style={{ height: 30, width: 30 }}>
              <EmojiImage emoji="📝" />
            </View>
            <Text style={{ ...fonts.title2 }}>Description</Text>
          </View>
          <Text style={fonts.regular}>{event.description}</Text>
        </View>

        {/* Location */}
        <View style={spacing.verticalMargin1}>
          <View style={{ flexDirection: "row", alignItems: "center", ...spacing.bottomMargin1 }}>
            <View style={{ height: 30, width: 30 }}>
              <EmojiImage emoji="📍" />
            </View>
            <Text style={{ ...fonts.title2 }}>Location</Text>
          </View>

          {event.address == "" ? (
            <Text style={{ ...fonts.regular, textAlign: "center" }}>To be determined</Text>
          ) : (
            <ImageBackground source={require("./map.png")} style={{ flex: 1 }} imageStyle={{ borderRadius: 15, opacity: 0.3 }}>
              <View style={{ borderColor: colours.primaryGrey, borderRadius: 15, justifyContent: "center", alignItems: "center", padding: "3%" }}>
                <Text style={{ ...fonts.title3, textAlign: "center" }}>{event.location}</Text>
                {event.roomNumber && <Text style={{ ...fonts.title3, textAlign: "center" }}>Room: {event.roomNumber}</Text>}
                <Text style={{ ...fonts.small, textAlign: "center" }}>{event.address}</Text>
                <Button
                  title={"Google Maps"}
                  buttonStyle={{ ...buttons.button1, marginTop: "3%", backgroundColor: "#4285F4" }}
                  titleStyle={{ fontSize: 13, fontWeight: "500", color: colours.white }}
                  onPress={() => {
                    Linking.openURL("https://www.google.com/maps/search/?api=1&query=" + event.address);
                  }}
                />
              </View>
            </ImageBackground>
          )}
        </View>

        {/* Organizer */}
        {event.organizer ? (
          <View style={spacing.verticalMargin1}>
            <View style={{ flexDirection: "row", alignItems: "center", ...spacing.bottomMargin1 }}>
              <View style={{ height: 30, width: 30 }}>
                <EmojiImage emoji="🏠" />
              </View>
              <View style={{}}>
                <Text style={{ ...fonts.title2 }}>Organizer</Text>
              </View>
            </View>

            <TouchableOpacity
              disabled={event.organizerType == "Manually Added"}
              onPress={() => {
                customLogEvent("Clicked_on_organizer_from_event", { eventId: event.id, organizer: event.organizer });
                navigation.navigate("EventOrganizerView", { organizerID: event.organizer });
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  borderWidth: event.organizerType == "Organizer Added" ? 1 : 0,
                  borderColor: colours.grey,
                  opacity: 0.7,
                  padding: "3.5%",
                  backgroundColor: event.organizerType == "Organizer Added" ? colours.primaryGrey : colours.white,
                  borderRadius: 10,
                }}
              >
                {/* Icon / name */}
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  {event.organizerType == "Organizer Added" && (
                    <FirebaseImage style={{ width: 20, height: 20, borderRadius: 50, marginRight: 5 }} id={event.organizer} />
                  )}
                  <Text
                    style={fonts.title2}
                    disabled={event.organizerType == "Manually Added"}
                    onPress={() => {
                      navigation.navigate("EventOrganizerView", { organizerID: event.organizer });
                    }}
                  >
                    {event.organizerType == "Manually Added" ? event.organizer : <Text style={fonts.title2}>{organizer.name}</Text>}
                  </Text>
                </View>
                {event.organizerType == "Organizer Added" && (
                  <View>
                    <Icon name="chevron-right" size={20} />
                  </View>
                )}
              </View>
            </TouchableOpacity>
          </View>
        ) : (
          <></>
        )}

        {/* Tags */}
        {/* <View style={spacing.verticalMargin1}>
          <Text style={{ ...fonts.title2, ...spacing.bottomMargin1 }}>🏷️ Tags</Text>
          <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
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
                  textStyle={{ fontSize: 13, color: colours.grey }}
                  containerStyle={{ marginVertical: 2 }}
                />
              );
            })}
          </View>
        </View> */}

        {event.originalLink && (
          <View style={spacing.verticalMargin1}>
            <Text style={{ ...fonts.title2, ...spacing.bottomMargin1 }}>🔗 Source Link</Text>
            <Text style={{ ...fonts.small, textDecorationLine: "underline" }} onPress={() => Linking.openURL(event.originalLink)}>
              {event.originalLink}
            </Text>
          </View>
        )}

        {/* <BottomSheet 
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
        </BottomSheet> */}
      </ScrollView>

      <View style={styles.footer}>
        <Text style={fonts.title2}>{event.priceMin ? (event.priceMax ? "$" + event.priceMin + "- $" + event.priceMax : "$" + event.priceMin) : "Free"}</Text>
        <Button
          buttonStyle={{ backgroundColor: colours.purple, padding: 10, borderRadius: 10 }}
          title={event.signUpLink == null || event.signUpLink == "" ? "No Signup Required" : "Sign Up"}
          disabled={event.signUpLink == null || event.signUpLink == ""}
          titleStyle={{ fontSize: 15, fontWeight: "600" }}
          onPress={() => {
            customLogEvent("Clicked_on_signup_link", { eventId: event.id });
            if (event.signUpLink != null && event.signUpLink != "") {
              // Add tickets to user
              if (isLogged && setUserData && userData) {
                if (isStudent) {
                  setUserData({ ...userData, tickets: [...(userData.tickets ?? []), event.id] });
                } else {
                  setUserData({ ...userData, tickets: [...(userData.tickets ?? []), event.id] });
                }
              }
              Linking.openURL(event.signUpLink!);
            }
          }}
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
    paddingHorizontal: "5%",
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: colours.primaryGrey,
    backgroundColor: colours.white,
  },
});

export default EventDetails;
