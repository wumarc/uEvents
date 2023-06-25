import { View, Text} from "react-native";
import { Button } from "@rneui/themed";
import { Input } from "@rneui/base";
import { auth } from "../../../firebaseConfig";
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { colours } from "../../subatoms/colours/colours";
import { StyleSheet } from "react-native";
import { signInText, inputStyle } from "./Styling";

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
    <View>

      {/* Title */}
      <View>
        <Text style={signInText}>Login to your account</Text>
      </View>

      {/* Form */}
      <View style={{width: '95%'}}>
        <Input
          placeholder="Email"
          onChangeText={(value) => setEmail(value)}
          autoCapitalize="none"
          selectionColor={colours.primaryPurple}
          secureTextEntry={false}
          containerStyle= {{
            paddingHorizontal: 0,
          }}
          inputContainerStyle={inputStyle}
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
          inputContainerStyle={inputStyle}
        />
      </View>

      {/* Button */}
      <View style={{width: '95%'}}>
        <Text style={styles.textAlert} >{error}</Text>
        <Button
          color={colours.primaryPurple}
          title="Log In"
          onPress={() => {signIn();}}
        />
      </View>

      {/* Sign up option */}
      <View>
        <Text style={signInText}>
          Don't have an account?
          <Text onPress={setIsSigningUp} style={{color: colours.primaryPurple}}> Sign up</Text>
        </Text>
      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  textAlert: {
    color: 'red',
    paddingVertical: '2%',
  }
});

export default Login;
