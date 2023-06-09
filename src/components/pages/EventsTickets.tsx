import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from "react-native";
import { mockEventClimbing } from "../../utils/model/EventObject";
import { ScreenSpacing } from "../subatoms/Spacing";
import Event from "../organisms/Event";
import Ticket from "../organisms/Ticket";
import { Title } from "../subatoms/Spacing";

let placeholders = ['1', '1', '1', '1', '1']

const EventsTickets = ({navigation}: any) => {
  
  return (
    <View>
      <Ticket />
    </View>
  );

};


const styles = StyleSheet.create({
  container: {
    padding: ScreenSpacing.paddingHorizontal,
  },
  title: {
    fontSize: Title.fontSize,
    // fontWeight: Title.fontWeight,
  }
})


export default EventsTickets;
