import { Button } from "@rneui/themed";
import { colours } from "../subatoms/colours";

interface buttonProps {
    buttonName: string;
    onPressListener: any;
}

const CustomButton = ({buttonName, onPressListener}: buttonProps) => {

    return (
        <Button
            style={{
                paddingHorizontal: 10,
                borderRadius: 15,
                marginVertical: '1%'
            }}
            color={colours.primaryPurple}
            title={buttonName}
            onPress={onPressListener}
            
        />
    );

}





export default CustomButton;