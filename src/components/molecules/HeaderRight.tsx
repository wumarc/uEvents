import { colours } from "../subatoms/Theme";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { FC } from "react";
import {
  useSateWithFireStore,
  useStateWithFireStoreDocument,
} from "../../utils/useStateWithFirebase";
import { getFirebaseUserIDOrEmpty } from "../../utils/util";

const HeaderRight: FC<{ eventID: string }> = (props) => {
  const [loading, userData, setUserData] = useStateWithFireStoreDocument(
    "users",
    getFirebaseUserIDOrEmpty()
  );

  if (loading) {
    return (
      <MaterialCommunityIcons name="heart" color={colours.black} size={30} />
    );
  }

  const saved = (userData?.saved ?? []).includes(props.eventID);

  return (
    <View style={{backgroundColor: colours.white, flexDirection: 'row'}}>  
      <MaterialCommunityIcons
        name={saved ? "heart" : "heart-outline"}
        color={saved ? colours.purple : colours.black}
        size={30}
        onPress={() => {
          if (saved) {
            setUserData({
              saved: (userData?.saved ?? []).filter(
                (id: string) => id !== props.eventID
              ),
            });
          } else {
            setUserData({
              saved: [...(userData?.saved ?? []), props.eventID],
            });
          }
        }}
      />
      <MaterialCommunityIcons
        name="dots-vertical"
        color={colours.black}
        size={30}
        onPress={() => {
          console.log("open menu")
        }}
      />
    </View>
  );
};

export default HeaderRight;
