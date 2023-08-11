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
import { colours, fonts, spacing } from "../../subatoms/Theme";

type props = NativeStackScreenProps<RootStackParamList, "Search">;
// To access the type of user, use route.params.userType

const CreateEvent = ({ route, navigation }: props) => {

  const [event, setEvent] = useState<EventObject>(defaultEvent);

  return (
    <View style={styles.container}>

        <ScrollView>

          <View style={styles.pageTitle}>
            <Text style={fonts.title1}>Create event</Text>
          </View>
          
          {/* Form */}
          <View style={spacing.verticalMargin1}>
            <Step1/>
          </View>

          {/* <View>
            <CustomButton buttonName={"Add Event"}
              onPressListener={() => {
                // Adding the event to the database
                event.id = uid();
                addDocumentToCollection<EventObject>("events", event.id, event);
                navigation.pop();
              }}
            />
          </View> */}

        </ScrollView>

        {/* Footer */}
        <Button
            buttonStyle={{backgroundColor: colours.purple, padding: 10, borderRadius: 10}}
            title={"Start"}
            onPress={() => {navigation.navigate('Step2')}}
            titleStyle={{...fonts.title2, color: colours.white}}
        />

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colours.white,
    paddingHorizontal: '1%',
  },
  pageTitle: {
    flexDirection: "row",
    padding: "3%",
  }
});

export default CreateEvent;
