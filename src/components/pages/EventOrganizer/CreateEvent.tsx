import { View, ScrollView, Text, Settings } from "react-native";
import { useState } from "react";
import { addDocumentToCollection } from "../../../utils/useStateWithFirebase";
import {
  defaultEvent,
  EventCategory,
  EventObject,
} from "../../../utils/model/EventObject";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../Student/main";
import { uid } from "../../../utils/util";
import CustomButton from "../../atoms/CustomButton";
import { StyleSheet } from "react-native";
import { Step1 } from "./EventCreationSteps";
import { Button } from "react-native-elements";

type props = NativeStackScreenProps<RootStackParamList, "Search">;
// To access the type of user, use route.params.userType

const CreateEvent = ({ route, navigation }: props) => {

  const [event, setEvent] = useState<EventObject>(defaultEvent);

  return (
    <View style={styles.container}>
        <ScrollView>

          {/* <Text style={{fontSize: 33, fontWeight: '600'}}>Create a new event</Text> */}
          
          <Button 
            onPress={() => {navigation.navigate('Step1')}}
          />
          <Step1/>

          {/* Buttons */}
          {/* <View>
            <CustomButton
              buttonName={"Add Event"}
              onPressListener={() => {
                // Adding the event to the database
                event.id = uid();
                addDocumentToCollection<EventObject>("events", event.id, event);
                navigation.pop();
              }}
            />
          </View> */}


        </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: '1%',
  },
});

export default CreateEvent;
