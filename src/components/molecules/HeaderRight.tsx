import { colours } from "../subatoms/Theme";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

const HeaderRight = ({navigation, saved}: any) => {

    return (
        <TouchableOpacity onPress={() => console.log("Unsave")}>
            <MaterialCommunityIcons
                name={saved ? "heart" : "heart-outline"}
                color={saved ? colours.purple : colours.black}
                size={30}
            />
        </TouchableOpacity>
    )

}

export default HeaderRight;