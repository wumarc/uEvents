import { ScrollView, View, Text, Modal } from "react-native";
import { useState } from "react";
import { Button } from "@rneui/themed";
import { StyleSheet } from "react-native";
import { getFirebaseUserID, getFirebaseUserIDOrEmpty } from "../../../utils/util";
import { User, deleteUser, getAuth, signOut } from "firebase/auth";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { borderRadius, colours, fonts, spacing } from "../../subatoms/Theme";
import { Loading } from "./Loading";
import { Linking } from "react-native";
import { auth, fireStore, logEvent } from "../../../firebaseConfig";
import { Icon } from "@rneui/base";
import SettingsButton from "../../molecules/SettingsButton";
import { deleteDoc, doc } from "firebase/firestore";
import CustomButton from "../../atoms/CustomButton";
import { BottomSheet } from "@rneui/base";
import { Dialog } from "react-native-elements";
import * as Clipboard from "expo-clipboard";
import { useAuthState } from "react-firebase-hooks/auth";
import { RootStackParamList } from "../../../../main";
import { appVersion } from "../../../../config";
import { useStateWithFireStoreDocumentLogged } from "../../../utils/useStateWithFirebase";

type props = NativeStackScreenProps<RootStackParamList, "Settings">;

const Settings = ({ route, navigation }: props) => {
  // States
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [dialogVisible, setdialogVisible] = useState(false);
  const [user, loading, error] = useAuthState(auth);
  const [loading2, userData, setUserData] = useStateWithFireStoreDocumentLogged(user != null, "users", getFirebaseUserIDOrEmpty());

  if (loading || loading2) {
    return <Loading />;
  }

  let isAdmin = false;
  if (userData) {
    isAdmin = (userData as any).type === "admin";
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

        {/* Version number */}
        <Text>Version {appVersion}</Text>

        {/* Welcome message */}
        {user && <Text>Hi {auth.currentUser?.email}! Welcome to uEvents.</Text>}

        {/* Settings */}
        <View style={{ marginTop: "10%" }}>
          {/* Login button */}
          {!user && (
            <View style={{ marginBottom: "4%" }}>
              <CustomButton
                onPress={() => {
                  navigation.navigate("Welcome", {});
                }}
              >
                Login
              </CustomButton>
              <Text>Log in to access all features of this page.</Text>
            </View>
          )}

          <SettingsButton buttonName={"My Profile"} onPressListener={() => navigation.navigate("AccountSettingsView", {})} disabled={!user} />
          <SettingsButton buttonName={"Privacy Policy"} onPressListener={() => Linking.openURL("https://uevents.webnode.page/privacy-policy/")} />
          <SettingsButton buttonName={"Contact Us"} onPressListener={() => setdialogVisible(true)} />
          <SettingsButton
            disabled={!user}
            buttonName={"Hidden Events"}
            onPressListener={() => {
              navigation.navigate("HiddenEventsView", {});
            }}
          />
          <SettingsButton
            disabled={!user}
            buttonName={"Blocked Organizers"}
            onPressListener={() => {
              navigation.navigate("BlockedOrganizersView", {});
            }}
          />
          <SettingsButton buttonName={"Delete Account"} onPressListener={() => setConfirmDelete(true)} disabled={!user} />

          {/* Log Out Button */}
          {user && (
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

        {/* Add version button */}
        {isAdmin && (
          <CustomButton
            buttonName="Add Version"
            onPress={() => {
              navigation.navigate("NewVersion", {});
            }}
          />
        )}

        {/* Send test analytics */}
        {isAdmin && (
          <CustomButton
            buttonName="Send Test Analytics"
            onPress={() => {
              logEvent("test_event", getFirebaseUserIDOrEmpty());
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
              buttonName="Delete Account"
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
