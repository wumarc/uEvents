import { FC, useState } from "react";
import { View, SafeAreaView } from "react-native";
import { Text } from "react-native-elements";
import { Image } from "react-native-elements";
import Login from "./Login";
import Signup from "./Signup";
import { StyleSheet } from "react-native";
import { colours } from "../../subatoms/colours";
// import LinearGradient from 'react-native-linear-gradient'

const SignIn: FC = () => {
  const [isSigningUp, setIsSigningUp] = useState(false);

  const signInHandler = () => {
    setIsSigningUp(!isSigningUp);
  };

  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.container}>

        {/* uEvents Logo */}
        <View style={styles.image}>
          <Image
            style={styles.imageSize}
            source={require("../../../assets/uevents_logo.png")}
          />
          <Text style={styles.appName}>uEvents</Text>
        </View>

        {/* Login | SignUp Component */}
        <View style={styles.form}>
          <View style={styles.innerForm}>
            {isSigningUp ? (
              <Signup setIsSigningUp={signInHandler} />
            ) : (
              <Login setIsSigningUp={signInHandler} />
            )}
          </View>
        </View>
      </View>
    </SafeAreaView> 
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1, // take the whole screen size
    backgroundColor: colours.secondaryPurple,
  },
  container: {
    // flexDirection is column by default
    flex: 1,
    // paddingHorizontal: "3%",
    justifyContent: "space-evenly",
    alignItems: "center",
    paddingBottom: "10%",
  },
  image: {
    // height: "40%",
  },
  form: {
    // height: "65%",
    width: "100%"
  },
  innerForm: {
    width: "95%",
    marginHorizontal: "5%",
    marginVertical: "2%",
  },
  appName: {
    fontSize: 40,
    fontWeight: "500",
    color: colours.primaryPurple,
  },
  imageSize: {
    width: 150,
    height: 200,
    borderRadius: 14,
  },
  linearGradient: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    height: 200,
    width: 350,
  }
});

export default SignIn;
