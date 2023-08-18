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
  useStateWithFireStoreImage,
} from "../../../utils/useStateWithFirebase";
import {
  getFirebaseUserID,
  getFirebaseUserIDOrEmpty,
  uid,
} from "../../../utils/util";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "./main";
import { Organizer, defaultOrganizer } from "../../../utils/model/Organizer";
import { colours, fonts, spacing, windowHeight } from "../../subatoms/Theme";
import React, { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { useUploadFile } from "react-firebase-hooks/storage";
import { ref } from "firebase/storage";
import { storage } from "../../../firebaseConfig";
import { Loading } from "../Common/Loading";

type props = NativeStackScreenProps<RootStackParamList, "Profile">;
// To access the type of user, use route.params.userType

const Profile = ({ route, navigation }: props) => {
  
  const [image, setImage] = useState<string>("");
  const [loading, profile, setProfile] =
    useStateWithFireStoreDocument<Organizer>(
      "users",
      getFirebaseUserIDOrEmpty()
    );
  const [uploadFile, uploading, snapshot, error] = useUploadFile();

  const [loading2, url, found] = useStateWithFireStoreImage(
    "organizers/" + getFirebaseUserIDOrEmpty()
  );

  if (loading2 || loading) {
    return <Loading />;
  }

  if (uploading) {
    return <Loading/>;
  }

  let uri = "";
  if (image != "") {
    uri = image;
  } else if (found && url) {
    uri = url;
  } else {
    uri =
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png";
  }

  const id = profile.id ?? getFirebaseUserIDOrEmpty();
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
      console.log(result);
      setImage(result!.assets[0]!.uri);
      fetch(result!.assets[0]!.uri).then((response) => {
        console.log(response);
        response.blob().then((blob) => {
          uploadFile(reference, blob, {
            contentType: "image/jpeg",
          })
            .then(() => {
              setProfile({ ...profile, image: id });
              console.log("done");
            })
            .catch((e) => {
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

        {/* Club Info Section */}
        <View style={styles.studentInfo}>
          <View style={{ flexDirection: "column", flex: 1 }}>
            <Input
              label="Organization Name"
              defaultValue={profile.name}
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
              defaultValue={profile.email}
              labelStyle={{
                color: "black",
                fontWeight: "500",
                marginBottom: "1%",
              }}
              autoCapitalize="none"
              containerStyle={{ paddingHorizontal: 0 }}
              selectionColor={colours.purple}
              onChangeText={(value: string) => setProfile({ ...profile, email: value })}
            />

            <Input
              label="Instagram"
              defaultValue={profile.instagram}
              labelStyle={{color: "black", fontWeight: "500", marginBottom: "1%"}}
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
              defaultValue={profile.description}
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
            onPress={() => navigation.pop()}
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
