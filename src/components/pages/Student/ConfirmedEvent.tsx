import { View, Image, Text, StyleSheet } from "react-native";
import { colours } from "../../subatoms/colours/colours";
import Event from "../../organisms/Event";

const ConfirmedEvent = ({ navigation }: any) => {
  return (
    <View>
      <Text style={styles.baseText}>
        <Text style={styles.confirmedFontSize}>
          {" "}
          CONFIRMED (New Font) {`\n`}{" "}
        </Text>
        <Text style={styles.regularFontSize}> Enjoy Your Event! </Text>
      </Text>
      <View style={styles.gif}>
        <Image
          style={{ width: 200, height: 200 }}
          source={require("../../../assets/animations/ticket.gif")}
        />
      </View>
      <Text style={styles.confirmedFontSize}> CONFIRMED (Old Font) {`\n`}</Text>
      <Text style={styles.regularFontSize}>
        {" "}
        Your have confirmed your ticket for "" event, on the day of "June 26th"!{" "}
      </Text>

      <View style={styles.bottom}>
        <Image
          style={{ width: 120, height: 120 }}
          // source={require('../../../assets/uevents.png')}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  baseText: {
    // fontFamily: colours.fontFamily,
    paddingTop: 60,
  },
  confirmedFontSize: {
    fontSize: 30,
    textAlign: "center",
  },
  regularFontSize: {
    fontSize: 15,
    textAlign: "center",
  },
  bottom: {
    flex: 1,
    justifyContent: "center",
    // marginBottom: 3,
    // paddingLeft: 50,
    alignItems: "center",
    paddingTop: 280,
    // width: 150,
    // height: 150
  },
  gif: {
    justifyContent: "center",
    alignSelf: "center",
  },

  //https://medium.com/fantageek/position-element-at-the-bottom-of-the-screen-using-flexbox-in-react-native-a00b3790ca42
});

export default ConfirmedEvent;
