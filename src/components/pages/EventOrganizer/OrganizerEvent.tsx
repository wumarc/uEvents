import { View, Text, Touchable, TouchableOpacity } from "react-native";
import { Icon } from "@rneui/base";
import { colours, fonts, spacing } from "../../subatoms/Theme";

const OrganizerEvent = () => {

    return (
      <TouchableOpacity
        onPress={() => console.log("Pressed")}
      >
        <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', ...spacing.verticalPadding1}}>
            
            <View>
              <Text style={{...fonts.title2, color: colours.purple}}>Tuesday Salsa</Text>
              <Text style={fonts.title3}>June 13 2023</Text>
              <Text style={fonts.title3}>10 PM - 4 PM</Text>
            </View>
            
            <View>
              <Text style={fonts.title3}>345 Clicks</Text>
            </View>

            <View>
              <Icon
                  reverse
                  name='chevron-forward-outline'
                  type='ionicon'
                  color='transparent'
                  size={20}
                  iconStyle={fonts.title3}
                  // containerStyle={{padding: 0, margin: 2}}
                />
            </View>

        </View>
      </TouchableOpacity>
    )

}


export default OrganizerEvent;