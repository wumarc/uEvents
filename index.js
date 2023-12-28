import { registerRootComponent } from "expo";

import App from "./App";

// Create testApp component
import React from "react";
import { View, Text } from "react-native";
const testApp = () => {
  return (
    <View>
      <Text>Test App</Text>
    </View>
  );
};

// AppRegistry.registerComponent("main", () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(App);
