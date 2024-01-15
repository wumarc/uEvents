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
  disabled?: boolean;
  onChange?: any;
  maxLength?: number;
}

// TODO: On the web version, the selection color is blue
// TODO: An extra padding is also added on the web version on both sides of the input
const CustomInput = ({
  value,
  placeholder,
  onChangeText,
  secureTextEntry,
  containerStyle,
  inputStyle,
  style,
  multiline,
  errorMessage,
  label,
  disabled,
  onChange,
  maxLength,
}: inputProps) => {
  return (
    <Input
      disabledInputStyle={{ backgroundColor: "#ddd" }}
      secureTextEntry={secureTextEntry}
      value={value}
      label={label}
      onChangeText={onChangeText}
      onChange={onChange}
      placeholder={placeholder}
      maxLength={maxLength}
      autoCapitalize="none"
      selectionColor={colours.purple}
      selectTextOnFocus={true}
      labelStyle={{ ...fonts.regular, padding: 0, margin: 0 }}
      inputContainerStyle={{
        borderColor: colours.grey,
        borderWidth: 1,
        borderRadius: 6,
      }}
      multiline={multiline}
      containerStyle={containerStyle}
      inputStyle={[
        inputStyle,
        {
          paddingLeft: 8,
          paddingRight: 8,
          paddingTop: 8,
          paddingBottom: 8,
        },
      ]}
      style={[style, { outlineColor: colours.purple }]}
      // style={style}
      errorMessage={errorMessage}
      disabled={disabled}
    />
  );
};

export default CustomInput;
