import { View } from "react-native";
import { Input } from "react-native-elements";
import * as React from "react";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { borderRadius, colours } from "../subatoms/Theme";

interface inputProps {
  input: string;
  placeholder: string;
  onChangeListener: any;
  secureText: boolean;
}

const CustomInput = ({ input, placeholder, onChangeListener, secureText }: inputProps) => {
  return (
    <Input
      disabledInputStyle={{ backgroundColor: "#ddd" }}
      secureTextEntry={secureText}
      value={input}
      onChangeText={onChangeListener}
      selectionColor={colours.purple}
      placeholder={placeholder}
      autoCapitalize="none"
      inputContainerStyle={{
        borderColor: colours.black,
        borderWidth: 1,
        paddingVertical: 4,
        paddingHorizontal: 10,
        borderRadius: borderRadius.medium,
      }}
      errorStyle={{}}
      errorProps={{}}
      inputStyle={{}}
      labelStyle={{}}
      labelProps={{}}
      leftIconContainerStyle={{}}
      rightIconContainerStyle={{}}
    />
  );
};

export default CustomInput;
