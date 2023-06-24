import { View } from "react-native";
import { Input } from "react-native-elements";
import * as React from "react";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

interface inputProps {
    input: string,
    placeholder: string,
    onChangeListener: any
}

const CustomInput = ({input, placeholder, onChangeListener}: inputProps) => {
    return (
        <Input
            disabledInputStyle={{ backgroundColor: "#ddd" }}
            value={input}
            onChangeText={onChangeListener}
            placeholder={placeholder}
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