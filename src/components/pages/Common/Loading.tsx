import { FC } from "react";
import { View, ActivityIndicator } from "react-native";
import { colours } from "../../subatoms/Theme";

export const Loading: FC = () => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <ActivityIndicator size="large" color={colours.purple} />
    </View>
  );
};
