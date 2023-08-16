import { colours } from "../subatoms/Theme";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { Modal, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";

const HeaderLeft = ({navigation, type}: any) => {

    // const [showModal, setShowModal] = useState(false);

    return (
        <TouchableOpacity 
            onPress={() => {
                // setShowModal(true);
                navigation.pop()
            }}
        >
            <MaterialCommunityIcons
                name={type == null ? "arrow-left" : "close"}
                color={colours.black}
                size={30}
            />
        </TouchableOpacity>
    )

}

export default HeaderLeft;