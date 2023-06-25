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
import { Linking } from "react-native";
import { SelectList } from 'react-native-dropdown-select-list'

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

  const [userType, setUserType] = useState("");

  return (
    <View style={styles.container}>
      {/* Title */}
      <View>
        <Text style={styles.text}>Create your account</Text>
      </View>

      {/* Form */}
      <View style={{width: '95%'}}>
        <SelectList
          data={[{key:'1', value:'Student'}, {key:'2', value:'Organizer'}]}
          setSelected={(value: string) => setUserType(value)}
          save="value"
          defaultOption={{key: '3', value:'Account Type'}}
          boxStyles={{backgroundColor: "#ffffff", borderColor: "#ffffff", borderWidth: 2, borderRadius: 6, paddingVertical: 12, paddingHorizontal: 10, marginVertical: 10}}
          dropdownStyles={{backgroundColor: 'white', borderColor: "#ffffff", borderWidth: 2, borderRadius: 6, paddingVertical: 2, paddingHorizontal: 2, marginVertical: 2}}
        />
        <Input
          placeholder="Email"
          onChangeText={(value) => setEmail(value)}
          autoCapitalize="none"
          containerStyle= {{paddingHorizontal: 0}}
          selectionColor={colours.primaryPurple}
          inputContainerStyle={styles.inputContainerStyle}
        />
        <Input
          placeholder="Password"
          onChangeText={(value) => setPassword(value)}
          autoCapitalize="none"
          secureTextEntry={true}
          containerStyle= {{paddingHorizontal: 0}}
          selectionColor={colours.primaryPurple}
          inputContainerStyle={styles.inputContainerStyle}
        />
      </View>

      {/* Button */}
      <View style={{width: '95%'}}>
        <Text>{error}</Text>
        <Button
          color={styles.button.backgroundColor}
          title="Sign up"
          style={{ marginBottom: 10 }}
          onPress={() => {
            userType === "Student" 
              ? signUp(true).then((success) => {
                  if (!success) return;
                  addDocumentToCollection<Student>(
                    "users",
                    getFirebaseUserIDOrEmpty(),
                    defaultStudent
                  );
                })
              : // Don't validate email for organizers
                signUp(false).then((success) => {
                  if (!success) return;
                  addDocumentToCollection<Organizer>(
                    "users",
                    getFirebaseUserIDOrEmpty(),
                    defaultOrganizer
                  );
                });
            }
          }
        />
      </View>

      {/* Login Option */}
      <View>
        <Text style={styles.text}>
          Already have an account?
          <Text onPress={setIsSigningUp} style={styles.textButton}> Sign in</Text>
        </Text>
        <Text style={styles.conditionsText}>
          By clicking Sign up, you are agreeing to uEvents' 
            <Text style={{color: colours.primaryPurple, fontWeight: "bold"}} onPress={() => Linking.openURL("https://www.uevents.org/terms")}> Terms of Service </Text>
          and are acknowledging that you have read our Privacy Policy.
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
  text: {
    color: "white",
    fontSize: 14,
    fontWeight: "bold",
    marginTop: 10,
    paddingVertical: '2%',
  },
  conditionsText: {
    color: "white",
    fontSize: 10,
    marginTop: 10,
  },
  textButton: {
    color: colours.primaryPurple,
    fontWeight: "bold",
    fontSize: 14,
  },
  inputContainerStyle: {
    backgroundColor: "#fff",
    borderBottomWidth: 2,
    borderColor: "#bfbfbf",
    borderWidth: 2,
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 6,
  }
});

export default Signup;