import { KeyboardAvoidingView, ScrollView, View } from "react-native";
import { Text } from "@rneui/themed";
import { StyleSheet } from "react-native";
import { Input } from "@rneui/themed";
import { Avatar, Button } from "react-native-elements";
import { useSateWithFireStore } from "../../../utils/useStateWithFirebase";
import { getFirebaseUserID } from "../../../utils/util";
import { getAuth, signOut } from "firebase/auth";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "./main";
import { Organizer, defaultOrganizer } from "../../../utils/model/Organizer";
import { colours, fonts, spacing, windowHeight } from "../../subatoms/Theme";
import React from "react";

type props = NativeStackScreenProps<RootStackParamList, "Profile">;
// To access the type of user, use route.params.userType

const Profile = ({ route, navigation }: props) => {
  
  const [saveChanges, setSaveChanges] = React.useState(false);
  const [loading, profile, setProfile] = useSateWithFireStore<Organizer>(
    "organizer" + "/" + getFirebaseUserID(),
    "info",
    defaultOrganizer
  );

  if (loading) {
    return <Text>Loading</Text>;
  }

  return (
    <View style={styles.container}>
      
      <ScrollView>

        {/* Image Section */}
        <View style={styles.profileImage}>
          <Avatar
            source={{uri: "https://images.squarespace-cdn.com/content/v1/592738c58419c2fe84fbdb81/1515457803870-4HA5BU3QQY2DXLR0LFVB/DBS_StudentLinkedInAlex.jpg?format=1000w"}}
            // showEditButton
            rounded
            size="xlarge"
          />
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