import { FC, useState } from "react";
import { auth } from "../../firebaseConfig";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { View, SafeAreaView, TouchableOpacity } from "react-native";
import { Image } from "react-native-elements";
import { StyleSheet } from "react-native";
import { colours } from "../subatoms/colours/colours";
import Login from "./Login";
import Signup from "./Signup";

const SignIn: FC = () => {

  const [isSigningUp, setIsSigningUp] = useState(false);

  const signInHandler = () => {
    setIsSigningUp(!isSigningUp);
  }

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <View>
          <Image
                style={{ width: 150, height: 150, borderRadius: 14}}
                source={require("../../../assets/uevents.png")}
          />
        </View>
        <View>
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
  container: {
    flexDirection: "column",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  button: {
    backgroundColor: colours.primary,
  },
  text: {
    color: "black",
    fontSize: 15,
  },
  textButton: {
    color: "blue",
    fontWeight: "bold",
    fontSize: 15,
  }
});

export default SignIn;