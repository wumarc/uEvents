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

            <View style={{flexDirection: 'row', backgroundColor: 'red'}}>
              <View style={{width: '50%'}}>
                <Button
                  style={{margin: 1, paddingVertical: '2%', paddingHorizontal: '20%'}}
                  buttonStyle={{width: '100%', borderRadius: 30}}
                  containerStyle={{backgroundColor: 'green'}}
                  color={colours.secondaryPurple}
                  title="Login"
                />
              </View>
              <View style={{width: '50%'}}>
                <Button
                  style={{margin: 1, paddingVertical: '2%', paddingHorizontal: '20%'}}
                  buttonStyle={{borderRadius: 30}}
                  color={colours.secondaryPurple}
                  title="Register"
                />
              </View>
            </View>
            <View style={{}}>
              <Button
                style={{
                  margin: 1,
                  paddingVertical: '2%', 
                  paddingHorizontal: '20%',
                  borderWidth: 2,
                  borderColor: colours.secondaryPurple,
                  borderRadius: 30,
                }}
                containerStyle={{backgroundColor: 'green'}}
                titleStyle={{color: colours.secondaryPurple, fontSize: 18, fontWeight: 'bold'}}
                color={'transparent'}
                title="Skip"
              />
            </View>
          </View>

        </View>

        {/* <View style={styles.form}>
          <View style={styles.innerForm}>
            {isSigningUp ? (<Signup setIsSigningUp={signInHandler} />) : (
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
