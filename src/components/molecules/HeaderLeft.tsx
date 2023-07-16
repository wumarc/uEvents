import { colours } from "../subatoms/colours";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { TouchableOpacity } from "react-native";

const HeaderLeft = ({navigation}: any) => {

    return (
        <TouchableOpacity onPress={navigation.pop()}>
            <MaterialCommunityIcons
            name="arrow-left"
            color={colours.primaryPurple}
            size={30}
            />
        </TouchableOpacity>
    )

}

export default HeaderLeft;