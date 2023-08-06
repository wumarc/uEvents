import { Input } from "react-native-elements";
import * as React from "react";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { colours } from "../subatoms/Theme";

interface inputProps {
    input: string,
    placeholder: string,
    onChangeListener: any,
    disabled?: boolean
}

const SettingsInput = ({input, placeholder, onChangeListener, disabled}: inputProps) => {
    return (
        <Input
            disabled={disabled}
            disabledInputStyle={{ backgroundColor: colours.white }}
            value={input}
            onChangeText={onChangeListener}
            placeholder={placeholder}
            autoCapitalize="none"
            inputContainerStyle={{
                // borderBottomWidth: 1,
                borderColor: "black",
                borderWidth: 1,
                paddingVertical: '1%',
                paddingHorizontal: '3%',
                borderRadius: 6,
                underlineColor: "transparent"
            }}
            selectionColor={colours.purple}
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

export default SettingsInput;