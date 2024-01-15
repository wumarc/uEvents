import { Button } from "@rneui/themed";
import { borderRadius, colours } from "../subatoms/Theme";
import { ButtonProps } from "react-native-elements";
import { Children } from "react";

interface CustomButtonProps {
  size?: "sm" | "md" | "lg";
  style?: any;
  onPress?: any;
  children?: any;
  title?: string;
  disabled?: boolean;
}

export const CustomButton = (props: CustomButtonProps) => {
  return (
    <Button
      style={{
        borderRadius: borderRadius.large,
        marginVertical: "1%",
        paddingLeft: 10,
        paddingRight: 10,
        ...(props.style as any),
      }}
      buttonStyle={{ borderRadius: borderRadius.small }}
      color={colours.purple}
      size={props.size ?? "md"}
      onPress={props.onPress}
      disabled={props.disabled}
      title={props.title}
    >
      {props.children}
    </Button>
  );
};
