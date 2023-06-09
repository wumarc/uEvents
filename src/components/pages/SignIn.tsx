import { FC, useState } from "react";
import { auth } from "../../firebaseConfig";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { View, SafeAreaView } from "react-native";
import { Image } from "react-native-elements";
import Login from "./Login";
import Signup from "./Signup";
import { StyleSheet } from "react-native";

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
                source={require("../../../assets/uevents.png")}
          />
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
  },
  container: { // flexDirection is column by default
    flex: 1,
    paddingHorizontal: "8%",
    justifyContent: "space-evenly",
    alignItems: "center",
    paddingBottom: "20%",
  },
  imageSize: {
    width: 200,
    height: 200,
    borderRadius: 14
  },
  component: {
    width: "100%",
  }
});

export default SignIn;