import { View } from "react-native";
import { Input } from "react-native-elements";
import * as React from "react";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { colours } from "../subatoms/colours";

interface inputProps {
    input: string,
    placeholder: string,
    onChangeListener: any
    secureText: boolean
}

const CustomInput = ({input, placeholder, onChangeListener, secureText}: inputProps) => {
    return (
        <Input
            disabledInputStyle={{ backgroundColor: "#ddd" }}
            secureTextEntry={secureText}
            value={input}
            onChangeText={onChangeListener}
            selectionColor={colours.primaryPurple}
            placeholder={placeholder}
            autoCapitalize="none"
            inputContainerStyle={{
                borderBottomWidth: 2,
                borderColor: "#bfbfbf",
                borderWidth: 2,
                paddingVertical: 4,
                paddingHorizontal: 10,
                borderRadius: 6,
                underlineColor: "transparent"
            }}
            errorStyle={{}}
            errorProps={{}}
            inputStyle={{ outlineStyle: "none" }}
            labelStyle={{}}
            labelProps={{}}
            leftIconContainerStyle={{}}
            rightIconContainerStyle={{}}
        />
    );
}

export default CustomInput;