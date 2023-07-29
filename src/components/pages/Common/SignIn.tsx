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

            <View style={{flexDirection: 'row', paddingHorizontal: '2.3%'}}>
              
              <View style={{flex: 1}}>
                <Button
                  style={{
                    margin: 1,
                    borderWidth: 2,
                    borderColor: colours.secondaryPurple,
                    borderRadius: 30,
                  }}
                  buttonStyle={{borderRadius: 30}}
                  titleStyle={{fontSize: '20%'}}
                  color={colours.secondaryPurple}
                  title="Login"
                  // onPress={() => navigator.navigate('Signup')}
                />
              </View>

              <View style={{flex: 1}}>
                <Button
                  style={{
                    margin: 1,
                    borderWidth: 2,
                    borderColor: colours.secondaryPurple,
                    borderRadius: 30,
                  }}
                  titleStyle={{fontSize: '20%'}}
                  buttonStyle={{borderRadius: 30}}
                  color={colours.secondaryPurple}
                  title="Register"
                  // onPress={() => navigator.navigate('Signup')}
                />
              </View>

            </View>

            <View style={{flexDirection: 'row', paddingHorizontal: '2.3%'}}>
              <Button
                style={{
                  margin: 1,
                  borderWidth: 2,
                  borderColor: colours.secondaryPurple,
                  borderRadius: 30,
                }}
                containerStyle={{flex: 1}}
                titleStyle={{color: colours.secondaryPurple, fontSize: 18, fontWeight: 'bold'}}
                color={'transparent'}
                title="Skip"
              />
            </View>

          </View>

        </View>

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
    paddingBottom: '10%',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '110%',
  },
});

export default SignIn;
