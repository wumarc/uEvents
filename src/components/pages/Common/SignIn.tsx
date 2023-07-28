import { FC, useState } from "react";
import { View, SafeAreaView } from "react-native";
import { Text } from "react-native-elements";
import { Image } from "react-native-elements";
import Login from "./Login";
import Signup from "./Signup";
import { Button } from "@rneui/base";
import { StyleSheet } from "react-native";
import { colours } from "../../subatoms/colours";
// import LinearGradient from 'react-native-linear-gradient'

const SignIn: FC = () => {
  const [isSigningUp, setIsSigningUp] = useState(false);

  const signInHandler = () => {
    setIsSigningUp(!isSigningUp);
  };

  return (
    <SafeAreaView>

        <View>

          {/* Image */}
          <View style={styles.imageContainer}>
            <Image style={styles.image} source={require("../../../assets/welcome_image.jpg")} />
          </View>

          {/* Sign In Box */}
          <View style={styles.optionsContainer}>
            
            <View><Text style={{fontSize: 25}}>Start Socializing Now</Text></View>
            <View><Text>Join a community of students and meet new people!</Text></View>

            <View style={{flexDirection: 'row'}}>
              <Button
                style={{margin: 1, paddingVertical: '2%', paddingHorizontal: '20%'}}
                buttonStyle={{borderRadius: 30}}
                color={colours.secondaryPurple}
                title="Login"
              />
              <Button
                style={{margin: 1, paddingVertical: '2%', paddingHorizontal: '20%'}}
                buttonStyle={{borderRadius: 30}}
                color={colours.secondaryPurple}
                title="Register"
              />
            </View>
            <View style={{backgroundColor: 'blue'}}>
              <Button
                style={{margin: 1, paddingVertical: '2%', paddingHorizontal: '20%'}}
                buttonStyle={{borderRadius: 30}}
                color={colours.secondaryPurple}
                title="Skip"
              />
            </View>
          </View>

        </View>

        {/* uEvents Logo */}
        {/* <View style={styles.image}>
          <Image
            style={styles.imageSize}
            source={require("../../../assets/uevents_logo.png")}
          />
          <Text style={styles.appName}>{isSigningUp ? "Create an account" : "Login"}</Text>
        </View> */}

        {/* Login | SignUp Component */}
        {/* <View style={styles.form}>
          <View style={styles.innerForm}>
            {isSigningUp ? (
              <Signup setIsSigningUp={signInHandler} />
            ) : (
              <Login setIsSigningUp={signInHandler} />
            )}
          </View>
        </View> */}
    </SafeAreaView> 
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    width: '100%',
    height: '60%',
  },
  optionsContainer: {
    width: '100%',
    height: '40%',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    backgroundColor: 'white',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '110%',
  },
});

export default SignIn;
