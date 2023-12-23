import { Linking, ScrollView, View } from "react-native";
import { BottomSheet, Dialog, Icon, Text } from "@rneui/themed";
import { StyleSheet } from "react-native";
import { Button } from "@rneui/themed";
import { useSateWithFireStore, useStateWithFireStoreCollection } from "../../../utils/useStateWithFirebase";
import { getFirebaseUserID } from "../../../utils/util";
import { User, deleteUser, getAuth, signInWithEmailAndPassword, signOut, updatePassword } from "firebase/auth";
import { auth, fireStore } from "../../../firebaseConfig";
import { deleteDoc, doc } from "firebase/firestore";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "./main";
import CustomButton from "../../atoms/CustomButton";
import { Organizer, defaultOrganizer } from "../../../utils/model/Organizer";
import { borderRadius, colours, fonts, spacing } from "../../subatoms/Theme";
import SettingsButton from "../../molecules/SettingsButton";
import { useState } from "react";
import * as Clipboard from "expo-clipboard";
import { EventObject } from "../../../utils/model/EventObject";

type props = NativeStackScreenProps<RootStackParamList, "Profile">;
// To access the type of user, use route.params.userType

const Settings = ({ route, navigation }: props) => {
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [dialogVisible, setdialogVisible] = useState(false);

  const [loading, profile, setProfile] = useSateWithFireStore<Organizer>("organizer" + "/" + getFirebaseUserID(), "info", defaultOrganizer);

  const [loading3, events, add] = useStateWithFireStoreCollection<EventObject>("events");

  if (loading || loading3) {
    return <Text>Loading</Text>;
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

        {/* Settings */}
        <View style={{ marginTop: "10%" }}>
          <SettingsButton buttonName={"My Profile"} onPressListener={() => navigation.navigate("Profile")} />
          <SettingsButton buttonName={"Privacy Policy"} onPressListener={() => Linking.openURL("https://uevents.webnode.page/privacy-policy/")} />
          <SettingsButton buttonName={"Contact Us"} onPressListener={() => setdialogVisible(true)} />
          <SettingsButton
            buttonName={"Hidden Events"}
            onPressListener={() => {
              navigation.navigate("HiddenEventsView", {});
            }}
          />
          <SettingsButton
            buttonName={"Blocked Organizers"}
            onPressListener={() => {
              navigation.navigate("BlockedOrganizersView", {});
            }}
          />
          <SettingsButton buttonName={"Delete Account"} onPressListener={() => setConfirmDelete(true)} />

          {/* Log Out Button */}
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
        </View>

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
            <Text style={{ ...fonts.title3, textAlign: "center", marginBottom: "5%" }}>Confirm deletion of your account?</Text>
            <CustomButton
              buttonName="Delete Account"
              onPress={() => {
                // first del all his events
                events?.forEach((event) => {
                  if (event.organizer == getFirebaseUserID()) {
                    deleteDoc(doc(fireStore, "events" + "/" + event.id));
                  }
                });
                deleteUser(auth.currentUser as User);
                deleteDoc(doc(fireStore, "users" + "/" + getFirebaseUserID()));
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
