import { FlatList, View } from "react-native";
import { FC, useState } from "react";
import { Button, Image, Text } from "@rneui/themed";
import { Input } from "@rneui/base";
import { StyleSheet } from "react-native";
import { defaultStudent, Student } from "../../../utils/model/Student";
import { Avatar } from "react-native-elements";
import {
  useSateWithFireStore,
  useSateWithFireStoreArray,
  useStateWithFireStoreCollection,
} from "../../../utils/useStateWithFirebase";
import { getFirebaseUserID } from "../../../utils/util";
import { getAuth, signOut } from "firebase/auth";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "./main";
import { EventObject } from "../../../utils/model/EventObject";

type props = NativeStackScreenProps<RootStackParamList, "Profile">;
// To access the type of user, use route.params.userType

const Profile = ({ route, navigation }: props) => {
  const [loading, events, add, del] =
    useStateWithFireStoreCollection<EventObject>("events");

  if (loading) {
    return <Text>Loading</Text>;
  }

  return (
    <View>
      <FlatList
        data={events?.sort((a, b) => a.name.localeCompare(b.name))} // Sort by alphabetical order
        renderItem={({ item }) => (
          <View
            style={{
              margin: 10,
              width: "100%",
              display: "flex",
              flexDirection: "row",
              height: 40,
            }}
          >
            <View
              style={{
                height: 40,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text>{item.name}</Text>
            </View>

            <View
              style={{
                marginLeft: 40,
                height: 40,
              }}
            >
              <Button
                onPress={() => {
                  navigation.navigate("EditEvent", { eventId: item.id });
                }}
              >
                Edit
              </Button>
            </View>
            <View
              style={{
                marginLeft: 40,
                height: 40,
              }}
            >
              <Button
                color="error"
                onPress={() => {
                  del(item.id);
                }}
              >
                Delete
              </Button>
            </View>
            <View
              style={{
                marginLeft: 40,
                height: 40,
              }}
            >
              <Button
                color="green"
                onPress={() => {
                  navigation.navigate("Preview", { eventId: item.id });
                }}
              >
                View
              </Button>
            </View>
          </View>
        )}
      />
    </View>
  );
};

export default Profile;
