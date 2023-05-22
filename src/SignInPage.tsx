import { FC, useState } from "react";
import { auth } from "./firebaseConfig";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { Button, View, Text } from "react-native";
import { Input } from "@rneui/base";

// Accepted universities
const universities = ["@uottawa.ca", "@cmail.carleton.ca"];

const SignInPage: FC = () => {
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

  if (isSigningUp) {
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
    );
  } else {
    return (
      <View>
        <Text>Welcome to uEvents!</Text>
        <Button title="Sign up" onPress={() => setIsSigningUp(true)} />
        <Input placeholder="Email" onChangeText={(value) => setEmail(value)} />
        <Input
          placeholder="Password"
          onChangeText={(value) => setPassword(value)}
        />
        <Text>{error}</Text>
        <Button
          title="Sign in"
          onPress={() => {
            signIn();
          }}
        />
      </View>
    );
  }
};

export default SignInPage;
