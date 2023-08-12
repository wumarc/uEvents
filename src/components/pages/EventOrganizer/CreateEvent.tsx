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
import { Step1, Step2, Step3, Step4, Step5, Step6, Step7, Step8, Step9 } from "./EventCreationSteps";
import { Button } from "react-native-elements";
import { colours, fonts, spacing, windowHeight } from "../../subatoms/Theme";

type props = NativeStackScreenProps<RootStackParamList, "Search">;
// To access the type of user, use route.params.userType




const CreateEvent = ({ route, navigation }: props) => {

  const [event, setEvent] = useState<EventObject>(defaultEvent);
  
  return (
    <View style={{flex: 1, backgroundColor: colours.white, paddingHorizontal: spacing.page}}>
          {/*<CustomButton buttonName={"Add Event"} // Adding the event to the database
            onPressListener={() => { event.id = uid(); addDocumentToCollection<EventObject>("events", event.id, event); navigation.pop() }} />*/}
        <ScrollView style={{height: windowHeight, backgroundColor: 'red'}}>
          <View style={{flex: 1, height: '100%', justifyContent: 'center'}}>

              <View>
                <Text style={fonts.title1}>Create Event</Text>
              </View>
              
              <View>
                <Text style={fonts.title3}>Creating an event is easy. We will guide you through every step</Text>
              </View>

              <Button
                buttonStyle={{backgroundColor: colours.purple, padding: 10, borderRadius: 10}}
                title={"Start"}
                onPress={() => {navigation.navigate('Step0')}}
                titleStyle={{...fonts.title2, color: colours.white}}
              />
          </View>
        </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
});

export default CreateEvent;
