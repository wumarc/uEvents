import { Button } from "@rneui/themed";
import { borderRadius, colours } from "../subatoms/Theme";

interface buttonProps {
  buttonName?: string;
  onPress?: any;
  disabled?: boolean;
  children?: any;
  style?: any;
}

const CustomButton = ({ buttonName, onPress, disabled, children, style }: buttonProps) => {
  return (
    <Button
      style={{
        // paddingHorizontal: '2.5%',
        borderRadius: borderRadius.large,
        marginVertical: "1%",
        ...style,
      }}
      buttonStyle={{ borderRadius: borderRadius.small }}
      color={colours.purple}
      title={buttonName}
      onPress={onPress}
      disabled={disabled}
    >
      {children}
    </Button>
  );
};

export default CustomButton;
