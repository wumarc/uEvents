import { ScrollView, View } from "react-native";
import { Button, Image, Text } from "@rneui/themed";
import { Input } from "react-native-elements";
import { StyleSheet } from "react-native";
import { defaultStudent, Student } from "../../../utils/model/Student";
import { Avatar } from "react-native-elements";
import { useSateWithFireStore } from "../../../utils/useStateWithFirebase";
import { getFirebaseUserID } from "../../../utils/util";
import { getAuth, signOut } from "firebase/auth";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "./main";
import CustomButton from "../../atoms/CustomButton";
import { Organizer, defaultOrganizer } from "../../../utils/model/Organizer";
import InputWithLabel from "../../atoms/InputWithLabel";
import { colours, fonts, spacing } from "../../subatoms/Theme";

type props = NativeStackScreenProps<RootStackParamList, "Profile">;
// To access the type of user, use route.params.userType

const Profile = ({ route, navigation }: props) => {
  const [loading, profile, setProfile] = useSateWithFireStore<Organizer>(
    "organizer" + "/" + getFirebaseUserID(),
    "info",
    defaultOrganizer
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
      
      <ScrollView>

        {/* Header Section */}
        <View style={styles.pageTitle}>
          <Text style={fonts.title1}>Profile</Text>
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

        {/* Club Info Section */}
        <View style={styles.studentInfo}>
          <View style={{ flexDirection: "column", flex: 1 }}>
            
            <InputWithLabel
              placeholder="Name"
              input={profile.name ? profile.name : "uOttawa Cycling Club"}
              secureText={false}
              onChangeListener={(value: string) => setProfile({ ...profile, name: value })}
            />

            <InputWithLabel
              placeholder="Email"
              input={profile.email ? profile.email : "uottawa_cycling@gmail.com"}
              secureText={false}
            />

            <Input
              label={"Club Description"}
              labelStyle={{color: 'grey', padding: '1%'}}
              labelProps={{}}
              disabledInputStyle={{ backgroundColor: "#ddd" }}
              value={"We are a club that loves to cycle! We meet every week to cycle around the city. We also have a competitive team that competes in the OUA league."}
              selectionColor={colours.primaryPurple}
              placeholder={"Club Description"}
              autoCapitalize="none"
              inputContainerStyle={{
                  borderBottomWidth: 2,
                  borderColor: "#bfbfbf",
                  borderWidth: 2,
                  paddingVertical: 2,
                  paddingHorizontal: 8,
                  borderRadius: 6,
                  underlineColor: "transparent"
              }}
              multiline={true}
              errorStyle={{}}
              errorProps={{}}
              inputStyle={{ outlineStyle: "none" }}
              leftIconContainerStyle={{}}
              rightIconContainerStyle={{}}
            />

          </View>
        </View>

        {/* Log out button */}
        <CustomButton
          buttonName="Log out"
          onPressListener={() => {logout()}}
        />

      </ScrollView>

    </View>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colours.white,
    paddingHorizontal: spacing.page,
  },
  profileHeader: {
    paddingLeft: '3%',
    marginVertical: '3%',
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
  pageTitle: {
    flexDirection: "row",
    padding: "3%",
  },
});

export default Profile;
