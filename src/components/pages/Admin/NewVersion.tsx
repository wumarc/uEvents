import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../../../main";
import { View } from "react-native";
import CustomInput from "../../atoms/CustomInput";
import { useState } from "react";
import { CustomButton } from "../../atoms/CustomButton";
import { Version } from "../../../utils/model/Version";
import { doc, setDoc } from "firebase/firestore";
import { fireStore } from "../../../firebaseConfig";

type props = NativeStackScreenProps<RootStackParamList, "NewVersion">;

export const NewVersion = ({ route, navigation }: props) => {
  // States
  const [major, setMajor] = useState<number>(0);
  const [minor, setMinor] = useState<number>(0);
  const [patch, setPatch] = useState<number>(0);
  const [message, setMessage] = useState<string>("");

  return (
    <View>
      <CustomInput
        label="Major"
        value={major.toString()}
        onChangeText={(text: any) => {
          setMajor(parseInt(text));
        }}
      />
      <CustomInput
        label="Minor"
        value={minor.toString()}
        onChangeText={(text: any) => {
          setMinor(parseInt(text));
        }}
      />
      <CustomInput
        label="Patch"
        value={patch.toString()}
        onChangeText={(text: any) => {
          setPatch(parseInt(text));
        }}
      />
      <CustomInput
        label="Message"
        value={message}
        onChangeText={(text: any) => {
          setMessage(text);
        }}
      />
      <CustomButton
        title={"Add Version (Prod)"}
        onPress={() => {
          // Adding the event to the database
          let newVersion: Version = {
            major: major,
            minor: minor,
            patch: patch,
            update: message,
          };

          setDoc(doc(fireStore, "versions", `${major}.${minor}.${patch}`), newVersion);
          navigation.pop();
        }}
      />
      <CustomButton
        title={"Add Version (Test)"}
        onPress={() => {
          // Adding the event to the database
          let newVersion: Version = {
            major: major,
            minor: minor,
            patch: patch,
            update: message,
          };

          setDoc(doc(fireStore, "versions-test", `${major}.${minor}.${patch}`), newVersion);
          navigation.pop();
        }}
      />
    </View>
  );
};
