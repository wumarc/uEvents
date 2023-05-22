import { View, Text } from "react-native";
import Event from "../organisms/Event";
import { ScrollView } from "react-native";
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
} from "firebase/firestore/lite";
import { firebaseConfig } from "../../firebaseConfig";

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const SignedupEventsPage = () => {
  return (
    <ScrollView>
      <Text>Events you are going to</Text>
    </ScrollView>
  );
};

export default SignedupEventsPage;
