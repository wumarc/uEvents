import { View, Text, StyleSheet, ScrollView, ActivityIndicator, Linking } from "react-native";
import { EventObject } from "../../../utils/model/EventObject";
import { colours, fonts, spacing, windowHeight, windowWidth, buttons } from "../../subatoms/Theme";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "./main";
import { useStateWithFireStoreDocument } from "../../../utils/useStateWithFirebase";
import { Image, Icon, Button } from "@rneui/base";
import { Input } from "react-native-elements";

type props = NativeStackScreenProps<RootStackParamList, "OrganizerEventDetails">;
// To access the type of user, use route.params.userType

const OrganizerEventDetails = ({ route, navigation }: props) => {
  
  const [loading, event, set] = useStateWithFireStoreDocument<EventObject>(
    "events",
    route.params.eventID
  );

  if (loading) {
    return <ActivityIndicator />;
  }

  return (
    <View style={{flex: 1, backgroundColor: colours.white}}>

      <ScrollView style={{paddingHorizontal: spacing.horizontalMargin1, paddingBottom: 100}} showsVerticalScrollIndicator={false}>

        <View style={spacing.verticalMargin1}>

          {/* Name */}
          <Input
            label="Event Name"
            selectionColor={colours.purple}
            inputContainerStyle={{borderColor: colours.grey,borderWidth: 1,paddingVertical: 4,paddingHorizontal: 8,borderRadius: 6}}
            // leftIcon={<Icon name="event-note" type="material-icon" color={colours.grey} />}
            containerStyle={{ paddingHorizontal: 0}}
            onChange={(e) => set({...event, name: e.nativeEvent.text})}
            maxLength={35}
            defaultValue={event.name}
          />
          
          {/* Emoji */}
          <Input
            label="Emoji"
            selectionColor={colours.purple}
            inputContainerStyle={{borderColor: colours.grey,borderWidth: 1,paddingVertical: 4,paddingHorizontal: 8,borderRadius: 6}}
            // leftIcon={<Icon name="sticker-emoji" type="material-community" color={colours.grey} />}
            containerStyle={{ paddingHorizontal: 0}}
            onChange={(e) => set({...event, emoji: e.nativeEvent.text})}
            maxLength={8}
            defaultValue={event.emoji}
          />

          {/* Location */}
          <Input
            label="Location"
            selectionColor={colours.purple}
            inputContainerStyle={{borderColor: colours.grey,borderWidth: 1,paddingVertical: 4,paddingHorizontal: 8,borderRadius: 6}}
            containerStyle={{ paddingHorizontal: 0}}
            onChange={(e) => set({...event, location: e.nativeEvent.text})}
            maxLength={8}
            defaultValue={event.location}
          />

          {/* Date, time, recurrence */}
          <View style={{flexDirection: "row"}}>
            <Input
              label="Date and time"
              // leftIcon={<Icon name="date-range" type="ionicons" color={colours.grey} />}
              selectionColor={colours.purple}
              // inputStyle={{height: windowHeight*0.08}}
              inputContainerStyle={{
                borderColor: colours.grey,
                borderWidth: 1,
                paddingVertical: 2,
                borderRadius: 6,
              }}
              containerStyle={{paddingHorizontal: 0}}
            />
          </View>

          {/* Description */}
          <Input
            label="Description"
            selectionColor={colours.purple}
            multiline={true}
            maxLength={400}
            inputContainerStyle={{borderColor: colours.grey,borderWidth: 1,paddingVertical: 4,paddingHorizontal: 8,borderRadius: 6}}
            onChange={(e) => set({ ...event, description: e.nativeEvent.text })}
            defaultValue={event.description}
            containerStyle={{ paddingHorizontal: 0}}
          />

          {/* Price */}
          <View style={{flexDirection: "row"}}>
            <Input
              label="Price"
              defaultValue={event.priceMin.toString()}
              onChange={(e) => set({...event, priceMin: Number(e.nativeEvent.text)})}
              selectionColor={colours.purple}
              inputContainerStyle={{borderColor: colours.grey,borderWidth: 1,paddingVertical: 4,paddingHorizontal: 8,borderRadius: 6}}
              containerStyle={{paddingHorizontal: 0, flex:1}}
              maxLength={4}
            />
            <Text> </Text>
            <Input
              label="Max Price (Optional)"
              defaultValue={event.priceMax?.toString()}
              onChange={(e) => set({...event, priceMax: Number(e.nativeEvent.text)})}
              selectionColor={colours.purple}
              inputContainerStyle={{borderColor: colours.grey,borderWidth: 1,paddingVertical: 4,paddingHorizontal: 8,borderRadius: 6}}
              containerStyle={{paddingHorizontal: 0, flex:1}}
              maxLength={4}
            />
          </View>

          {/* Sign up link */}
          <Input
            label="Sign up link"
            multiline={true}
            defaultValue={event.signUpLink}
            onChange={(e) => set({ ...event, signUpLink: e.nativeEvent.text })}
            selectionColor={colours.purple}
            inputContainerStyle={{borderColor: colours.grey,borderWidth: 1,paddingVertical: 4,paddingHorizontal: 8,borderRadius: 6}}
            containerStyle={{paddingHorizontal: 0}}
          />

          {/* Tags */}
          <View style={{flexDirection: "row"}}>
            <Input
              label="Tags"
              selectionColor={colours.purple}
              inputContainerStyle={{borderColor: colours.grey,borderWidth: 1,paddingVertical: 4,paddingHorizontal: 8,borderRadius: 6}}
              containerStyle={{paddingHorizontal: 0}}
            />
          </View>

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
          buttonStyle={{backgroundColor: colours.purple, padding: '5%', paddingHorizontal: '4%', borderRadius: 10}}
          title={"Save Changes"}
          titleStyle={{ fontSize: 20, fontWeight: "600"}}
          onPress={() => navigation.pop()}
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

export default OrganizerEventDetails;