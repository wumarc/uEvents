import { FC } from "react";
import { View, Text } from "react-native";

export const Error: FC<{ message: string }> = (props) => {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Error: {props.message}</Text>
    </View>
  );
};
