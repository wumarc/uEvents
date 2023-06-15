import { View, Text, StyleSheet, SafeAreaView } from "react-native";
import { Button } from "react-native-elements";
import { colours } from "../../subatoms/colours/colours";
import React from "react";
import { StackActions } from "@react-navigation/native";
import { Input } from "react-native-elements";

const EventSignUp = ({ navigation }: any) => {
  const [number, onChangeNumber] = React.useState("");

  return (
    <View>
      <View style={styles.margin}>
        <Text style={styles.rsvp}>Complete your RSVP {`\n`}</Text>

        <View>
          <Text style={styles.backgroundText}>
            This information will shared with the event organizer.
          </Text>
        </View>

        <View>
          <Text>Name</Text>
          <Input
            style={{}}
            onChangeText={onChangeNumber}
            value={"Jaycob Jacques"}
            placeholder="Full Name"
            keyboardType="numeric"
            maxLength={15}
            numberOfLines={6}
          />

          <Text>Dietary Restrictions </Text>
          <Input
            style={{}}
            // onChangeText={onChangeNumber}
            value={"Vegetarian"}
            placeholder="Diet"
            keyboardType="numeric"
            maxLength={15}
          />
        </View>

      </View>

      {/* confirm button */}
      <View style={styles.buttonContainer}>
        <Button
          // paddingRight: 20,
          buttonStyle={styles.buttonText}
          // shape="rounded-pill"
          title="Confirm"
          onPress={() => { navigation.dispatch(StackActions.pop(1)); }}
        />
      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  margin: {
    paddingTop: 20,
    paddingLeft: 20,
  },
  rsvp: {
    fontSize: 25,
    textAlign: "center",
  },
  buttonText: {
    backgroundColor: colours.primaryPurple,
  },
  buttonContainer: {
    alignSelf: "center",
    width: "90%",
    flexDirection: "column",
    marginVertical: 10,
  },
  backgroundText: {
    color: colours.darkGreyText,
  },
});

export default EventSignUp;
