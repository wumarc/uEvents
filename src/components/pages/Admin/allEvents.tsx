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
  const [loading, events, add] =
    useStateWithFireStoreCollection<EventObject>("events");

  if (loading) {
    return <Text>Loading</Text>;
  }

  return (
    <View>
      <FlatList
        data={events?.sort((a, b) => a.name.localeCompare(b.name))} // Sort by alphabetical order
        renderItem={({ item }) => <EventItem event={item} />}
      />
    </View>
  );
};

export default Profile;

const EventItem: FC<{ event: EventObject }> = ({ event }) => {
  return (
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
        <Text>{event.name}</Text>
      </View>

      <View
        style={{
          marginLeft: 40,
          height: 40,
        }}
      >
        <Button onPress={() => {}}>Edit</Button>
      </View>
      <View
        style={{
          marginLeft: 40,
          height: 40,
        }}
      >
        <Button color="error" onPress={() => {}}>
          Delete
        </Button>
      </View>
    </View>
  );
};
