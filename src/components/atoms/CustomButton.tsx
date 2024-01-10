import { Button } from "@rneui/themed";
import { borderRadius, colours } from "../subatoms/Theme";
import { ButtonProps } from "react-native-elements";

export const CustomButton = (props: ButtonProps) => {
  return (
    <Button
      {...props}
      style={{
        borderRadius: borderRadius.large,
        marginVertical: "1%",
        ...(props.style as any),
      }}
      buttonStyle={{ borderRadius: borderRadius.small }}
      color={colours.purple}
    ></Button>
  );
};
