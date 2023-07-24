import { View } from "react-native";
import { useState } from "react";
import { Button, Image, Text } from "@rneui/themed";
import { Input } from "@rneui/base";
import { StyleSheet } from "react-native";
import { defaultStudent, Student } from "../../../utils/model/Student";
import { useSateWithFireStore } from "../../../utils/useStateWithFirebase";
import { getFirebaseUserID } from "../../../utils/util";
import {
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
  
  const [loading, profile, setProfile] = useSateWithFireStore<Student>(
    "students" + "/" + getFirebaseUserID(),
    "info",
    defaultStudent
  );

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [email, setEmail] = useState(auth.currentUser?.email);

  if (loading) {
    return <Loading />;
  }

  return (
    <View style={styles.container}>

      {/* Student Info Section */}
      <View style={styles.studentInfo}>
        <View style={{ flexDirection: "column", flex: 1}}>

          <Text style={{fontSize: 17}}>Change your Password</Text>
          <Input
            placeholder="Old Password"
            leftIcon={{ type: "material", name: "lock" }}
            onChangeText={(value) => setOldPassword(value)}
            value={oldPassword}
            autoCapitalize="none"
            selectionColor={colours.primaryPurple}
            secureTextEntry={true}
          />
          <Input
            autoCapitalize="none"
            placeholder="New Password"
            leftIcon={{ type: "material", name: "lock" }}
            onChangeText={(value) => setNewPassword(value)}
            value={newPassword}
            selectionColor={colours.primaryPurple}
            secureTextEntry={true}
          />
        </View>
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
