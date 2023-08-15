import { View, ScrollView, StyleSheet, Text } from "react-native";
import { borderRadius, colours, fonts, spacing } from "../../subatoms/Theme";
import { useState } from "react";
import { Input } from "react-native-elements";
import { auth } from "../../../firebaseConfig";
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
import { Button } from "@rneui/themed";

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

                    <Input
                        label="Email"
                        value={email!}
                        disabled={true}
                        labelStyle={{color: 'black', fontWeight: '500', marginBottom: '1%'}}
                        autoCapitalize="none"
                        containerStyle={{paddingHorizontal: 0}}
                        selectionColor={colours.purple}
                    />
                    <Input
                        label="Password"
                        value={"*********"}
                        disabled={true}
                        labelStyle={{color: 'black', fontWeight: '500', marginBottom: '1%'}}
                        autoCapitalize="none"
                        containerStyle={{paddingHorizontal: 0}}
                        selectionColor={colours.purple}
                    />

                    <CustomButton 
                        buttonName="Change Password" 
                        onPressListener={() => setIsVisible(true)}
                    />
                    
                    <BottomSheet 
                        modalProps={{animationType: 'fade'}}
                        onBackdropPress={() => setIsVisible(false)}
                        isVisible={isVisible}
                        scrollViewProps={{scrollEnabled:false}}
                    >
                        <View style={{
                            backgroundColor: 'white', 
                            paddingVertical: '7%',
                            borderRadius: 15
                        }}>
                            <Text style={{...fonts.title3, textAlign: 'center', marginBottom: '5%'}}>
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
                                    disabled={oldPassword === "" || newPassword === ""}
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
        backgroundColor: colours.white,
        paddingHorizontal: '4%'
    },
    studentInfo: {
        marginTop: 20,
        // backgroundColor: "green"
    },
    
})

export default AccountSettings;