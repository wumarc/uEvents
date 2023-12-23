import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "./main";
import { ScrollView, View } from "react-native";
import { Step1, Step2, Step3, Step4, Step5, Step6, Step7, Step8 } from "../EventOrganizer/CreateEvent";
import { useEffect, useState } from "react";
import { uid } from "../../../utils/util";
import { useStateWithFireStoreDocument } from "../../../utils/useStateWithFirebase";
import { EventObject } from "../../../utils/model/EventObject";
import { Timestamp, doc, setDoc } from "firebase/firestore";
import { fireStore } from "../../../firebaseConfig";
import { Loading } from "../Common/Loading";
import { blue600 } from "react-native-paper/lib/typescript/src/styles/themes/v2/colors";
import CustomButton from "../../atoms/CustomButton";

type props = NativeStackScreenProps<RootStackParamList, "Profile">;
// To access the type of user, use route.params.userType

const stateOrder = ["Pending", "Published", "Rejected", "Draft"];

export const OnePageCreateEvent = ({ route, navigation }: props) => {
  const [id, setId] = useState(uid());
  const [freeEventProps, setFreeEventProps] = useState<any>(null);
  const [loading, event, set] = useStateWithFireStoreDocument<EventObject>("events", id);

  useEffect(() => {
    setDoc(doc(fireStore, "events/" + id), {
      id: id,

      // Default event
      state: "Draft",
      name: "",
      description: "",
      startTime: new Timestamp(0, 0),
      location: "",
      categories: [],
      onCampus: true,
      images: [],
      priceMin: 0,
      originalLink: "",
      address: "",
      // recurrence: new recurrence("None"),
      organizerType: "Organizer Added",
    });
  }, []);

  if (loading) {
    return <Loading />;
  }

  const isAdmin = true;

  return (
    <ScrollView style={{ margin: 20 }}>
      <Step1 eventID={id} isAdmin={true} />
      <View style={{ height: 20, borderTopWidth: 5 }} />
      <Step2 eventID={id} />
      <View style={{ height: 20, borderTopWidth: 5 }} />
      <Step3 eventID={id} setStep={() => {}} />
      <View style={{ height: 20, borderTopWidth: 5 }} />
      <Step4 eventID={id} />
      <View style={{ height: 20, borderTopWidth: 5 }} />
      <Step5 eventID={id} />
      <View style={{ height: 20, borderTopWidth: 5 }} />
      <Step6 eventID={id} />
      <View style={{ height: 20, borderTopWidth: 5 }} />
      <Step7 eventID={id} isAdmin={true} />
      <View style={{ height: 20, borderTopWidth: 5 }} />
      <Step8 eventID={id} />
      <View style={{ height: 20, borderTopWidth: 5 }} />
      <CustomButton
        buttonName="Submit"
        onPress={() => {
          navigation.pop();
        }}
      />
    </ScrollView>
  );
};
