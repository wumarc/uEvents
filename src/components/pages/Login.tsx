import { View, Text, SafeAreaView, TouchableOpacity } from "react-native";
import { Button } from "@rneui/themed";
import { Input } from "@rneui/base";
import { auth } from "../../firebaseConfig";
import { useState } from "react";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
  } from "firebase/auth";
import { colours } from "../subatoms/colours/colours";
import { StyleSheet } from "react-native";

// Accepted universities
const universities = ["@uottawa.ca", "@cmail.carleton.ca"];

const Login = ({setIsSigningUp}: any) => {

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
            title="Sign In"
            onPress={() => {
              signIn();
            }}
          />
        </View>

        {/* Sign up option */}
        <View>
          <Text style={styles.text}>
            Don't have an account?
              <Text onPress={setIsSigningUp} style={styles.textButton}> Sign Up</Text>
          </Text>
        </View>
      
    </View>
    );

}


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

export default Login;
