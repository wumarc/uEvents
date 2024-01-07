import { View } from "react-native";
import { Button, Text } from "@rneui/themed";
import { StyleSheet } from "react-native";
import { defaultStudent, Student } from "../../../../utils/model/Student";
import { useSateWithFireStore } from "../../../../utils/useStateWithFirebase";
import { getFirebaseUserID, getFirebaseUserIDOrEmpty } from "../../../../utils/util";
import { getAuth, signOut } from "firebase/auth";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { logEvent } from "../../../../firebaseConfig";
import { RootStackParamList } from "../../../../../main";

type props = NativeStackScreenProps<RootStackParamList, "Profile">;

const Profile = ({ route, navigation }: props) => {
  const [loading, profile, setProfile] = useSateWithFireStore<Student>("students" + "/" + getFirebaseUserID(), "info", defaultStudent);

  if (loading) {
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
    <View>
      <Text>Version 2</Text>
      <Button
        onPress={() => {
          logout();
        }}
        title="Log out"
        style={{ marginBottom: 10 }}
      />
      <Button
        onPress={() => {
          logEvent("test_event", getFirebaseUserIDOrEmpty());
        }}
        title="Event"
        style={{ marginBottom: 10 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 0,
    marginHorizontal: 0,
    paddingHorizontal: 8,
    // backgroundColor: "red",
    alignItems: "center",
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
  saveButton: {
    flexDirection: "row",
    marginBottom: 10,
  },
});

export default Profile;
