import { Input } from "react-native-elements";
import * as React from "react";
import { colours } from "../subatoms/colours";

interface inputProps {
    input: string,
    placeholder: string,
    onChangeListener: any
    secureText: boolean
}

const InputWithLabel = ({input, placeholder, onChangeListener, secureText}: inputProps) => {
    return (
        <Input
            label={placeholder}
            labelStyle={{color: 'grey', padding: '1%'}}
            labelProps={{}}
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
                // paddingVertical: 4,
                paddingHorizontal: 8,
                borderRadius: 6,
                underlineColor: "transparent"
            }}
            errorStyle={{}}
            errorProps={{}}
            inputStyle={{ outlineStyle: "none" }}
            leftIconContainerStyle={{}}
            rightIconContainerStyle={{}}
        />
    );
}

export default InputWithLabel;