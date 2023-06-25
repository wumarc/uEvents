import { Button } from "@rneui/themed";
import { colours } from "../subatoms/colours";

interface buttonProps {
    buttonName: string;
    onPressListener: any;
}

const CustomButton = ({buttonName, onPressListener}: buttonProps) => {

    return (
        <Button
          color={colours.primaryPurple}
          title={buttonName}
          onPress={onPressListener}
        />
    );

}





export default CustomButton;