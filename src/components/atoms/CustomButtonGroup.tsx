import { ButtonGroup, ButtonGroupProps } from "react-native-elements";
import { colours } from "../subatoms/Theme";
import { Button } from "react-native";

interface CustomButtonGroupProps {
  buttons: string[];
  selectedIndex?: number;
  selectedIndexes?: number[];
  onPress: (index: number) => void;
}

export const CustomButtonGroup = (props: CustomButtonGroupProps) => {
  return (
    <ButtonGroup
      buttons={props.buttons}
      selectedIndex={props.selectedIndex}
      selectedIndexes={props.selectedIndexes}
      onPress={props.onPress}
      selectedButtonStyle={{ backgroundColor: colours.purple }}
    />
  );
};
