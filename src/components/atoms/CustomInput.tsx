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
  label?: any;
  disabled?: boolean;
  onChange?: any;
  defaultValue?: string;
  leftIcon?: any;
  maxLength?: number;
}

const CustomInput = (props: inputProps) => {
  return (
    <Input
      disabledInputStyle={{ backgroundColor: "#ddd" }}
      secureTextEntry={props.secureTextEntry}
      value={props.value}
      label={props.label}
      onChangeText={props.onChangeText}
      onChange={props.onChange}
      placeholder={props.placeholder}
      defaultValue={props.defaultValue}
      leftIcon={props.leftIcon}
      maxLength={props.maxLength}
      autoCapitalize="none"
      selectionColor={colours.purple}
      selectTextOnFocus={true}
      labelStyle={{ ...fonts.regular, padding: 0, margin: 0 }}
      inputContainerStyle={{
        borderColor: colours.grey,
        borderWidth: 1,
        borderRadius: 6,
      }}
      multiline={props.multiline}
      containerStyle={props.containerStyle}
      inputStyle={[
        props.inputStyle,
        {
          paddingLeft: 8,
          paddingRight: 8,
          paddingTop: 8,
          paddingBottom: 8,
        },
      ]}
      style={[props.style, { outlineColor: colours.purple }]}
      // style={style}
      errorMessage={props.errorMessage}
      disabled={props.disabled}
    />
  );
};

export default CustomInput;
