import { View } from "react-native";
import { Input } from "react-native-elements";

interface inputProps {
    input: string,
    placeholder: string,
    onChangeListener: any
}

const CustomInput = ({input, placeholder, onChangeListener}: inputProps) => {
    return (
        <View>
            <Input
                placeholder={placeholder}
                value={input}
                onChangeText={onChangeListener}
            />
        </View>
    );
}

export default CustomInput;