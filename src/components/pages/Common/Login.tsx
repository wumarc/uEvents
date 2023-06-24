import { View, Text, SafeAreaView, TouchableOpacity } from "react-native";
import { Button } from "@rneui/themed";
import { Input } from "@rneui/base";
import { auth } from "../../../firebaseConfig";
import { useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { colours } from "../../subatoms/colours/colours";
import { StyleSheet } from "react-native";
import CustomInput from "../../atoms/CustomInput";

// Accepted universities
const universities = ["@uottawa.ca", "@cmail.carleton.ca"];

const Login = ({ setIsSigningUp }: any) => {

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
      // setError(error.message);
      setError("Invalid email or password, please try again");
    }
  }

  return (
    <View style={styles.container}>

      {/* Title */}
      <View>
        <Text style={styles.text}>Login to your student account</Text>
      </View>

      {/* Form */}
      <View style={{
        width: '95%',
      }}>
        <Input
          placeholder="Email"
          onChangeText={(value) => setEmail(value)}
          autoCapitalize="none"
          selectionColor={colours.primaryPurple}
          secureTextEntry={false}
          containerStyle= {{
            paddingHorizontal: 0,
          }}
          // inputStyle={{ outlineStyle: "none" }}
          inputContainerStyle={{
            backgroundColor: "#fff",
            borderBottomWidth: 2,
            borderColor: "#bfbfbf",
            borderWidth: 2,
            paddingVertical: 4,
            paddingHorizontal: 10,
            borderRadius: 6,
          }}
        />
        <Input
          placeholder="Password"
          onChangeText={(value) => setPassword(value)}
          autoCapitalize="none"
          selectionColor={colours.primaryPurple}
          secureTextEntry={true}
          containerStyle= {{
            paddingHorizontal: 0,
          }}
          inputContainerStyle={{
            backgroundColor: "#fff",
            borderBottomWidth: 2,
            borderColor: "#bfbfbf",
            borderWidth: 2,
            paddingVertical: 4,
            paddingHorizontal: 10,
            borderRadius: 6,
          }}
        />
      </View>

      {/* Button */}
      <View style={{width: '95%'}}>
        <Text style={styles.textAlert} >{error}</Text>
        <Button
          color={styles.button.backgroundColor}
          title="Log In"
          onPress={() => {
            signIn();
          }}
        />
      </View>

      {/* Sign up option */}
      <View>
        <Text style={styles.switchPage}>
          Don't have an account?
          <Text onPress={setIsSigningUp} style={styles.textButton}>
            {" "}
            Sign up
          </Text>
        </Text>
      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "95%",
    marginHorizontal: "5%",
    marginVertical: "2%",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  button: {
    backgroundColor: colours.primaryPurple,
  },
  switchPage: {
    color: colours.whiteText,
    fontWeight: "600",
    marginTop: 10,
    fontSize: 14,
  },
  textButton: {
    color: colours.primaryPurple,
    fontWeight: "bold",
    fontSize: 14,
  },
  text: {
    color: colours.whiteText,
    fontWeight: "bold",
    paddingVertical: '2%',
  },
  textAlert: {
    color: 'red',
    paddingVertical: '2%',
  }
});

export default Login;
