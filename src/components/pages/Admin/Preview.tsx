import { View } from "react-native";
import { useState } from "react";
import { Button, Image, Text } from "@rneui/themed";
import { Input } from "@rneui/base";
import { StyleSheet } from "react-native";
import { defaultStudent, Student } from "../../../utils/model/Student";
import { Avatar } from "react-native-elements";
import { useSateWithFireStore } from "../../../utils/useStateWithFirebase";
import { getFirebaseUserID } from "../../../utils/util";
import { getAuth, signOut } from "firebase/auth";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "./main";
import Event from "../../organisms/Event";

type props = NativeStackScreenProps<RootStackParamList, "Preview">;
// To access the type of user, use route.params.userType

const Preview = ({ route, navigation }: props) => {
  return (
    <Event
      id={route.params.eventId}
      navigation={navigation}
      userType="student"
      onSaveEvent={() => {}}
    />
  );
};

export default Preview;
