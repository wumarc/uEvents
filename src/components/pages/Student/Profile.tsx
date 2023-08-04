import { ScrollView, View } from "react-native";
import { useState } from "react";
import { Button, Text } from "@rneui/themed";
import { StyleSheet } from "react-native";
import { defaultStudent, Student } from "../../../utils/model/Student";
import { useSateWithFireStore } from "../../../utils/useStateWithFirebase";
import { getFirebaseUserID } from "../../../utils/util";
import {
  User,
  deleteUser,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  updatePassword,
} from "firebase/auth";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "./main";
import { colours } from "../../subatoms/colours";
import { Loading } from "../Common/Loading";
import { Linking } from "react-native";
import { auth, fireStore } from "../../../firebaseConfig";
import { Icon } from "@rneui/base";
import SettingsButton from "../../molecules/SettingsButton";
import { deleteDoc, doc } from "firebase/firestore";
import CustomButton from "../../atoms/CustomButton";
import { BottomSheet } from "@rneui/base";

type props = NativeStackScreenProps<RootStackParamList, "Profile">;
// To access the type of user, use route.params.userType

const Profile = ({ route, navigation }: props) => {
  const [confirmDelete, setConfirmDelete] = useState(false);

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

      <ScrollView>

        {/* Title */}
        <View style={styles.pageTitle}>
          <Text style={{ fontSize: 33, fontWeight: "600"}}>
            Your Settings
          </Text>
        </View>

        {/* Settings */}
        <View style={{ marginTop: "10%" }}>
          <SettingsButton
            buttonName={"Account Settings"}
            onPressListener={() => navigation.navigate("AccountSettingsView")}
          />
          <SettingsButton
            buttonName={"Privacy Policy"}
            // onPressListener={() => navigation.navigate("PrivacyPolicyView")}
            onPressListener={() => Linking.openURL("https://uevents.webnode.page/privacy-policy/")}
          />
          {/* <SettingsButton
            buttonName={"Support"}
            onPressListener={() => navigation.navigate("SupportView")}
          /> */}
          <SettingsButton
            buttonName={"Delete Account"}
            onPressListener={() => setConfirmDelete(true)}
          />

          {/* Log Out Button */}
          <Button
            buttonStyle={{backgroundColor: 'white'}}
            containerStyle={{ borderRadius: 15 }}
            onPress={() => logout()}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                flex: 1,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  padding: 0,
                  margin: 0,
                }}
              >
                <Icon
                  reverse
                  name="log-out-outline"
                  type="ionicon"
                  color="transparent"
                  size={15}
                  iconStyle={{ fontSize: 27, color: "red" }}
                  // containerStyle={{padding: 0, margin: 2}}
                />
                <Text style={{ fontSize: 18, fontWeight: "600", color: "red" }}>
                  Log Out
                </Text>
              </View>
            </View>
          </Button>
        </View>
        
        {/* Delete Account Confirmation */}
        <BottomSheet 
            modalProps={{}}
            // backdropStyle={{backgroundColor: 'transparent'}}
            // containerStyle={{backgroundColor: 'transparent'}}
            onBackdropPress={() => setConfirmDelete(false)}
            // containerStyle={{height: 100, backgroundColor: 'blue'}}
            isVisible={confirmDelete}
        >
            <View style={{
                backgroundColor: 'white', 
                paddingVertical: '6%',
                borderRadius: 15
            }}>
                <Text style={{fontSize: 17, fontWeight: '500', textAlign: 'center', marginBottom: '5%'}} >Are you sure you want to delete your account? This action cannot be reversed.</Text>    
                <Button
                    style={{
                        paddingHorizontal: 10,
                        borderRadius: 15,
                        marginVertical: '1%'
                    }}
                    color={colours.primaryPurple}
                    title={"Delete Account"}
                    onPress={() => {
                      deleteUser(auth.currentUser as User);
                      deleteDoc(doc(fireStore, "users" + "/" + getFirebaseUserID()));
                    }}
                />
                <Button
                    style={{
                        paddingHorizontal: 10,
                        borderRadius: 15,
                        marginVertical: '1%'
                    }}
                    color={'transparent'}
                    titleStyle={{color: colours.primaryPurple, fontWeight: '600'}}
                    title={"Cancel"}
                    onPress={() => setConfirmDelete(false)}
                />
            </View>
        </BottomSheet>

      </ScrollView>
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: "2.3%",
    flex: 1,
    backgroundColor: colours.primaryGrey,
  },
  pageTitle: {
    flexDirection: "row",
    padding: "3%",
  },
});

export default Profile;
