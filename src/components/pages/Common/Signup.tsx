import { View, Text } from "react-native";
import { Button } from "@rneui/themed";
import { Input } from "@rneui/base";
import { auth } from "../../../firebaseConfig";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useState } from "react";
import { colours } from "../../subatoms/colours/colours";
import { StyleSheet } from "react-native";
import { addDocumentToCollection } from "../../../utils/useStateWithFirebase";
import { defaultStudent, Student } from "../../../utils/model/Student";
import { getFirebaseUserIDOrEmpty } from "../../../utils/util";
import { defaultOrganizer, Organizer } from "../../../utils/model/Organizer";

const universities = ["@uottawa.ca", "@cmail.carleton.ca"];

const Signup = ({ setIsSigningUp }: any) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

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
        setError("Email must be from an accepted university");
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
    <View>
      {/* Title */}
      <View>
        <Text>Create your student account</Text>
      </View>

      {/* Form */}
      <View>
        <Input
          placeholder="Email"
          onChangeText={(value) => setEmail(value)}
          autoCapitalize="none"
          selectionColor={colours.primaryPurple}
        />
        <Input
          placeholder="Password"
          onChangeText={(value) => setPassword(value)}
          autoCapitalize="none"
          secureTextEntry={true}
          selectionColor={colours.primaryPurple}
        />
        <Input
          placeholder="Confirm your Password"
          onChangeText={() => {}}
          autoCapitalize="none"
          secureTextEntry={true}
          selectionColor={colours.primaryPurple}
        />
      </View>

      {/* Button */}
      <View>
        <Text>{error}</Text>
        <Button
          color={styles.button.backgroundColor}
          title="Sign up as Student"
          style={{ marginBottom: 10 }}
          onPress={() => {
            signUp(true).then((success) => {
              if (!success) return;
              addDocumentToCollection<Student>(
                "users",
                getFirebaseUserIDOrEmpty(),
                defaultStudent
              );
            });
          }}
        />
        <Button
          color={styles.button.backgroundColor}
          title="Sign up as Event Organizer"
          style={{ marginBottom: 10 }}
          onPress={() => {
            // Don't validate email for organizers
            signUp(false).then((success) => {
              if (!success) return;
              addDocumentToCollection<Organizer>(
                "users",
                getFirebaseUserIDOrEmpty(),
                defaultOrganizer
              );
            });
          }}
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
        <Text>
          By clicking Sign up, you are agreeing to uEvents' Terms of Service and are acknowledging that you have read
          our Privacy Policy.
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
