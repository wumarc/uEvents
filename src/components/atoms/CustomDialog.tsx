import { colours } from "../subatoms/Theme";
import React from "react";
import { ButtonProps, Dialog, OverlayProps } from "react-native-elements";
import { Button } from "@rneui/base";
import { CustomButton } from "../atoms/CustomButton";
import { CustomText } from "./CustomText";

interface CustomDialogProps {
  dialogProps?: OverlayProps;
  buttonProps?: ButtonProps;
  buttons?: CustomDialogButton[];
  includeCancel?: boolean;
  cancelOnPress?: any; // Extra action on cancel button press
  visible: boolean;
  setVisible: (visible: boolean) => void;
  children?: any;
  navigation: any;
}

type CustomDialogButton = {
  buttonName: string;
  onPress: any;
};

export const CustomDialog = (props: CustomDialogProps) => {
  return (
    <Dialog
      {...props.dialogProps}
      isVisible={props.visible}
      onDismiss={() => {
        props.setVisible(false);
      }}
      style={{ backgroundColor: colours.white }}
    >
      {/* If children is a string */}
      {typeof props.children === "string" ? (
        <CustomText style={{ textAlign: "center", fontSize: 18, marginVertical: 30 }}>{props.children}</CustomText>
      ) : (
        props.children
      )}
      {props.buttons?.map((button, index) => {
        return <CustomButton {...props.buttonProps} title={button.buttonName} onPress={button.onPress} key={index} />;
      })}
      {props.includeCancel && (
        <Button
          {...props.buttonProps}
          style={{
            paddingHorizontal: 10,
            borderRadius: 15,
            marginVertical: "1%",
          }}
          color={"transparent"}
          titleStyle={{ color: colours.purple, fontWeight: "600" }}
          title={"Cancel"}
          onPress={() => {
            props.setVisible(false);
            if (props.cancelOnPress) {
              props.cancelOnPress();
            }
          }}
        />
      )}
    </Dialog>
  );
};
