import { View } from "react-native";
import { useState } from "react";
import { Button, Image, Text } from "@rneui/themed";
import { Input } from "@rneui/base";
import { StyleSheet } from "react-native";
import { defaultStudent, Student } from "../../utils/model/Student";
import { Avatar } from "react-native-elements";
import { useSateWithFireStore } from "../../utils/useStateWithFirebase";
import { getFirebaseUserID } from "../../utils/util";
import { getAuth, signOut } from "firebase/auth";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootTabParamList } from "../../main";

type props = NativeStackScreenProps<RootTabParamList, "Profile">;
// To access the type of user, use route.params.userType

const Profile = ({ route, navigation }: props) => {
  const [loading, profile, setProfile] = useSateWithFireStore<Student>(
    "students" + "/" + getFirebaseUserID(),
    "info",
    defaultStudent
  );

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
    <View style={styles.container}>
      {/* Header Section */}
      <View style={styles.profileHeader}>
        <Text h4>Your Profile</Text>
      </View>

      {/* Image Section */}
      <View style={styles.profileImage}>
        {/* <Image 
                    source={{ uri: 'https://images.squarespace-cdn.com/content/v1/592738c58419c2fe84fbdb81/1515457803870-4HA5BU3QQY2DXLR0LFVB/DBS_StudentLinkedInAlex.jpg?format=1000w' }}
                    style={{ 
                        width: 200,
                        height: 200,
                        borderRadius: 200/2,
                    }}
                /> */}
        <Avatar
          source={{
            uri: "https://images.squarespace-cdn.com/content/v1/592738c58419c2fe84fbdb81/1515457803870-4HA5BU3QQY2DXLR0LFVB/DBS_StudentLinkedInAlex.jpg?format=1000w",
          }}
          // showEditButton
          rounded
          size="xlarge"
        />
      </View>

      {/* Student Info Section */}
      <View style={styles.studentInfo}>
        <View style={{ flexDirection: "column", flex: 1 }}>
          <Input
            placeholder="Name"
            defaultValue={profile.name ? profile.name : ""}
            leftIcon={{
              type: "material",
              name: "person",
            }}
            onChangeText={(value) => setProfile({ ...profile, name: value })}
          />
          <Input
            placeholder="Student Id"
            defaultValue={
              profile.studentId.toString() ? profile.studentId.toString() : ""
            }
            leftIcon={{
              type: "material",
              name: "credit-card",
            }}
            onChangeText={(value) => {
              if (parseInt(value) != undefined) {
                setProfile({ ...profile, studentId: parseInt(value) });
              }
            }}
          />
        </View>
      </View>

      {/* Log out button */}
      <View>
        <Button
          onPress={() => {
            logout();
          }}
          title="Log out"
          style={{ marginBottom: 10 }}
        />
      </View>
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
