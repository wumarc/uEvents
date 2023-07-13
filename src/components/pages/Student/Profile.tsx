import { View } from "react-native";
import { useState } from "react";
import { Button, Image, Text } from "@rneui/themed";
import { Input } from "@rneui/base";
import { StyleSheet } from "react-native";
import { defaultStudent, Student } from "../../../utils/model/Student";
import { Avatar } from "react-native-elements";
import { useSateWithFireStore } from "../../../utils/useStateWithFirebase";
import { getFirebaseUserID } from "../../../utils/util";
import {
  User,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  updatePassword,
} from "firebase/auth";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "./main";
import { colours } from "../../subatoms/colours";
import { Loading } from "../Common/Loading";
import { auth } from "../../../firebaseConfig";

type props = NativeStackScreenProps<RootStackParamList, "Profile">;
// To access the type of user, use route.params.userType

const Profile = ({ route, navigation }: props) => {
  const logout = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        // Sign-out successful.
      })
      .catch((error) => {
        // An error happened.
      });
  };

  const [loading, profile, setProfile] = useSateWithFireStore<Student>(
    "students" + "/" + getFirebaseUserID(),
    "info",
    defaultStudent
  );

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

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
            // Update successful.
            alert("Password updated successfully");
          })
          .catch((error) => {
            alert("Could not update password");
          });
      })
      .catch((error) => {
        alert("You entered the old password incorrectly");
      });
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <View style={styles.container}>
      {/* Header Section */}
      <View style={styles.profileHeader}>
        <Text h4>Your Profile</Text>
      </View>

      {/* Image Section */}
      {/* <View style={styles.profileImage}> */}
      {/* <Image 
                    source={{ uri: 'https://images.squarespace-cdn.com/content/v1/592738c58419c2fe84fbdb81/1515457803870-4HA5BU3QQY2DXLR0LFVB/DBS_StudentLinkedInAlex.jpg?format=1000w' }}
                    style={{ 
                        width: 200,
                        height: 200,
                        borderRadius: 200/2,
                    }}
                /> */}
      {/* <Avatar
          source={{
            uri: "https://images.squarespace-cdn.com/content/v1/592738c58419c2fe84fbdb81/1515457803870-4HA5BU3QQY2DXLR0LFVB/DBS_StudentLinkedInAlex.jpg?format=1000w",
          }}
          // showEditButton
          rounded
          size="xlarge"
        /> */}
      {/* </View> */}

      {/* Student Info Section */}
      <View style={styles.studentInfo}>
        <View style={{ flexDirection: "column", flex: 1 }}>
          <Input
            placeholder="Email"
            defaultValue={profile.name ? profile.name : "jacyob@uottawa.ca"}
            leftIcon={{
              type: "material",
              name: "mail",
            }}
            label="Email"
            onChangeText={(value) => setProfile({ ...profile, name: value })}
          />

          <Text>Change your Password</Text>
          <Input
            placeholder="Old Password"
            leftIcon={{
              type: "material",
              name: "lock",
            }}
            onChangeText={(value) => setOldPassword(value)}
          />
          <Input
            placeholder="New Password"
            leftIcon={{
              type: "material",
              name: "lock",
            }}
            onChangeText={(value) => setNewPassword(value)}
          />
          <Button
            color={colours.primaryPurple}
            onPress={() => {
              updateUserPassword();
            }}
            title="Reset password"
            radius={15}
            style={{ marginBottom: 10 }}
          />
          {/* <Input
            placeholder="Student ID"
            defaultValue="3000049494"
            // defaultValue={
            //   profile.studentId.toString() ? profile.studentId.toString() : ""
            // }
            leftIcon={{
              type: "material",
              name: "credit-card",
            }}
            onChangeText={(value) => {
              if (parseInt(value) != undefined) {
                setProfile({ ...profile, studentId: parseInt(value) });
              }
            }}
          /> */}
        </View>
      </View>

      {/* Log out button */}
      <View style={{ marginBottom: 10 }}>
        <Button
          color={colours.primaryPurple}
          onPress={() => logout()}
          title="Log out"
          radius={15}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 8,
    flex: 1,
    justifyContent: "space-between",
  },
  profileHeader: {
    flexDirection: "row",
    justifyContent: "center",
    paddingTop: 15,
  },
  profileImage: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 10,
  },
  studentInfo: {
    flexDirection: "row",
    // backgroundColor: "green"
  },
});

export default Profile;
