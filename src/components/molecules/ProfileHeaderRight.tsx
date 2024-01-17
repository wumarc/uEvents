import { FC, useState } from "react";
import { View } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useStateWithFireStoreDocumentLogged } from "../../utils/useStateWithFirebase";
import { getFirebaseUserIDOrEmpty } from "../../utils/util";
import { colours } from "../subatoms/Theme";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebaseConfig";
import { CustomDialog } from "../atoms/CustomDialog";
import { LoginDialog } from "./LoginDialog";
import { useUser } from "../../utils/model/User";

// Header for the organizer profile page
const ProfileHeaderRight: FC<{ organizer: string; navigation: any }> = (props) => {
  // States
  const [loading, userData, setUserData, isLogged, isStudent, isOrganizer, isAdmin, isBeta] = useUser();
  const [visible, setVisible] = useState(false);
  const [blockVisible, setBlockVisible] = useState(false);
  const [loginVisible, setLoginVisible] = useState(false);

  // Loading
  if (loading || !setUserData) {
    return <MaterialCommunityIcons name="dots-vertical" color={colours.black} size={30} />;
  }

  return (
    <View style={{ backgroundColor: colours.white, flexDirection: "row" }}>
      <MaterialCommunityIcons
        name="dots-vertical"
        color={colours.black}
        size={30}
        onPress={() => {
          if (isLogged) {
            setVisible(true);
          } else {
            setLoginVisible(true);
          }
        }}
      />
      {/* Main dialog */}
      <CustomDialog
        visible={visible}
        setVisible={setVisible}
        navigation={props.navigation}
        includeCancel
        buttons={[
          {
            buttonName: "block",
            onPress: () => {
              setBlockVisible(true);
              setVisible(false);
            },
          },
        ]}
      />
      {/* Block dialog */}
      <CustomDialog
        visible={blockVisible}
        setVisible={setBlockVisible}
        navigation={props.navigation}
        includeCancel
        cancelOnPress={() => setVisible(false)}
        buttons={[
          {
            buttonName: "Block",
            onPress: () => {
              if (!userData) return;
              setUserData({
                ...userData,
                blocked: [...(userData?.blocked ?? []), props.organizer],
              });
              setBlockVisible(false);
              setVisible(false);
              props.navigation.pop();
            },
          },
        ]}
      >
        Blocking will block all events from this organizer. You will not be able to see any of their events on your feed. You can unblock anytime in settings.
      </CustomDialog>
      {/* Login dialog */}
      <LoginDialog visible={loginVisible} setVisible={setLoginVisible} navigation={props.navigation}>
        You must be logged in to block an organizer.
      </LoginDialog>
    </View>
  );
};

export default ProfileHeaderRight;
