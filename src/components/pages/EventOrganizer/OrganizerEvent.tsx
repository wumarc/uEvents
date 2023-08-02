import { View, Text } from "react-native";
import { Icon } from "@rneui/base";

const OrganizerEvent = () => {

    return (
        <View>
            <View style={{marginBottom: 3}}>
          
          <View style={{flexDirection: 'row', justifyContent: 'space-between', flex: 1}}>
            
            <View 
              style={{
                flexDirection: 'row', 
                alignItems: 'center',
                padding: 0,
                margin: 0
              }}
            >
              <Icon
                reverse
                // name={findIconByKey(buttonName)}
                // type={findTypebyKey(buttonName)}
                color='transparent'
                size={13}
                iconStyle={{fontSize: 17}}
                // containerStyle={{padding: 0, margin: 2}}
              />
              <Text style={{fontSize: 18, fontWeight: '600', color: 'white'}}>
                {""}
              </Text>
            </View>

            <View>
              <Icon
                reverse
                name='chevron-forward-outline'
                type='ionicon'
                color='transparent'
                size={18}
                iconStyle={{fontSize: 18}}
                // containerStyle={{padding: 0, margin: 2}}
              />
            </View>

          </View>

      </View>


            
            <View>
                <Text>Weekly Salsa</Text>
                <Text>June 21 2023</Text>
            </View>

            <View></View>

        </View>
    )

}


export default OrganizerEvent;