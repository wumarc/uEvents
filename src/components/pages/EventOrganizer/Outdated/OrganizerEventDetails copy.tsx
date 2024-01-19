import { View, Text, StyleSheet, ScrollView, ActivityIndicator, Linking } from "react-native";
import { EventObject } from "../../../../utils/model/EventObject";
import { colours, fonts, spacing, windowHeight, windowWidth, buttons } from "../../../subatoms/Theme";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useStateWithFireStoreDocument } from "../../../../utils/useStateWithFirebase";
import { Button } from "@rneui/base";
import { Icon } from "react-native-elements";
import { RootStackParamList } from "../../../../../main";

type props = NativeStackScreenProps<RootStackParamList, "OrganizerEventDetails">;

const OrganizerEventDetails = ({ route, navigation }: props) => {
  const [loading, event, set] = useStateWithFireStoreDocument<EventObject>("events", route.params.eventID);

  if (loading) {
    return <ActivityIndicator />;
  }

  return (
    <View style={{ flex: 1, backgroundColor: colours.white }}>
      <ScrollView style={{ paddingHorizontal: spacing.horizontalMargin1, paddingBottom: 100 }} showsVerticalScrollIndicator={false}>
        {/* Image */}
        <View style={{ justifyContent: "center", width: "100%", height: windowHeight * 0.18 }}>
          {/* <Image source={require('./1F3A5_color.png')}
            style={{width: '100%', height: '100%'}}
            resizeMode="contain"
          /> */}
        </View>

        {/* Title */}
        <View style={{ marginVertical: 5 }}>
          <Text style={fonts.title2}>{event.name}</Text>
        </View>

        {/* Date */}
        <View style={{ flexDirection: "row", ...spacing.verticalMargin1 }}>
          <View style={{ flexDirection: "row", alignItems: "center", width: windowWidth * 0.45 }}>
            <Text style={{ ...fonts.regular, marginLeft: windowWidth * 0.01 }}>📅 Tomorrow</Text>
          </View>

          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text style={{ ...fonts.regular, marginLeft: windowWidth * 0.01 }}>🕑 08:00 PM</Text>
            {/* extractTime(event.startTime) + " - " + (event.endTime ? extractTime(event.endTime!) : "End") */}
          </View>
        </View>

        {/* Description */}
        <View style={spacing.verticalMargin1}>
          <Text style={{ ...fonts.title2, ...spacing.bottomMargin1 }}>ℹ️ Description</Text>
          <Text style={fonts.regular}>{event.description}</Text>
        </View>

        {/* Location */}
        <View style={spacing.verticalMargin1}>
          <Text style={{ ...fonts.title2, ...spacing.bottomMargin1 }}>📍 Location</Text>
          <View style={{ borderWidth: 2, borderColor: colours.primaryGrey, borderRadius: 15, justifyContent: "center", alignItems: "center", padding: "3%" }}>
            <Text style={fonts.title3}>{event.location}</Text>
            <Text style={fonts.small}>{event.address}</Text>
            <Button
              title={"Open on Google Maps"}
              buttonStyle={{ ...buttons.button1, marginTop: "3%" }}
              titleStyle={{ fontSize: 13, fontWeight: "500", color: colours.white }}
              onPress={() => {
                Linking.openURL("https://www.google.com/maps/search/?api=1&query=" + event.address);
              }}
            />
          </View>
        </View>

        {/* Other information */}
        {/* <View style={spacing.verticalMargin1}>
          <Text style={{...fonts.title2, ...spacing.bottomMargin1}}>📝 Other Information</Text>
          <Text style={fonts.regular}>If you are vegetarian, please let us know by sending us an email</Text>
        </View> */}

        {/* Organizer */}
        <View style={spacing.verticalMargin1}>
          <Text style={{ ...fonts.title2, ...spacing.bottomMargin1 }}>🏠 Organizer</Text>

          <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
            {/* Icon / name */}
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Icon name="calendar-outline" type="ionicon" color={colours.grey} />
              <Text style={fonts.regular}>{event.organizer}</Text>
            </View>
          </View>
        </View>

        <View style={spacing.verticalMargin1}>
          <Text style={{ ...fonts.title2, ...spacing.bottomMargin1 }}>🔗 Source</Text>
          <Text style={{ ...fonts.small, textDecorationLine: "underline" }} onPress={() => Linking.openURL(event.originalLink)}>
            {event.originalLink}
          </Text>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <Text style={fonts.title2}>{event.priceMin ? (event.priceMax ? "$" + event.priceMin + "- $" + event.priceMax : "$" + event.priceMin) : "Free"}</Text>
        <Button
          buttonStyle={{ backgroundColor: colours.purple, padding: "10%", paddingHorizontal: "8%", borderRadius: 10 }}
          title={"Edit"}
          titleStyle={{ fontSize: 20, fontWeight: "600" }}
          onPress={() => {
            navigation.navigate("Step0", { eventID: route.params.eventID, useDefault: false, organizerName: undefined });
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

export default OrganizerEventDetails;
