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
                paddingHorizontal: 10,
                borderRadius: borderRadius.medium,
                marginVertical: '1%'
            }}
            
            color={colours.purple}
            title={buttonName}
            onPress={onPressListener}
            disabled={disabled}
        />
    );

}





export default CustomButton;