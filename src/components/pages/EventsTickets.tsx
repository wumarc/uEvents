import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from "react-native";
import { mockEventClimbing } from "../../utils/model/EventObject";
import { ScreenSpacing } from "../subatoms/Spacing";
import Event from "../organisms/Event";
import Ticket from "../organisms/Ticket";
import { Title } from "../subatoms/Spacing";
import {Dimensions} from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

let placeholders = ['1', '1', '1', '1', '1']

const EventsTickets = ({navigation}: any) => {
  
  return (
    <View style={styles.container}>
        <ScrollView
          style={{}}
          horizontal
          pagingEnabled
          nestedScrollEnabled
          showsHorizontalScrollIndicator={true}
        >
          {placeholders.map((child, index) => (
            <View style={styles.ticket} key={index}>
              <Ticket/>
            </View>
          ))}
        </ScrollView>
    </View>
  );

};

const styles = StyleSheet.create({
  container: {
    // padding: ScreenSpacing.paddingHorizontal,
    flex: 1,
  },
  ticket: {
    paddingHorizontal: windowWidth * 0.05,
    justifyContent: 'center',
  }

})


export default EventsTickets;
