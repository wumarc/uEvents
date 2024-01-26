import { Platform, View } from "react-native";
import { Text } from "react-native-elements";
import { styles } from "./Home";
import { colours, fonts, spacing, windowWidth } from "../../subatoms/Theme";
import EventDetails from "./EventDetails";

export const TicketsPage = () => {
  return (
    <View style={styles.container}>
      
      <View style={{padding: '3%'}}>
        <Text style={fonts.title1}>Tickets</Text>
      </View>

      <View style={{ alignItems: Platform.OS == "web" ? "flex-start" : "center", ...spacing.verticalMargin1 }}>
          <EventDetails/>
      </View>

    </View>
  );
};