import { KeyboardAvoidingView, ScrollView, View, StyleSheet, Image } from "react-native";
import { Input, Avatar, Text } from "@rneui/themed";
import { Button} from "react-native-elements";
import { useSateWithFireStore } from "../../../utils/useStateWithFirebase";
import { getFirebaseUserID } from "../../../utils/util";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "./main";
import { Organizer, defaultOrganizer } from "../../../utils/model/Organizer";
import { colours, fonts, spacing, windowHeight } from "../../subatoms/Theme";
import React, { useState } from "react";
import * as ImagePicker from 'expo-image-picker';

type props = NativeStackScreenProps<RootStackParamList, "Profile">;
// To access the type of user, use route.params.userType

const Profile = ({ route, navigation }: props) => {
  
  const [saveChanges, setSaveChanges] = React.useState(false);
  const [image, setImage] = useState<String>("");
  const [loading, profile, setProfile] = useSateWithFireStore<Organizer>(
    "organizer" + "/" + getFirebaseUserID(),
    "info",
    defaultOrganizer
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
            source={{uri: image == "" ? "https://images.squarespace-cdn.com/content/v1/592738c58419c2fe84fbdb81/1515457803870-4HA5BU3QQY2DXLR0LFVB/DBS_StudentLinkedInAlex.jpg?format=1000w" : image}}
            rounded
            size="xlarge"
          >
            <Avatar.Accessory 
              size={23}
              onPress={() => {pickImage()}}
            />
          </Avatar>
        </View>

        {/* Club Info Section */}
        <View style={styles.studentInfo}>

          <View style={{ flexDirection: "column", flex: 1 }}>
            
            <Input
                label="Organization Name"
                value={profile.name ? profile.name : "uOttawa Cycling Club"}
                labelStyle={{color: 'black', fontWeight: '500', marginBottom: '1%'}}
                autoCapitalize="none"
                containerStyle={{paddingHorizontal: 0}}
                selectionColor={colours.purple}
                onChange={(value: any) => setProfile({ ...profile, name: value })}
            />

            <Input
                label="Email"
                value={"uottawa_cycling@gmail.com"}
                labelStyle={{color: 'black', fontWeight: '500', marginBottom: '1%'}}
                autoCapitalize="none"
                containerStyle={{paddingHorizontal: 0}}
                selectionColor={colours.purple}
                onChange={(value: any) => setProfile({ ...profile, name: value })}
            />

            <Input
                label="Instagram"
                value={"https://www.instagram.com/uottawaboxingclub/?hl=en"}
                labelStyle={{color: 'black', fontWeight: '500', marginBottom: '1%'}}
                autoCapitalize="none"
                containerStyle={{paddingHorizontal: 0}}
                selectionColor={colours.purple}
                // rightIcon={{ 
                //   type: 'entypo', name: 'cross',
                //   onPress: () => {}
                // }}
                onChange={(value: any) => setProfile({ ...profile, name: value })}
            />

            <Input
                label="Organization Description"
                value={"Nestled in the heart of the city, the Downtown Boxing Club is a haven for both amateur and professional boxers. As you step through its glass doors, the rhythmic sound of punching bags and skipping ropes echoes through the spacious, well-lit gym. The walls are adorned with vintage black and white photographs of boxing legends, reminding all who enter of ."}
                labelStyle={{color: 'black', fontWeight: '500', marginBottom: '1%'}}
                inputStyle={{height: windowHeight*0.2}}
                textAlignVertical= 'top'
                multiline={true}
                autoCapitalize="none"
                // rightIcon={{ type: 'entypo', name: 'cross'}}
                containerStyle={{paddingHorizontal: 0}}
                selectionColor={colours.purple}
                onChange={(value: any) => setProfile({ ...profile, name: value })}
            />

          </View>

        </View>

      </ScrollView>
      
      {/* Static Footer */}
      <KeyboardAvoidingView style={{marginBottom: windowHeight*0.01}}>
          <View style={styles.footer_buttons}>
              <Button
                  buttonStyle={{backgroundColor: colours.purple, padding: 15, paddingHorizontal: 25, borderRadius: 10}}
                  title={"Save Changes"}
                  onPress={() => {}}
                  disabled={!saveChanges}
                  titleStyle={{...fonts.title3, color: colours.white}}
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
    paddingVertical: '1%',
    backgroundColor: colours.white,
    borderTopColor: colours.primaryGrey,
  },
});

export default Profile;