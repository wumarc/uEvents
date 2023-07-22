import { Icon } from "@rneui/base";
import { View } from "react-native";
import { Button, Text } from "@rneui/themed";
import { colours } from "../subatoms/colours";

const SettingsButton = ({buttonName, margin}: any) => {

    const iconSize= 15
    const fontSize= 30
    const marginBottom = '4%'
    const settingName = [
        {"Account Settings": {icon: 'cog-outline', type: 'ionicon'}},
        {"Privacy Policy": {icon: 'shield-lock-outline', type: 'material-community'}},
        {"Support": {icon: 'help-circle-outline', type: 'ionicon'}},
        {"Delete Account": {icon: 'trash-outline', type: 'ionicon'}},
    ]

    const findIconByKey = (key: any) => {
        const element = settingName.find(item => key in item);
        return element[key].icon;
    }

    const findTypebyKey = (key: any) => {
        const element = settingName.find(item => key in item);
        return element[key].type;
    }

    return (
      <View style={{marginBottom: marginBottom}}>
        <Button
          buttonStyle={{backgroundColor: colours.pastelSecondaryPurple}}
          containerStyle={{borderRadius: 15}}
          onPress={() => {}}
        >
          
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
                name={findIconByKey(buttonName)}
                type={findTypebyKey(buttonName)}
                color='transparent'
                size={iconSize}
                iconStyle={{fontSize: fontSize}}
                // containerStyle={{padding: 0, margin: 2}}
              />
              <Text style={{fontSize: 20, fontWeight: '600', color: 'white'}}>
                {buttonName}
              </Text>
            </View>

            <View>
              <Icon
                reverse
                name='chevron-forward-outline'
                type='ionicon'
                color='transparent'
                size={iconSize}
                iconStyle={{fontSize: fontSize}}
                // containerStyle={{padding: 0, margin: 2}}
              />
            </View>

          </View>

        </Button>
      </View>
    );

}

export default SettingsButton;