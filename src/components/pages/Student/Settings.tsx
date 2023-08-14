import { ScrollView, View, Text } from "react-native";
import { useState } from "react";
import { Button} from "@rneui/themed";
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
import { borderRadius, colours, fonts, spacing } from "../../subatoms/Theme";
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

const Settings = ({ route, navigation }: props) => {

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
          <Text style={fonts.title1}>Settings</Text>
        </View>

        {/* Settings */}
        <View style={{ marginTop: "10%" }}>
          <SettingsButton
            buttonName={"Account Settings"}
            onPressListener={() => navigation.navigate("AccountSettingsView")}
          />
          <SettingsButton
            buttonName={"Privacy Policy"}
            onPressListener={() => Linking.openURL("https://uevents.webnode.page/privacy-policy/")}
          />
          <SettingsButton
            buttonName={"Delete Account"}
            onPressListener={() => setConfirmDelete(true)}
          />

          {/* Log Out Button */}
          <Button
            buttonStyle={{backgroundColor: colours.primaryGrey}}
            containerStyle={{borderRadius: borderRadius.large}}
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
                  size={13}
                  iconStyle={{ fontSize: 23, color: "red" }}
                />
                <Text style={{ fontSize: 17, fontWeight: "300", color: "red" }}>Log Out</Text>
              </View>
            </View>
          </Button>
        </View>
        
        {/* Delete Account Confirmation */}
        <BottomSheet 
            modalProps={{animationType: 'fade'}}
            onBackdropPress={() => setConfirmDelete(false)}
            isVisible={confirmDelete}
            scrollViewProps={{scrollEnabled:false}}
        >
            <View style={{
                backgroundColor: 'white', 
                paddingVertical: '6%',
                borderRadius: 15
            }}>
                <Text style={{...fonts.title3, textAlign: 'center', marginBottom: '5%'}} >Confirm deletion of your account?</Text>    
                <CustomButton
                  buttonName="Delete Account"
                  onPressListener={() => {
                    deleteUser(auth.currentUser as User);
                    deleteDoc(doc(fireStore, "users" + "/" + getFirebaseUserID()));
                  }}
                  disabled={false}
                />
                <Button
                    style={{
                        paddingHorizontal: 10,
                        borderRadius: 15,
                        marginVertical: '1%'
                    }}
                    color={'transparent'}
                    titleStyle={{color: colours.purple, fontWeight: '600'}}
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
    paddingHorizontal: spacing.page,
    flex: 1,
    backgroundColor: colours.white,
  },
  pageTitle: {
    flexDirection: "row",
    padding: "3%",
  },
});

export default Settings;
