import { FC, useState } from "react";
import { View, SafeAreaView } from "react-native";
import { Text } from "react-native-elements";
import { Image } from "react-native-elements";
import { Button } from "@rneui/base";
import { StyleSheet } from "react-native";
import { colours } from "../../subatoms/colours";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";

const Stack = createNativeStackNavigator();

const SignIn: FC = () => {

  return (
     <NavigationContainer>
        <Stack.Navigator initialRouteName="Welcome">
          <Stack.Screen 
            name="Welcome" 
            component={WelcomePage}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen 
            name="Login" 
            component={Login}
            options={{
              headerTintColor: colours.primaryPurple,
              headerBackTitleVisible: false,
            }}
          />
          <Stack.Screen 
            name="Signup"
            component={Signup}
            options={{
              headerTintColor: colours.primaryPurple,
              headerBackTitleVisible: false,
              headerTitle: 'Register',
            }}
          />
        </Stack.Navigator>
     </NavigationContainer>
  );

};

const WelcomePage: FC = ({navigation}: any) => {

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
                titleStyle={{fontSize: 18}}
                color={colours.secondaryPurple}
                title="Login"
                onPress={() => navigation.navigate('Login')}
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
                titleStyle={{fontSize: 18}}
                buttonStyle={{borderRadius: 30}}
                color={colours.secondaryPurple}
                title="Register"
                onPress={() => navigation.navigate('Signup')}
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
  )

}

const Login: FC = () => {

  return (
    <View>

    </View>
  )

}

const Signup: FC = () => {

  return (
    <View>

    </View>
  )

}

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
