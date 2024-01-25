import { KeyboardAvoidingView, ScrollView, View, StyleSheet, Platform } from "react-native";
import { Input, Text } from "@rneui/themed";
import { Avatar, Button } from "react-native-elements";
import { useStateWithFireStoreDocument, useStateWithFireStoreImage } from "../../../utils/useStateWithFirebase";
import { getFirebaseUserIDOrEmpty, uid } from "../../../utils/util";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Organizer, defaultOrganizer } from "../../../utils/model/Organizer";
import { colours, fonts, spacing, windowHeight } from "../../subatoms/Theme";
import React, { useEffect, useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { useUploadFile } from "react-firebase-hooks/storage";
import { ref } from "firebase/storage";
import { fireStore, storage } from "../../../firebaseConfig";
import { Loading } from "../Common/Loading";
import { RootStackParamList } from "../../../../main";
import { doc, setDoc } from "firebase/firestore";
import { CustomText } from "../../atoms/CustomText";
import CustomInput from "../../atoms/CustomInput";

type props = NativeStackScreenProps<RootStackParamList, "OrganizerSettings">;

export const OrganizerSettings = ({ route, navigation }: props) => {
  // Editing
  let isNew = route.params.new ?? false;
  let isEditing = !isNew;
  let dbPath = isEditing ? route.params.id ?? getFirebaseUserIDOrEmpty() : "dummy";

  // States
  const [id, setId] = useState<string>(isEditing ? route.params.id ?? getFirebaseUserIDOrEmpty() : uid()); // Id used to store in database.
  const [image, setImage] = useState<string>("");
  const [loading, dbProfile, setDbProfile] = useStateWithFireStoreDocument<Organizer>("users", dbPath);
  const [localProfile, setLocalProfile] = useState<Organizer>(defaultOrganizer);
  const [uploadFile, uploading, snapshot, error] = useUploadFile();
  const [loading2, url, found] = useStateWithFireStoreImage("organizers/" + dbPath);

  useEffect(() => {
    if (isEditing && dbProfile) {
      setLocalProfile(dbProfile);
    }
  }, [loading]);

  if (loading2 || loading) {
    return <Loading />;
  }

  if (uploading) {
    return <Loading />;
  }

  let isAdmin = route.params.id != undefined;

  let uri = "";
  if (image != "") {
    uri = image;
  } else if (found && url) {
    uri = url;
  } else {
    uri = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png";
  }

  const reference = ref(storage, "organizers/" + id);

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
      fetch(result!.assets[0]!.uri).then((response) => {
        response.blob().then((blob) => {
          uploadFile(reference, blob, {
            contentType: "image/jpeg",
          }).catch((e) => {
            console.log(e);
          });
        });
      });
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        {/* {snapshot && <Text>Snapshot: {JSON.stringify(snapshot)}</Text>} */}
        {/* Image Section */}
        <View style={styles.profileImage}>
          <Avatar
            source={{
              uri: uri,
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

        <CustomText style={{ textAlign: "center" }}>⚠️ Warning! Image updates automatically. ⚠️</CustomText>

        {image == "" ||
          (image == null && <Text style={{ textAlign: "center" }}>Please upload an image of your organization to finish setting up your account.</Text>)}

        {/* Club Info Section */}
        <View style={styles.studentInfo}>
          <View style={{ flexDirection: "column", flex: 1 }}>
            <CustomInput
              label={
                <Text>
                  Organization Name <Text style={{ color: "red" }}>*</Text>
                </Text>
              }
              placeholder="Organization name"
              defaultValue={localProfile.name}
              onChangeText={(value: string) => setLocalProfile({ ...localProfile, name: value })}
            />
            {isAdmin ? (
              <CustomInput
                label={
                  <Text>
                    Email<Text style={{ color: "red" }}>*</Text>
                  </Text>
                }
                placeholder="Email"
                defaultValue={localProfile.email}
                onChangeText={(value: string) => setLocalProfile({ ...localProfile, email: value })}
              />
            ) : (
              <></>
            )}

            <CustomInput
              label={
                <Text>
                  Organization Description <Text style={{ color: "red" }}>*</Text>
                </Text>
              }
              placeholder="Insert Description"
              defaultValue={localProfile.description}
              multiline={true}
              style={{ height: windowHeight * 0.2 }}
              maxLength={700}
              onChangeText={(value: string) => setLocalProfile({ ...localProfile, description: value })}
            />

            <CustomInput
              label={
                <Text>
                  Instagram Handle <Text style={{ color: "red" }}></Text>
                </Text>
              }
              leftIcon={{ type: "font-awesome", name: "at" }}
              placeholder="Insert Instagram handle"
              defaultValue={localProfile.instagram}
              onChangeText={(value: string) => setLocalProfile({ ...localProfile, instagram: value })}
            />

            <CustomInput
              label={
                <Text>
                  Discord <Text style={{ color: "red" }}></Text>
                </Text>
              }
              // leftIcon={{ type: "font-awesome", name: "at" }}
              placeholder="Insert Discord invite link"
              defaultValue={localProfile.instagram}
              onChangeText={(value: string) => setLocalProfile({ ...localProfile, instagram: value })}
            />
          </View>
        </View>
      </ScrollView>

      {/* Static Footer */}
      <KeyboardAvoidingView
        style={{ marginBottom: windowHeight * 0.01 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        keyboardVerticalOffset={Platform.OS === "ios" ? 95 : 0}
      >
        <View style={styles.footer_buttons}>
          <Button
            buttonStyle={{
              backgroundColor: colours.purple,
              padding: 15,
              paddingHorizontal: 25,
              borderRadius: 10,
            }}
            title={"Submit"}
            onPress={() => {
              if (isNew) {
                setDoc(doc(fireStore, "users/" + id), { ...localProfile, type: "organizer", saved: [], id: id, image: id, approved: false, authentic: false });
              } else {
                setDbProfile(localProfile);
              }
              navigation.pop();
            }}
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
