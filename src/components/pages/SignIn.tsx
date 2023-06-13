import { FC, useState } from "react";
import { auth } from "../../firebaseConfig";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { View, SafeAreaView } from "react-native";
import { Text } from "react-native-elements";
import { Image } from "react-native-elements";
import Login from "./Login";
import Signup from "./Signup";
import { StyleSheet } from "react-native";
import { colours } from "../subatoms/colours/colours";

const SignIn: FC = () => {

  const [isSigningUp, setIsSigningUp] = useState(false);

  const signInHandler = () => {
    setIsSigningUp(!isSigningUp);
  }

  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.container}>
        
        {/* Image */}
        <View>
          <Image
                style={styles.imageSize}
                source={require("../../assets/uevents_logo.png")}
          />
          <Text style={styles.appName}>uEvents</Text>
        </View>
        
        {/* Login | SignUp Component */}
        <View style={styles.component}>
          { isSigningUp ? 
            <Signup setIsSigningUp={signInHandler} /> 
            :
            <Login setIsSigningUp={signInHandler} /> 
          }
        </View>

      </View>
    </SafeAreaView>
  )

};

const styles = StyleSheet.create({
  screen: {
    flex: 1, // take the whole screen size
    backgroundColor: colours.secondaryPurple
  },
  container: { // flexDirection is column by default
    flex: 1,
    paddingHorizontal: "8%",
    justifyContent: "space-evenly",
    alignItems: "center",
    paddingBottom: "20%",
  },
  appName: {
    fontSize: 40,
    fontWeight: "500",
    color: colours.primaryPurple,
  },
  imageSize: {
    width: 150,
    height: 200,
    borderRadius: 14
  },
  component: {
    width: "100%",
  }
});

export default SignIn;