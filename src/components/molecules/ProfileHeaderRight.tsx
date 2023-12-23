import { FC, useState } from "react";
import { View } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { Dialog } from "react-native-elements";
import CustomButton from "../atoms/CustomButton";
import { Button } from "@rneui/base";
import { useStateWithFireStoreDocument } from "../../utils/useStateWithFirebase";
import { getFirebaseUserIDOrEmpty } from "../../utils/util";
import { Text } from "react-native";
import { colours, fonts } from "../subatoms/Theme";

const ProfileHeaderRight: FC<{ organizer: string; navigation: any }> = (props) => {
  const [loading, userData, setUserData] = useStateWithFireStoreDocument("users", getFirebaseUserIDOrEmpty());

  const [visible, setVisible] = useState(false);
  const [blockVisible, setBlockVisible] = useState(false);

  if (loading) {
    return <MaterialCommunityIcons name="dots-vertical" color={colours.black} size={30} />;
  }

  return (
    <View style={{ backgroundColor: colours.white, flexDirection: "row" }}>
      <MaterialCommunityIcons name="dots-vertical" color={colours.black} size={30} onPress={() => setVisible(true)} />

      <Dialog isVisible={visible} onDismiss={() => setVisible(false)} style={{ backgroundColor: colours.white }}>
        <CustomButton
          buttonName="Block"
          onPress={() => {
            setBlockVisible(true);
            setVisible(false);
          }}
        />
        <Button
          style={{
            paddingHorizontal: 10,
            borderRadius: 15,
            marginVertical: "1%",
          }}
          color={"transparent"}
          titleStyle={{ color: colours.purple, fontWeight: "600" }}
          title={"Cancel"}
          onPress={() => {
            setVisible(false);
          }}
        />
      </Dialog>
      {/* Block dialog */}
      <Dialog isVisible={blockVisible} onDismiss={() => setBlockVisible(false)} style={{ backgroundColor: colours.white }}>
        <Text style={{ ...fonts.regular, textAlign: "center" }}>
          Blocking will block all events from this organizer. You will not be able to see any of their events on your feed. You can unblock anytime in settings.
        </Text>
        <CustomButton
          buttonName="Block"
          onPress={() => {
            setUserData({
              ...userData,
              blocked: [...(userData?.blocked ?? []), props.organizer],
            });
            setBlockVisible(false);
            setVisible(false);
            props.navigation.pop();
          }}
        />
        <Button
          style={{
            paddingHorizontal: 10,
            borderRadius: 15,
            marginVertical: "1%",
          }}
          color={"transparent"}
          titleStyle={{ color: colours.purple, fontWeight: "600" }}
          title={"Cancel"}
          onPress={() => {
            setBlockVisible(false);
            setVisible(false);
          }}
        />
      </Dialog>
    </View>
  );
};

export default ProfileHeaderRight;
