import {
  KeyboardAvoidingView,
  ScrollView,
  View,
  StyleSheet,
  Image,
} from "react-native";
import { Input, Avatar, Text } from "@rneui/themed";
import { Button } from "react-native-elements";
import {
  useSateWithFireStore,
  useStateWithFireStoreDocument,
} from "../../../utils/useStateWithFirebase";
import {
  getFirebaseUserID,
  getFirebaseUserIDOrEmpty,
} from "../../../utils/util";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "./main";
import { Organizer, defaultOrganizer } from "../../../utils/model/Organizer";
import { colours, fonts, spacing, windowHeight } from "../../subatoms/Theme";
import React, { useState } from "react";
import * as ImagePicker from "expo-image-picker";

type props = NativeStackScreenProps<RootStackParamList, "Profile">;
// To access the type of user, use route.params.userType

const Profile = ({ route, navigation }: props) => {
  const [saveChanges, setSaveChanges] = React.useState(false);
  const [image, setImage] = useState<String>("");
  const [loading, profile, setProfile] =
    useStateWithFireStoreDocument<Organizer>(
      "users",
      getFirebaseUserIDOrEmpty()
    );

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    // https://docs.expo.dev/versions/latest/sdk/imagepicker/
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.2,
    });

    if (!result.canceled) {
      setImage(result!.assets[0]!.uri);
    }
  };

  if (loading) {
    return <Text>Loading</Text>;
  }

  return (
    <View style={styles.container}>
      <ScrollView>
        {/* Image Section */}
        <View style={styles.profileImage}>
          <Avatar
            source={{
              uri:
                image == ""
                  ? "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                  : image,
            }}
            rounded
            size="xlarge"
          >
            <Avatar.Accessory
              size={23}
              onPress={() => {
                pickImage();
              }}
            />
          </Avatar>
        </View>

        {/* Club Info Section */}
        <View style={styles.studentInfo}>
          <View style={{ flexDirection: "column", flex: 1 }}>
            <Input
              label="Organization Name"
              value={profile.name}
              labelStyle={{
                color: "black",
                fontWeight: "500",
                marginBottom: "1%",
              }}
              autoCapitalize="none"
              containerStyle={{ paddingHorizontal: 0 }}
              selectionColor={colours.purple}
              onChangeText={(value: string) =>
                setProfile({ ...profile, name: value })
              }
            />

            <Input
              label="Email"
              value={profile.email}
              labelStyle={{
                color: "black",
                fontWeight: "500",
                marginBottom: "1%",
              }}
              autoCapitalize="none"
              containerStyle={{ paddingHorizontal: 0 }}
              selectionColor={colours.purple}
              onChangeText={(value: string) =>
                setProfile({ ...profile, email: value })
              }
            />

            <Input
              label="Instagram"
              value={profile.instagram}
              labelStyle={{
                color: "black",
                fontWeight: "500",
                marginBottom: "1%",
              }}
              autoCapitalize="none"
              containerStyle={{ paddingHorizontal: 0 }}
              selectionColor={colours.purple}
              // rightIcon={{
              //   type: 'entypo', name: 'cross',
              //   onPress: () => {}
              // }}
              onChangeText={(value: string) =>
                setProfile({ ...profile, instagram: value })
              }
            />

            <Input
              label="Organization Description"
              value={profile.description}
              labelStyle={{
                color: "black",
                fontWeight: "500",
                marginBottom: "1%",
              }}
              inputStyle={{ height: windowHeight * 0.2 }}
              textAlignVertical="top"
              multiline={true}
              autoCapitalize="none"
              // rightIcon={{ type: 'entypo', name: 'cross'}}
              containerStyle={{ paddingHorizontal: 0 }}
              selectionColor={colours.purple}
              onChangeText={(value: string) =>
                setProfile({ ...profile, description: value })
              }
            />
          </View>
        </View>
      </ScrollView>

      {/* Static Footer */}
      <KeyboardAvoidingView style={{ marginBottom: windowHeight * 0.01 }}>
        <View style={styles.footer_buttons}>
          <Button
            buttonStyle={{
              backgroundColor: colours.purple,
              padding: 15,
              paddingHorizontal: 25,
              borderRadius: 10,
            }}
            title={"Done"}
            onPress={() => {
              navigation.pop();
            }}
            // disabled={!saveChanges}
            titleStyle={{ ...fonts.title3, color: colours.white }}
          />
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colours.white,
    paddingHorizontal: spacing.page,
  },
  profileImage: {
    flexDirection: "row",
    justifyContent: "center",
    ...spacing.verticalMargin1,
  },
  studentInfo: {
    flexDirection: "row",
    ...spacing.verticalMargin1,
  },
  footer_buttons: {
    paddingVertical: "1%",
    backgroundColor: colours.white,
    borderTopColor: colours.primaryGrey,
  },
});

export default Profile;
