import { View, ScrollView, StyleSheet, Text } from "react-native";
import { colours, fonts } from "../../subatoms/Theme";
import { useState } from "react";
import { Input } from "react-native-elements";
import { auth } from "../../../firebaseConfig";
import { signInWithEmailAndPassword, updatePassword } from "firebase/auth";
import { CustomButton } from "../../atoms/CustomButton";
import { BottomSheet } from "@rneui/themed";
import CustomInput from "../../atoms/CustomInput";

export const StudentSettings = () => {
  // States
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [email, setEmail] = useState(auth.currentUser?.email);

  const updateUserPassword = () => {
    let user = auth.currentUser;
    if (user == null) {
      return;
    }
    signInWithEmailAndPassword(auth, user.email as string, oldPassword)
      .then((userCredential) => {
        // Signed in
        user = userCredential.user;
        updatePassword(user, newPassword)
          .then(() => {
            alert("Password updated successfully");
            setIsVisible(false);
            setOldPassword("");
            setNewPassword("");
          })
          .catch((error) => alert("Could not update password"));
      })
      .catch((error) => alert("You entered the old password incorrectly"));
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.studentInfo}>
          <Input
            label="Email"
            value={email!}
            disabled={true}
            labelStyle={{ color: "black", fontWeight: "500", marginBottom: "1%" }}
            autoCapitalize="none"
            containerStyle={{ paddingHorizontal: 0 }}
            selectionColor={colours.purple}
          />
          <Input
            label="Password"
            value={"*********"}
            disabled={true}
            labelStyle={{ color: "black", fontWeight: "500", marginBottom: "1%" }}
            autoCapitalize="none"
            containerStyle={{ paddingHorizontal: 0 }}
            selectionColor={colours.purple}
          />
          <Input
            label="Student number"
            value={""}
            labelStyle={{ color: "black", fontWeight: "500", marginBottom: "1%" }}
            autoCapitalize="none"
            containerStyle={{ paddingHorizontal: 0 }}
            selectionColor={colours.purple}
          />
          <Input
            label="Phone number"
            value={""}
            labelStyle={{ color: "black", fontWeight: "500", marginBottom: "1%" }}
            autoCapitalize="none"
            containerStyle={{ paddingHorizontal: 0 }}
            selectionColor={colours.purple}
          />

          <CustomButton title="Change Password" onPress={() => setIsVisible(true)} />

          <BottomSheet
            modalProps={{ animationType: "fade" }}
            onBackdropPress={() => setIsVisible(false)}
            isVisible={isVisible}
            scrollViewProps={{ scrollEnabled: false }}
          >
            <View
              style={{
                backgroundColor: "white",
                paddingVertical: "7%",
                borderRadius: 15,
              }}
            >
              <Text style={{ ...fonts.title3, textAlign: "center", marginBottom: "5%" }}>Change your password</Text>
              <CustomInput
                value={oldPassword}
                placeholder="Enter your old password"
                secureTextEntry={true}
                onChangeText={(value: string) => setOldPassword(value)}
              />
              <CustomInput
                value={newPassword}
                secureTextEntry={true}
                placeholder="Enter your new password"
                onChangeText={(value: string) => setNewPassword(value)}
              />
              <View>
                <CustomButton title="Update" onPress={() => updateUserPassword()} disabled={oldPassword === "" || newPassword === ""} />
              </View>
            </View>
          </BottomSheet>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colours.white,
    paddingHorizontal: "4%",
  },
  studentInfo: {
    marginTop: 20,
    // backgroundColor: "green"
  },
});
