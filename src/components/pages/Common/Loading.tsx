import { FC } from "react";
import { View, Text } from "react-native";
import { ActivityIndicator } from "react-native";

export const Loading: FC = () => {
  return (
    <View>
      <ActivityIndicator/>
    </View>
  );
};
