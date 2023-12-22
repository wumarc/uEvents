import { colours } from "../subatoms/Theme";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { Modal, TouchableOpacity } from "react-native";
import { Text } from "react-native-elements";

const HeaderLeft = ({ navigation, type }: any) => {
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.pop();
      }}
    >
      {type == null ? (
        <MaterialCommunityIcons name={"arrow-left"} color={colours.black} size={30} />
      ) : (
        <Text
          style={{
            borderWidth: 1,
            borderRadius: 20,
            padding: 10,
            marginBottom: 3,
            borderColor: colours.primaryGrey,
            color: colours.grey,
          }}
        >
          Save & Exit
        </Text>
      )}
    </TouchableOpacity>
  );
};

export default HeaderLeft;
