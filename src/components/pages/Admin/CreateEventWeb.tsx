import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "./main";
import { ScrollView, View, Text } from "react-native";
import { Step1, Step2, Step3, Step4, Step5, Step6, Step7, Step8 } from "../EventOrganizer/CreateEvent";
import { useEffect, useState } from "react";
import { uid } from "../../../utils/util";
import { useStateWithFireStoreDocument } from "../../../utils/useStateWithFirebase";
import { EventObject, defaultEvent } from "../../../utils/model/EventObject";
import { Timestamp, doc, setDoc } from "firebase/firestore";
import { fireStore } from "../../../firebaseConfig";
import { Loading } from "../Common/Loading";
import { blue600 } from "react-native-paper/lib/typescript/src/styles/themes/v2/colors";
import CustomButton from "../../atoms/CustomButton";
import { Button } from "@rneui/themed";
import { Input } from "react-native-elements";
import { Dropdown } from "react-native-element-dropdown";

type props = NativeStackScreenProps<RootStackParamList, "Profile">;
// To access the type of user, use route.params.userType

// If navigation id is present, we are editing an event
// If not, we are creating an event
export const CreateEventWeb = ({ route, navigation }: props) => {

  const [id, setId] = useState(uid());
  const [loading, event, set] = useStateWithFireStoreDocument<EventObject>(
    "events",
    id
  );
  const [localEvent, setLocalEvent] = useState<EventObject>(defaultEvent);    

  if (loading) {
    return <Loading />;
  }

    return (
        <View>
            <Button onPress={() => {
                console.log(localEvent);
            }}>Log Event</Button>
            <Input
                placeholder="Name"
                value={localEvent.name}
                onChangeText={(text) => {
                    setLocalEvent({...localEvent, name: text});
                }}
            />
            <Dropdown
          search
          searchPlaceholder="Choose organizer"
          placeholderStyle={{ fontSize: 17, padding: 7}}
          data={organizerData}
          labelField="label"
          valueField="value"
          placeholder={findOrganizerName(event.organizer)}
          style={{borderWidth: 1, borderColor: colours.grey, borderRadius: 6, height: windowHeight*0.05}}
          onChange={(item) => set({...event, organizer: item.value, organizerType: "Organizer Added"})}
        />  
        </View>
    )

}