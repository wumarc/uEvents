import { CheckBox } from "react-native-elements";
import { borderRadius, colours } from "../subatoms/Theme";

interface CustomCheckBoxProps {
  title: string;
  checked: boolean | undefined;
  onPress: () => void;
}

export const CustomCheckBox = (props: CustomCheckBoxProps) => {
  return (
    <CheckBox
      title={props.title}
      checked={props.checked}
      onPress={props.onPress}
      containerStyle={{ borderRadius: borderRadius.small }}
      textStyle={{ fontWeight: "normal" }}
      checkedColor={colours.purple}
    />
  );
};
