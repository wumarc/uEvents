import { ScrollView, View, Text } from "react-native";
import { useState } from "react";
import { Button } from "@rneui/themed";
import { StyleSheet } from "react-native";
import { getFirebaseUserID, getFirebaseUserIDOrEmpty, userType } from "../../../utils/util";
import { User, deleteUser, getAuth, signOut } from "firebase/auth";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { borderRadius, colours, fonts, spacing } from "../../subatoms/Theme";
import { Loading } from "./Loading";
import { Linking } from "react-native";
import { auth, fireStore } from "../../../firebaseConfig";
import { Icon } from "react-native-elements";
import SettingsButton from "../../molecules/SettingsButton";
import { deleteDoc, doc } from "firebase/firestore";
import { CustomButton } from "../../atoms/CustomButton";
import { BottomSheet } from "@rneui/base";
import { Dialog } from "react-native-elements";
import * as Clipboard from "expo-clipboard";
import { useAuthState } from "react-firebase-hooks/auth";
import { RootStackParamList } from "../../../../main";
import { appVersion } from "../../../../config";
import { useStateWithFireStoreDocumentLogged } from "../../../utils/useStateWithFirebase";
import { CustomText } from "../../atoms/CustomText";
import { customLogEvent } from "../../../utils/analytics";
import { useLocalStorage } from "../../../utils/localStorage";
import CustomInput from "../../atoms/CustomInput";
import { useUser } from "../../../utils/model/User";

type props = NativeStackScreenProps<RootStackParamList, "Settings">;

const Settings = ({ route, navigation }: props) => {
  // States
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [dialogVisible, setdialogVisible] = useState(false);
  const [loading, userData, isLogged, isStudent, isOrganizer, isAdmin, isBeta] = useUser();
  const [localStored, setLocalStored] = useLocalStorage("test", "");

  if (loading) {
    return <Loading />;
  }

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

  return (
    <View style={styles.container}>
      <ScrollView>
        {/* Title */}
        <View style={styles.pageTitle}>
          <Text style={fonts.title1}>Settings</Text>
        </View>

        {!isLogged && <CustomText style={spacing.verticalPadding2}>Please log in to access all features of this page</CustomText>}

        {/* <CustomButton
          title="Log user"
          onPress={() => {
            console.log(userData);
          }}
        /> */}

        {/* Settings */}
        <View style={{ marginTop: "5%" }}>
          {/* Login button */}
          {!isLogged && (
            <SettingsButton
              onPressListener={() => {
                navigation.navigate("Welcome", {});
              }}
              buttonName={"Log In"}
            ></SettingsButton>
          )}

          <SettingsButton
            buttonName={"My Profile"}
            onPressListener={() => {
              if (isStudent || isAdmin) {
                navigation.navigate("AccountSettingsView", {});
              } else {
                navigation.navigate("OrganizerSettings", {});
              }
            }}
            disabled={!isLogged}
          />
          <SettingsButton buttonName={"Privacy Policy"} onPressListener={() => Linking.openURL("https://uevents.webnode.page/privacy-policy/")} />
          <SettingsButton buttonName={"Contact Us"} onPressListener={() => setdialogVisible(true)} />
          <SettingsButton
            disabled={!isLogged}
            buttonName={"Hidden Events"}
            onPressListener={() => {
              navigation.navigate("HiddenEventsView", {});
            }}
          />
          <SettingsButton
            disabled={!isLogged}
            buttonName={"Blocked Organizers"}
            onPressListener={() => {
              navigation.navigate("BlockedOrganizersView", {});
            }}
          />
          <SettingsButton buttonName={"Delete Account"} onPressListener={() => setConfirmDelete(true)} disabled={!isLogged} />

          {/* Log Out Button */}
          {isLogged && (
            <Button buttonStyle={{ backgroundColor: colours.primaryGrey }} containerStyle={{ borderRadius: borderRadius.large }} onPress={() => logout()}>
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
                  <Icon reverse name="log-out-outline" type="ionicon" color="transparent" size={13} iconStyle={{ fontSize: 23, color: "red" }} />
                  <Text style={{ fontSize: 17, fontWeight: "300", color: "red" }}>Log Out</Text>
                </View>
              </View>
            </Button>
          )}
        </View>

        {/* Version number */}
        <CustomText style={spacing.verticalPadding2}>Version {appVersion}</CustomText>

        {/* Add version button */}
        {isAdmin && (
          <CustomButton
            title="Add Version"
            onPress={() => {
              navigation.navigate("NewVersion", {});
            }}
          />
        )}

        {/* Send test analytics */}
        {isAdmin && (
          <CustomButton
            title="Send Test Analytics"
            onPress={() => {
              customLogEvent("test_event");
            }}
          />
        )}

        {/* Testing local storage */}
        {isAdmin && (
          <CustomInput
            value={localStored}
            label="Local storage test value"
            onChangeText={(text: any) => {
              setLocalStored(text);
            }}
          />
        )}

        {/* Send test notification */}

        {/* Delete Account Confirmation */}
        <BottomSheet
          modalProps={{ animationType: "fade" }}
          onBackdropPress={() => setConfirmDelete(false)}
          isVisible={confirmDelete}
          scrollViewProps={{ scrollEnabled: false }}
        >
          <View
            style={{
              backgroundColor: "white",
              paddingVertical: "6%",
              borderRadius: 15,
            }}
          >
            <Text
              style={{
                ...fonts.title3,
                textAlign: "center",
                marginBottom: "5%",
              }}
            >
              Confirm deletion of your account?
            </Text>
            <CustomButton
              title="Delete Account"
              onPress={() => {
                deleteDoc(doc(fireStore, "users" + "/" + getFirebaseUserID()));
                deleteUser(auth.currentUser as User);
              }}
              disabled={false}
            />
            <Button
              style={{
                paddingHorizontal: 10,
                borderRadius: 15,
                marginVertical: "1%",
              }}
              color={"transparent"}
              titleStyle={{ color: colours.purple, fontWeight: "600" }}
              title={"Cancel"}
              onPress={() => setConfirmDelete(false)}
            />
          </View>
        </BottomSheet>

        <Dialog isVisible={dialogVisible} onBackdropPress={() => setdialogVisible(false)}>
          <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
            <Text style={fonts.title2}>admin@uevents.org</Text>
            <Button
              buttonStyle={{ backgroundColor: colours.white }}
              icon={<Icon name="copy" type="feather" color={colours.black} />}
              onPress={() => Clipboard.setStringAsync("admin@uevents.org")}
            />
          </View>
        </Dialog>
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
