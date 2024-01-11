import { Input } from "react-native-elements";
import * as React from "react";
import { colours, fonts } from "../subatoms/Theme";

interface inputProps {
  value?: string;
  placeholder?: string;
  onChangeText?: any;
  secureTextEntry?: boolean;
  containerStyle?: any;
  inputStyle?: any;
  style?: any;
  multiline?: boolean;
  errorMessage?: string;
  label?: string;
}

// TODO: On the web version, the selection color is blue
// TODO: An extra padding is also added on the web version on both sides of the input
const CustomInput = ({ value, placeholder, onChangeText, secureTextEntry, containerStyle, inputStyle, style, multiline, errorMessage, label }: inputProps) => {
  return (
    <Input
      disabledInputStyle={{ backgroundColor: "#ddd" }}
      secureTextEntry={secureTextEntry}
      value={value}
      label={label}
      onChangeText={onChangeText}
      placeholder={placeholder}
      autoCapitalize="none"
      selectionColor={colours.purple}
      selectTextOnFocus={true}
      labelStyle={{ ...fonts.regular, padding: 0, margin: 0 }}
      inputContainerStyle={{
        borderColor: colours.grey,
        borderWidth: 1,
        paddingVertical: 4,
        paddingHorizontal: 8,
        borderRadius: 6,
      }}
      multiline={multiline}
      containerStyle={containerStyle}
      inputStyle={inputStyle}
      style={style}
      errorMessage={errorMessage}
    />
  );
};

export default CustomInput;
