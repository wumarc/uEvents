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
            // Update successful.
            alert("Password updated successfully");
            setOldPassword("");
            setNewPassword("");
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
      <View style={styles.profileImage}>
      <Image
          source={require('../../../assets/uevents_logo.png')}
          style={{
              width: 80,
              height: 100,
              // borderRadius: 100/2,
          }}
      />
        {/* <Avatar
            source={require('../../../assets/uevents_logo.png')}
            rounded
            size="xlarge"
        /> */}
      </View>

      {/* Student Info Section */}
      <View style={styles.studentInfo}>
        <View style={{ flexDirection: "column", flex: 1}}>
          <Text style={{fontSize: 17}}>Email</Text>
          <Input
            placeholder="Email"
            defaultValue={email!}
            leftIcon={{type: "material", name: "mail"}}
            disabled
          />

          <Text style={{fontSize: 17}}>Change your Password</Text>
          <Input
            placeholder="Old Password"
            leftIcon={{
              type: "material",
              name: "lock",
            }}
            onChangeText={(value) => setOldPassword(value)}
            value={oldPassword}
            autoCapitalize="none"
            selectionColor={colours.primaryPurple}
            secureTextEntry={true}
          />
          <Input
            autoCapitalize="none"
            placeholder="New Password"
            leftIcon={{
              type: "material",
              name: "lock",
            }}
            onChangeText={(value) => setNewPassword(value)}
            value={newPassword}
            selectionColor={colours.primaryPurple}
            secureTextEntry={true}
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
        <Text style={{fontSize: 11}}>If you wish to delete your uEvents account or have any questions about uEvents, email us at admin@uevents.org with your email.</Text>
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
