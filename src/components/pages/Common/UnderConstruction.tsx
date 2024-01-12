import { View } from "react-native";
import { windowWidth } from "../../subatoms/Theme";
import { EmojiImage } from "../../organisms/EmojiImage";
import { CustomText } from "../../atoms/CustomText";

export const UnderConstruction = () => {
  return (
    <View style={{ width: windowWidth * 0.5, margin: "auto" }}>
      <EmojiImage emoji="🏗️" />
      <CustomText style={{ textAlign: "center", fontSize: 18, marginVertical: 30 }}>This page is temporarily under construction.</CustomText>
    </View>
  );
};
