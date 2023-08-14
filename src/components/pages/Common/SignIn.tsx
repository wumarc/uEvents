import { FC, useState } from "react";
import { View, SafeAreaView, Linking, StyleSheet } from "react-native";
import { Text, Input, Image } from "react-native-elements";
import { BottomSheet } from "@rneui/base";
import { Button } from "@rneui/base";
import { colours, fonts } from "../../subatoms/Theme";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { auth } from "../../../firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { addDocumentToCollection } from "../../../utils/useStateWithFirebase";
import { defaultStudent, Student } from "../../../utils/model/Student";
import { getFirebaseUserIDOrEmpty } from "../../../utils/util";
import { defaultOrganizer, Organizer } from "../../../utils/model/Organizer";
import { CheckBox } from "@rneui/themed";
import CustomButton from "../../atoms/CustomButton";
import CustomInput from "../../atoms/CustomInput";

// Accepted universities
const universities = ["@uottawa.ca"];
const Stack = createNativeStackNavigator();

const SignIn: FC = () => {

  const [isSigningUp, setIsSigningUp] = useState(false);
  const signInHandler = () => setIsSigningUp(!isSigningUp);

  return (
     <NavigationContainer>
        <Stack.Navigator 
          initialRouteName="Welcome"
          screenOptions={{
            headerTitleAlign: 'center',
            animation: 'slide_from_right',
            //see this for more animation: https://stackoverflow.com/questions/69984434/not-work-transitionpresets-react-navigation-version-6
          }}
        >
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
            initialParams={{ signInHandler: {signInHandler} }}
            options={{
              headerTintColor: colours.black,
              headerBackTitleVisible: false,
            }}
          />
          <Stack.Screen 
            name="Signup"
            component={Signup}
            initialParams={{ signInHandler: {signInHandler} }}
            options={{
              headerTintColor: colours.black,
              headerBackTitleVisible: false,
              headerTitle: 'Register',
            }}
          />
        </Stack.Navigator>
     </NavigationContainer>
  );

};

const WelcomePage: FC = ({navigation}: any) => {

  return (
    <SafeAreaView>
      <View>

        {/* Image */}
        <View style={styles.imageContainer}>
          <Image style={styles.image} source={require("../../../assets/welcome_image.jpg")} />
        </View>

        {/* Sign In Box */}
        <View style={styles.optionsContainer}>
          
          <View><Text style={fonts.title2}>Start Socializing Now</Text></View>
          <View style={{justifyContent: 'center', alignItems: 'center'}}><Text style={fonts.regular}>Discover and join exciting student events, connect with peers, and stay in the loop with campus happenings</Text></View>

          <View style={{flexDirection: 'row', paddingHorizontal: '2.3%'}}>
            
            <View style={{flex: 1}}>
              <Button
                style={{
                  margin: 1,
                  borderWidth: 2,
                  borderColor: colours.purple,
                  borderRadius: 30,
                }}
                buttonStyle={{borderRadius: 30}}
                titleStyle={{fontSize: 18}}
                color={colours.purple}
                title="Login"
                onPress={() => navigation.navigate('Login')}
              />
            </View>

            <View style={{flex: 1}}>
              <Button
                style={{
                  margin: 1,
                  borderWidth: 2,
                  borderColor: colours.purple,
                  borderRadius: 30,
                }}
                titleStyle={{fontSize: 18}}
                buttonStyle={{borderRadius: 30}}
                color={colours.purple}
                title="Register"
                onPress={() => navigation.navigate('Signup')}
              />
            </View>

          </View>

        </View>

      </View>
    </SafeAreaView>
  )

}

const Login: FC = ({ setIsSigningUp }: any) => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const [showResetPassword, setShowResetPassword] = useState(false);
  const resetPassword = () => {
    console.log("Reset password")

  }

  async function signIn() {
    if (email === "" || password === "") {
      setError("Email and password cannot be empty");
      return;
    }

    // Only accept emails from accepted universities
    if (!universities.some((university) => email.includes(university))) {
      setError("Email must be from an accepted university");
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error: any) {
      // setError(error.message);
      setError("Invalid email or password, please try again");
    }
  }

  return (
    <View style={{backgroundColor: 'white', flex: 1, paddingHorizontal: '3%', paddingTop: '25%'}}>
      
      {/* Form */}
      <View>
        <Input
          label="Email"
          placeholder="Email"
          onChangeText={(value) => setEmail(value)}
          labelStyle={{color: 'black', fontWeight: '400', marginBottom: '1%'}}
          autoCapitalize="none"
          containerStyle={{paddingHorizontal: 0}}
          selectionColor={colours.purple}
          // inputContainerStyle={inputStyle}
        />
        <Input
          label="Password"
          placeholder="Password"
          labelStyle={{color: 'black', fontWeight: '400', marginBottom: '1%'}}
          containerStyle={{paddingHorizontal: 0}}
          onChangeText={(value) => setPassword(value)}
          autoCapitalize="none"
          selectionColor={colours.purple}
          secureTextEntry={true}
          // inputContainerStyle={inputStyle}
        />
        <Text onPress={() => setShowResetPassword(true)}>Forgot password?</Text>
        <Text style={styles.textAlert} >{error}</Text>
      </View>

      {/* Button */}
      <View>
        <CustomButton buttonName="Log In" onPressListener={() => signIn()} />
        {/* <View style={{marginTop: '2%', justifyContent: 'center'}}>
          <Text>
            Don't have an account?
            <Text onPress={setIsSigningUp} style={{color: colours.primaryPurple, fontWeight: '600'}}> Register</Text>
          </Text>
        </View> */}
      </View>

      <BottomSheet 
          modalProps={{animationType: 'fade'}}
          onBackdropPress={() => setShowResetPassword(false)}
          isVisible={showResetPassword}
          scrollViewProps={{scrollEnabled:false}}
      >
          <View style={{backgroundColor: 'white', paddingVertical: '7%', borderRadius: 15}}>
              <Text style={{...fonts.title3, textAlign: 'center', marginBottom: '5%'}}>
                  Change your password
              </Text>
              <CustomInput
                  input={email}
                  secureText={false}
                  placeholder="Enter your email"
                  onChangeListener={(value: string) => setEmail(value)}
              />
              <View>
                  <CustomButton
                      buttonName="Reset Password" 
                      onPressListener={() => resetPassword()}
                      disabled={email === ""}
                  />
              </View>

          </View>
      </BottomSheet>

    </View>
  );

}

