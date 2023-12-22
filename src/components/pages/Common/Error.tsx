import { FC } from "react";
import { View, Text } from "react-native";
import { fonts } from "../../subatoms/Theme";

export const Error: FC<{ message: string }> = (props) => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={fonts.title3}>{props.message}</Text>
    </View>
  );
};
