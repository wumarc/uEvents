import { FC } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import { Image } from "react-native";
import "react-native-gesture-handler";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
const Stack = createStackNavigator();

const MainPage: FC = (props) => {
  return (
    <View style={styles.container}>
      <View
        style={{
          height: "10%",
          width: "100%",
          top: 0,
          position: "absolute",
          flex: 1,
          flexDirection: "row",
          zIndex: 50,
        }}
      >
        <View style={{ height: "100%", width: "20%" }}>
          <Image
            source={require("./assets/octo.jpeg")}
            style={{ width: "100%", height: "100%" }}
          ></Image>
        </View>
      </View>
      {/* Actual post here */}
      <View style={{ width: "100%", height: "100%" }}>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ gestureEnabled: true }}>
            <Stack.Screen component={Post1} name="Home" />
            <Stack.Screen component={Post1} name="Home2" />
          </Stack.Navigator>
        </NavigationContainer>
      </View>

      {/* End of actual post */}
      <View
        style={{
          height: "10%",
          width: "100%",
          bottom: 0,
          position: "absolute",
          flex: 1,
          flexDirection: "row",
          borderTopWidth: 2,
          borderColor: "black",
        }}
      >
        <View style={{ height: "100%", width: "20%" }}>
          <Button title="Saved"></Button>
        </View>
        <View style={{ height: "100%", width: "20%" }}>
          <Button title="Tickets"></Button>
        </View>
        <View style={{ height: "100%", width: "20%" }}>
          <Button title="Home"></Button>
        </View>
        <View style={{ height: "100%", width: "20%" }}>
          <Button title="Search"></Button>
        </View>
        <View style={{ height: "100%", width: "20%" }}>
          <Button title="Profile"></Button>
        </View>
      </View>
    </View>
  );
};

export default MainPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#fff",
    alignItems: "center",
  },
});

const Post1: FC = (props) => {
  return (
    <View style={{ height: "90%", width: "100%" }}>
      <Image
        style={{ height: "100%", width: "100%" }}
        source={require("./assets/eventEx1.webp")}
      ></Image>
    </View>
  );
};
