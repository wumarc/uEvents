import { View, ScrollView, StyleSheet, Text } from "react-native";
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
import { BottomSheet } from "@rneui/themed";
import CustomInput from "../../atoms/CustomInput";

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

                    <SettingsInput 
                        placeholder="Email" 
                        input={email!} 
                        disabled={true}
                    />
                    <SettingsInput 
                        placeholder="Password" 
                        disabled={true} 
                        input={"***********"}
                    />

                    <CustomButton 
                        buttonName="Change Password" 
                        onPressListener={() => setIsVisible(true)}
                    />
                    
                    <BottomSheet 
                        modalProps={{
                        }}
                        backdropStyle={{backgroundColor: 'transparent'}}
                        containerStyle={{backgroundColor: 'transparent'}}
                        onBackdropPress={() => setIsVisible(false)}
                        // containerStyle={{height: 100, backgroundColor: 'blue'}}
                        isVisible={isVisible}
                    >
                        <View style={{
                            backgroundColor: 'white', 
                            paddingVertical: '6%',
                            borderRadius: 15
                        }}>
                            <Text style={{
                                fontSize: 17,
                                fontWeight: '500',
                                textAlign: 'center', 
                                marginBottom: '5%'}}
                            >
                                Change your password
                            </Text>
                            <CustomInput
                                input={oldPassword}
                                placeholder="Enter your old password"
                                secureText={true}
                                onChangeListener={(value: string) => setOldPassword(value)}
                            />
                            <CustomInput
                                input={newPassword}
                                secureText={true}
                                placeholder="Enter your new password"
                                onChangeListener={(value: string) => setNewPassword(value)}
                            />
                            <View>
                                <CustomButton
                                    buttonName="Update" 
                                    onPressListener={() => updateUserPassword()}
                                />
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
        backgroundColor: colours.secondaryPurple,
        paddingHorizontal: '4%'
    },
    studentInfo: {
        marginTop: 20,
        // backgroundColor: "green"
    },
    
})

export default AccountSettings;