import { FC } from "react";
import { View, Text } from "react-native";

export const Error: FC<{ message: string }> = (props) => {
  return (
    <View>
      <Text>Error: {props.message}</Text>
    </View>
  );
};
