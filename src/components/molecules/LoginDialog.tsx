import React from "react";
import { CustomDialog } from "../atoms/CustomDialog";

interface LoginDialogProps {
  visible: boolean;
  setVisible: (visible: boolean) => void;
  children?: any;
  navigation: any;
}

export const LoginDialog = (props: LoginDialogProps) => {
  return (
    <CustomDialog
      {...props}
      includeCancel
      buttons={[
        {
          buttonName: "Login",
          onPress: () => {
            props.setVisible(false);
            props.navigation.navigate("Welcome");
          },
        },
      ]}
    />
  );
};
