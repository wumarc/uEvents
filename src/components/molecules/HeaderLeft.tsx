import { colours } from "../subatoms/colours";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

const HeaderLeft = ({navigation}: any) => {

    return (
        <TouchableOpacity onPress={() => navigation.pop()}>
            <MaterialCommunityIcons
                name="arrow-left"
                color={colours.black}
                size={30}
            />
        </TouchableOpacity>
    )

}

export default HeaderLeft;