const Signup: FC = ({ setIsSigningUp }: any) => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [checked, setChecked] = useState(false);
  const [error, setError] = useState("");
  const [userType, setUserType] = useState("Student");

  async function signUp(validate: boolean): Promise<boolean> {
    if (validate) {
      if (email === "" || password === "") {
        if (email === "" || password === "") {
          setError("Email and password cannot be empty");
          return false;
        }
        return false;
      }

      // Only accept emails from accepted universities
      if (!universities.some((university) => email.includes(university))) {
        setError("You must be an uOttawa student to sign up");
        return false;
      }

      if (!checked) {
        setError("You must agree to the terms and conditions");
        return false;
      }
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      setIsSigningUp(false);
      return true;
    } catch (error: any) {
      setError(error.message);
    }
    return false;
  }

  return (
    
      <View style={{backgroundColor: 'white', flex: 1, paddingHorizontal: '3%', paddingTop: '25%'}}>
        
        {/* Form */}
        <View>
          {/* <SelectList
            data={[{key:'1', value:'Student'}, {key:'2', value:'Organizer'}]}
            setSelected={(value: string) => setUserType(value)}
            save="value"
            defaultOption={{key: '3', value:'Account Type'}}
            boxStyles={{backgroundColor: "#ffffff", borderColor: "#ffffff", borderWidth: 2, borderRadius: 6, paddingVertical: 12, paddingHorizontal: 10, marginVertical: 10}}
            dropdownStyles={{backgroundColor: 'white', borderColor: "#ffffff", borderWidth: 2, borderRadius: 6, paddingVertical: 2, paddingHorizontal: 2, marginVertical: 2}}
          /> */}
          <Input
            label="Email"
            placeholder="Email"
            onChangeText={(value) => setEmail(value)}
            labelStyle={{color: 'black', fontWeight: '400', marginBottom: '1%'}}
            autoCapitalize="none"
            containerStyle={{paddingHorizontal: 0}}
            selectionColor={colours.purple}
            // inputContainerStyle={inputStyle}
          />
          <Input
            label="Password"
            placeholder="Password"
            selectionColor={colours.purple}
            labelStyle={{color: 'black', fontWeight: '400', marginBottom: '1%'}}
            containerStyle={{paddingHorizontal: 0}}
            onChangeText={(value) => setPassword(value)}
            autoCapitalize="none"
            secureTextEntry={true}
          />
          <Text style={styles.textAlert} >{error}</Text>
          <CheckBox
            checkedColor={colours.purple}
            title={
              <Text> I agree to comply with uEvents' 
                <Text style={{}} onPress={() => Linking.openURL("https://uevents.webnode.page/privacy-policy/")}
                >{" "}Privacy Policy{" "}</Text>
              </Text>
            }
            containerStyle={{padding: 0, margin: 0}}
            checked={checked}
            onPress={() => setChecked(!checked)}
          />  
        </View>

        <View>
          <CustomButton
            buttonName="Sign Up"
            onPressListener={() => {
              // userType === "Student" ?
                  signUp(true).then((success) => {
                    if (!success) return;
                    addDocumentToCollection<Student>(
                      "users",
                      getFirebaseUserIDOrEmpty(),
                      defaultStudent
                    );
                  })
                // : // Don't validate email for organizers
                //   signUp(false).then((success) => {
                //     if (!success) return;
                //     addDocumentToCollection<Organizer>(
                //       "users",
                //       getFirebaseUserIDOrEmpty(),
                //       defaultOrganizer
                //     );
                //   });
            }}
          />
        </View>

        {/* Login Option */}
        {/* <View>
          <Text>
            Already have an account?
            <Text
              onPress={setIsSigningUp}
              style={{ color: colours.primaryPurple }}
            >
              {" "}
              Sign in
            </Text>
          </Text>
        </View> */}

      </View>
    
  );

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
  textAlert: {
    color: 'red',
    paddingVertical: '2%',
  }
});


export default SignIn;
