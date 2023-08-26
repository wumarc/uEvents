import { colours } from "../subatoms/Theme";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import React, { FC, useState } from "react";
import {
  useSateWithFireStore,
  useStateWithFireStoreDocument,
} from "../../utils/useStateWithFirebase";
import { getFirebaseUserIDOrEmpty } from "../../utils/util";
import { Menu } from "react-native-paper";
import { Button } from "react-native-elements";

const HeaderRight: FC<{ eventID: string }> = (props) => {
  const [loading, userData, setUserData] = useStateWithFireStoreDocument(
    "users",
    getFirebaseUserIDOrEmpty()
  );

  const [visible, setVisible] = useState(false);

  if (loading) {
    return (
      <MaterialCommunityIcons name="heart" color={colours.black} size={30} />
    );
  }

  const saved = (userData?.saved ?? []).includes(props.eventID);

  return (
    <View style={{backgroundColor: colours.white, flexDirection: 'row'}}>  
      <MaterialCommunityIcons
        name={saved ? "heart" : "heart-outline"}
        color={saved ? colours.purple : colours.black}
        size={30}
        onPress={() => {
          if (saved) {
            setUserData({
              saved: (userData?.saved ?? []).filter(
                (id: string) => id !== props.eventID
              ),
            });
          } else {
            setUserData({
              saved: [...(userData?.saved ?? []), props.eventID],
            });
          }
        }}
      />
      <Menu
        visible={visible}
        onDismiss={() => setVisible(false)}
        anchor={
          <MaterialCommunityIcons
          name="dots-vertical"
          color={colours.black}
          size={30}
          onPress={() => setVisible(true)}
        />
        }
      >
        <Menu.Item onPress={() => {}} title="Report" />
        <Menu.Item onPress={() => {}} title="Block" />
        <Menu.Item onPress={() => {}} title="Claim event" />
        <Menu.Item onPress={() => {}} title="Hide" />
      </Menu>
    </View>
  );
};

export default HeaderRight;
