import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from "react-native";
import { mockEventClimbing } from "../../utils/model/EventObject";
import { ScreenSpacing } from "../subatoms/Spacing";
import Event from "../organisms/Event";
import Ticket from "../organisms/Ticket";
import { Title } from "../subatoms/Spacing";

let placeholders = ['1', '1', '1', '1', '1']

const EventsTickets = ({navigation}: any) => {
  
  return (
    <View style={styles.container}>
        <ScrollView
          style={{backgroundColor: "blue"}}
          horizontal
          pagingEnabled
          nestedScrollEnabled
          showsHorizontalScrollIndicator={true}
        >
          {placeholders.map((child, index) => (
            
              <Ticket />
            
          ))}
        </ScrollView>
    </View>
  );

};

const styles = StyleSheet.create({
  container: {
    // padding: ScreenSpacing.paddingHorizontal,
    flex: 1,
    backgroundColor: 'red',
  },
  ticket: {
    flex: 1,
    justifyContent: 'center',
  }

})


export default EventsTickets;
