import { View, ScrollView, StyleSheet } from "react-native";
import { colours } from "../../subatoms/colours";
import { useState } from "react";
import { auth } from "../../../firebaseConfig";
import SettingsInput from "../../atoms/SettingsInput";
import { useSateWithFireStore } from "../../../utils/useStateWithFirebase";
import { defaultStudent, Student } from "../../../utils/model/Student";
import { getFirebaseUserID } from "../../../utils/util";
import {
  signInWithEmailAndPassword,
  updatePassword,
} from "firebase/auth";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "./main";
import CustomButton from "../../atoms/CustomButton";

type props = NativeStackScreenProps<RootStackParamList, "Profile">;
// To access the type of user, use route.params.userType

const AccountSettings = () => {

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

    return (
        <View style={styles.container}>
            <ScrollView>
                <View style={styles.studentInfo}>

                    <SettingsInput placeholder="Email" input={email!} disabled={true}/>
                    <SettingsInput placeholder="Password" disabled={true} input={"***********"}/>

                    <CustomButton buttonName="Change Password" onPressListener={() => updateUserPassword()}/>

                </View>
            </ScrollView>
        </View>
    );

};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colours.secondaryPurple,
        paddingHorizontal: '4%'
    },
    studentInfo: {
        marginTop: 20,
        // backgroundColor: "green"
    },
    
})

export default AccountSettings;