import { FC, useState } from "react";
import { auth } from "../../firebaseConfig";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { View, Text, SafeAreaView } from "react-native";
import { Button } from "@rneui/themed";
import { Input } from "@rneui/base";
import { Image } from "react-native-elements";
import { StyleSheet } from "react-native";
import { colours } from "../subatoms/colours/colours";

// Accepted universities
const universities = ["@uottawa.ca", "@cmail.carleton.ca"];

const SignIn: FC = () => {
  const [isSigningUp, setIsSigningUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

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
      setError(error.message);
    }
  }

  async function signUp() {
    if (email === "" || password === "") {
      if (email === "" || password === "") {
        setError("Email and password cannot be empty");
        return;
      }
      return;
    }

    // Only accept emails from accepted universities
    if (!universities.some((university) => email.includes(university))) {
      setError("Email must be from an accepted university");
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      setIsSigningUp(false);
    } catch (error: any) {
      setError(error.message);
    }
  }

  const SignUp = () => {
    return (
      <View>
        <Input placeholder="Email" onChangeText={(value) => setEmail(value)} />
        <Input
          placeholder="Password"
          onChangeText={(value) => setPassword(value)}
        />
        <Text>{error}</Text>
        <Button
          title="Sign up"
          onPress={() => {
            signUp();
          }}
        />
        <Button title="Sign in" onPress={() => setIsSigningUp(false)} />
      </View>
    )
  }

  const Login = () => {
    return (
      <View>

          {/* Title */}
          <View>
            <Text>Login to your Student Account</Text>
          </View>
          
          {/* Form */}
          <View>
            <Input placeholder="Email" onChangeText={(value) => setEmail(value)} />
            <Input
              placeholder="Password"
              onChangeText={(value) => setPassword(value)}
            />
          </View>

          {/* Button */}
          <View>
            <Text>{error}</Text>
            <Button
              color={styles.button.backgroundColor}
              title="Sign in"
              onPress={() => {
                signIn();
              }}
            />
          </View>

          {/* Sign up option */}
          <Text>
              Don't have an account? 
              <Button 
                title={"Sign up"}
                type="clear"
                onPress={() => setIsSigningUp(true)}
              />
          </Text>
        
        </View>
    )
  }

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <View>
          <Image
                style={{ width: 300, height: 300, borderRadius: 15}}
                source={require("../../../assets/uevents.png")}
          />
        </View>
        <View>
          { isSigningUp ? <SignUp /> : <Login/> }
        </View>
      </View>
    </SafeAreaView>
  )

};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  button: {
    backgroundColor: colours.primary,
  }
});

export default SignIn;
