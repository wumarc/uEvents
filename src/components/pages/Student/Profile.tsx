import { View } from "react-native";
import { useState } from "react";
import { Button, Image, Text } from "@rneui/themed";
import { Input } from "@rneui/base";
import { StyleSheet } from "react-native";
import { defaultStudent, Student } from "../../../utils/model/Student";
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
import { Icon } from "@rneui/base";
import SettingsButton from "../../molecules/SettingsButton";

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
        
        {/* Title */}
        <View style={styles.pageTitle}>
          <Text style={{fontSize: 33, fontWeight: '600', color: 'white'}}>Settings</Text>
        </View>

        {/* Settings */}
        <View style={{marginTop: '10%'}}>

          <SettingsButton buttonName={"Account Settings"}/>
          <SettingsButton buttonName={"Privacy Policy"}/>
          <SettingsButton buttonName={"Support"}/>
          <SettingsButton buttonName={"Delete Account"}/>
          
          {/* Log Out Button */}
          <Button
            buttonStyle={{backgroundColor: colours.pastelSecondaryPurple}}
            containerStyle={{borderRadius: 15}}
            onPress={() => logout()}
          >
            <View style={{flexDirection: 'row', justifyContent: 'space-between', flex: 1}}>
              
              <View 
                style={{
                  flexDirection: 'row', 
                  alignItems: 'center',
                  padding: 0,
                  margin: 0
                }}
              >
                <Icon
                  reverse
                  name='log-out-outline'
                  type='ionicon'
                  color='transparent'
                  size={15}
                  iconStyle={{fontSize: 30, color: 'red'}}
                  // containerStyle={{padding: 0, margin: 2}}
                />
                <Text style={{fontSize: 20, fontWeight: '600', color: 'red'}}>
                  Log Out
                </Text>
              </View>

            </View>
          </Button>
          
        </View>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: '2.3%',
    flex: 1,
    backgroundColor: colours.secondaryPurple,
    // justifyContent: "space-between",
  },
  pageTitle: {
    flexDirection: "row",
    padding: '3%',
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
