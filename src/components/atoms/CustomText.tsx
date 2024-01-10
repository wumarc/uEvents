import { Text } from "react-native";
import { TextProps } from "react-native-elements";
import { colours, fonts } from "../subatoms/Theme";

interface CustomTextProps extends TextProps {}

// TODO: Define different sizes

export const CustomText = (props: CustomTextProps) => {
  return (
    <Text {...props} style={[fonts.regular, props.style]}>
      {props.children}
    </Text>
  );
};
