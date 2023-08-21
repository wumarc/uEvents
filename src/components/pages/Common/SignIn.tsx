import { FC, useState } from "react";
import { View, SafeAreaView, Linking, StyleSheet } from "react-native";
import { Text, Image } from "react-native-elements";
import { Input } from "@rneui/themed";
import { BottomSheet } from "@rneui/base";
import { Button } from "@rneui/base";
import { colours, fonts, windowHeight } from "../../subatoms/Theme";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { auth, fireStore } from "../../../firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { addDocumentToCollection } from "../../../utils/useStateWithFirebase";
import { defaultStudent, Student } from "../../../utils/model/Student";
import { getFirebaseUserIDOrEmpty } from "../../../utils/util";
import { defaultOrganizer, Organizer } from "../../../utils/model/Organizer";
import { CheckBox } from "@rneui/themed";
import CustomButton from "../../atoms/CustomButton";
import CustomInput from "../../atoms/CustomInput";
import { addDoc, doc, setDoc } from "firebase/firestore";
import { spacing } from "../../subatoms/Theme";
import HeaderLeft from "../../molecules/HeaderLeft";
import { Dropdown } from "react-native-element-dropdown";

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
          headerTitleAlign: "center",
          animation: "slide_from_right",
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
          initialParams={{ signInHandler: { signInHandler } }}
          options={{
            headerTintColor: colours.black,
            headerBackTitleVisible: false,
          }}
        />
        <Stack.Screen
          name="Signup"
          component={Signup}
          initialParams={{ signInHandler: { signInHandler } }}
          options={{
            headerTintColor: colours.black,
            headerBackTitleVisible: false,
            headerTitle: "Register",
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const WelcomePage: FC = ({ navigation }: any) => {
  return (
    <SafeAreaView style={{ backgroundColor: "#D6A9D5", flex: 1, justifyContent: 'space-around'}}>
      
      {/* Image */}
      <View style={styles.imageContainer}>
        <Image
          style={styles.image}
          source={require("../../../assets/welcome_image.png")}
        />
      </View>
      
      {/* App Description */}
      <View style={{alignItems: 'center'}}>
        <Text style={{...fonts.title1, color: colours.white, fontSize: 50}}>uEvents</Text>
        <Text style={{...fonts.title2, color: colours.white}}>Find out what you are missing.</Text> 
      </View>

      {/* Sign In Box */}
      <View style={{paddingHorizontal: spacing.page, paddingVertical: '3%'}}>
        <Button
          style={{margin: 1, borderWidth: 2, borderColor: colours.purple, borderRadius: 30}}
          buttonStyle={{borderRadius: 30}}
          titleStyle={{fontSize: 18}}
          color={colours.purple}
          title="Login"
          onPress={() => navigation.navigate("Login")}
        />
        <Text></Text>
        <Button
          style={{margin: 1, borderWidth: 2, borderColor: colours.purple, borderRadius: 30}}
          titleStyle={{ fontSize: 18 }}
          buttonStyle={{ borderRadius: 30 }}
          color={colours.purple}
          title="Register"
          onPress={() => navigation.navigate("Signup")}
        />
      </View>

      <View style={{alignItems: 'center'}}>
        <Text style={{...fonts.small, color: colours.white}}>uEvent Technologies Inc.</Text>
      </View>
      
    </SafeAreaView>
  );
};

const Login: FC = ({ setIsSigningUp }: any) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const [showResetPassword, setShowResetPassword] = useState(false);
  const resetPassword = () => {
    console.log("Reset password");
  };

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
    <View
      style={{
        backgroundColor: "white",
        flex: 1,
        paddingHorizontal: "3%",
        paddingTop: "25%",
      }}
    >

      {/* Form */}
      <View>
        <Input
          label="Email"
          placeholder="Email"
          maxLength={30}
          labelStyle={{ color: "black", fontWeight: "500", marginBottom: "1%" }}
          onChangeText={(value) => setEmail(value)}
          autoCapitalize="none"
          containerStyle={{ paddingHorizontal: 0 }}
          selectionColor={colours.black}
          inputContainerStyle={{
            borderColor: colours.grey,
            borderWidth: 1,
            paddingVertical: 4,
            paddingHorizontal: 8,
            borderRadius: 6,
          }}
        />
        <Input
          label="Password"
          placeholder="Password"
          labelStyle={{ color: "black", fontWeight: "500", marginBottom: "1%" }}
          onChangeText={(value) => setPassword(value)}
          containerStyle={{ paddingHorizontal: 0 }}
          autoCapitalize="none"
          selectionColor={colours.black}
          secureTextEntry={true}
          inputContainerStyle={{
            borderColor: colours.grey,
            borderWidth: 1,
            paddingVertical: 4,
            paddingHorizontal: 8,
            borderRadius: 6,
          }}
        />
        <Text onPress={() => setShowResetPassword(true)}>Forgot password?</Text>
        <Text style={styles.textAlert}>{error}</Text>
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
        modalProps={{ animationType: "fade" }}
        onBackdropPress={() => setShowResetPassword(false)}
        isVisible={showResetPassword}
        scrollViewProps={{ scrollEnabled: false }}
      >
        <View
          style={{
            backgroundColor: "white",
            paddingVertical: "7%",
            borderRadius: 15,
          }}
        >
          <Text
            style={{ ...fonts.title3, textAlign: "center", marginBottom: "5%" }}
          >
            Enter your email to reset your password
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
};

const Signup: FC = ({ setIsSigningUp }: any) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [checked, setChecked] = useState(false);
  const [error, setError] = useState("");
  const [userType, setUserType] = useState("");

  async function signUp(validate: boolean): Promise<boolean> {
    
    // Only accept emails from accepted universities
    if (!universities.some((university) => email.includes(university))) {
      setError("You must be a uOttawa student to sign up");
      return false;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      await setDoc(doc(fireStore, "users/" + getFirebaseUserIDOrEmpty()), {
        type: userType,
        saved: [],
      });
      setIsSigningUp(false);
      return true;
    } catch (error: any) {
      setError("Invalid email or password, please try again");
    }
    
    return false;
  }

  return (
    <View
      style={{
        backgroundColor: "white",
        flex: 1,
        paddingHorizontal: "3%",
        paddingTop: "25%",
      }}
    >


      {/* Form */}
      <View>
        <Input
          label="School Email"
          placeholder="adele078@uottawa.ca"
          onChangeText={(value) => setEmail(value)}
          labelStyle={{ color: "black", fontWeight: "500", marginBottom: "1%" }}
          autoCapitalize="none"
          containerStyle={{ paddingHorizontal: 0, paddingVertical: 0}}
          selectionColor={colours.black}
          inputContainerStyle={{
            borderColor: colours.grey,
            borderWidth: 1,
            paddingVertical: 4,
            paddingHorizontal: 8,
            borderRadius: 6,
          }}
        />
        
        <Input
          label="Password (min 6 characters)"
          placeholder="Password"
          selectionColor={colours.black}
          labelStyle={{ color: "black", fontWeight: "500", marginBottom: "1%" }}
          containerStyle={{ paddingHorizontal: 0 }}
          onChangeText={(value) => setPassword(value)}
          autoCapitalize="none"
          secureTextEntry={true}
          inputContainerStyle={{
            borderColor: colours.grey,
            borderWidth: 1,
            paddingVertical: 4,
            paddingHorizontal: 8,
            borderRadius: 6,
          }}
        />
        
        <Text style={{color: "black", fontWeight: "500", fontSize: 16, marginBottom: "1%"}}>Register as a</Text>
        <Dropdown
            placeholderStyle={{paddingVertical: 4, paddingHorizontal: 8}}
            data={[{key:1, value:'student'}, {key:2, value:'organizer'}]}
            labelField="value"
            valueField="key"
            placeholder={userType == "" ? 'Account Type' : userType}
            style={{borderWidth: 1, borderColor: colours.grey, borderRadius: 6, paddingVertical: 5, paddingHorizontal: 8}}
            onChange={(item) => (item.key == 1 ? setUserType("student") : setUserType("organizer"))}
        />

        <Text style={styles.textAlert}>{error}</Text>
        <CheckBox
          checkedColor={colours.purple}
          title={
            <Text>
              {" "}
              I agree to comply with uEvents'
              <Text
                onPress={() =>
                  Linking.openURL(
                    "https://uevents.webnode.page/privacy-policy/"
                  )
                }
              >
                {" "}
                Privacy Policy{" "}
              </Text>
            </Text>
          }
          containerStyle={{ padding: 0, margin: 0 }}
          checked={checked}
          onPress={() => setChecked(!checked)}
        />
      </View>

      <View>
        <Button
          color={colours.purple}
          title="Sign up"
          disabled={email === "" || password === "" || userType === "" || !checked}
          onPress={() => {
            userType === "student"
              ? signUp(true)
              : // Don't validate email for organizers
                signUp(false);
          }}
        />
      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    width: "30%",
    height: windowHeight * 0.23,
    alignSelf: "center",
  },
  optionsContainer: {
    width: "100%",
    height: "40%",
  },
  image: {
    justifyContent: "center",
    width: "100%",
    height: "90%",
  },
  textAlert: {
    color: "red",
    paddingVertical: "2%",
  },
});

export default SignIn;
