import { colours, fonts } from "../subatoms/Theme";
import React from "react";
import { Dialog } from "react-native-elements";
import { Button } from "@rneui/base";
import { Text, View } from "react-native";
import CustomButton from "../atoms/CustomButton";

interface LoginDialogProps {
  visible: boolean;
  setVisible: (visible: boolean) => void;
  reason: string;
  navigation: any;
}

/// Dialog when user is not signed in and tries to do something that requires them to be signed in
export const LoginDialog = ({ visible, setVisible, reason, navigation }: LoginDialogProps) => {
  return (
    <Dialog isVisible={visible} onDismiss={() => {}} style={{ backgroundColor: colours.white }}>
      <Text style={{ ...fonts.regular, textAlign: "center" }}>{reason}</Text>
      <CustomButton
        buttonName="Login"
        onPress={() => {
          setVisible(false);
          navigation.navigate("Welcome");
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
  );
};
