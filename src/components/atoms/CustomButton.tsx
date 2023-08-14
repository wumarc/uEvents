import { Button } from "@rneui/themed";
import { borderRadius, colours } from "../subatoms/Theme";

interface buttonProps {
    buttonName: string;
    onPressListener: any;
    disabled?: boolean;
}

const CustomButton = ({buttonName, onPressListener, disabled}: buttonProps) => {

    return (
        <Button
            style={{
                // paddingHorizontal: '2.5%',
                borderRadius: borderRadius.large,
                marginVertical: '1%'
            }}
            buttonStyle={{borderRadius: borderRadius.small}}
            color={colours.purple}
            title={buttonName}
            onPress={onPressListener}
            disabled={disabled}
        />
    );

}

export default CustomButton;