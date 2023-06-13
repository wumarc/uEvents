import { View, Text, SafeAreaView, TouchableOpacity } from "react-native";
import { Button } from "@rneui/themed";
import { Input } from "@rneui/base";
import { auth } from "../../firebaseConfig";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useState } from "react";
import { colours } from "../subatoms/colours/colours";
import { StyleSheet } from "react-native";
import { addDocumentToCollection } from "../../utils/useStateWithFirebase";

const universities = ["@uottawa.ca", "@cmail.carleton.ca"];

const Signup = ({ setIsSigningUp }: any) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

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

  return (
    <View>
      {/* Title */}
      <View>
        <Text>Create your student account</Text>
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
          title="Sign Up"
          onPress={() => signUp()}
        />
      </View>

      {/* Login Option */}
      <View>
        <Text style={styles.text}>
          Already have an account?
          <Text onPress={setIsSigningUp} style={styles.textButton}>
            {" "}
            Sign in
          </Text>
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  button: {
    backgroundColor: colours.primaryPurple,
  },
  text: {
    color: "black",
    fontSize: 15,
    marginTop: 10,
  },
  textButton: {
    color: "blue",
    fontWeight: "bold",
    fontSize: 15,
  },
});

export default Signup;
