import { Icon } from "@rneui/base";
import { View } from "react-native";
import { Button, Text } from "@rneui/themed";
import { borderRadius, colours, fonts } from "../subatoms/Theme";

interface buttonProps {
  buttonName: string;
  onPressListener: any;
}

const SettingsButton = ({ buttonName, onPressListener }: buttonProps) => {
  const iconSize = 13;
  const fontSize = 23;
  const marginBottom = "4%";
  const settingName = [
    {"Account Settings": {icon: "account-outline",type: "material-community"}},
    {"Organization Profile": {icon: "account-outline",type: "material-community"}},
    {"Privacy Policy": {icon: "shield-lock-outline",type: "material-community"}},
    {"Contact Us": { icon: "mail-outline", type: "ionicon" }},
    {"Delete Account": { icon: "trash-outline", type: "ionicon" }},
  ];

  const findIconByKey = (key: any) => {
    const element = settingName.find((item) => key in item);
    return element[key].icon;
  };

  const findTypebyKey = (key: any) => {
    const element = settingName.find((item) => key in item);
    return element[key].type;
  };

  return (
    <View style={{ marginBottom: marginBottom }}>
      <Button
        buttonStyle={{ backgroundColor: colours.primaryGrey }}
        containerStyle={{ borderRadius: borderRadius.large }}
        onPress={onPressListener}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            flex: 1,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              padding: 0,
              margin: 0,
            }}
          >
            <Icon
              reverse
              name={findIconByKey(buttonName)}
              type={findTypebyKey(buttonName)}
              color="transparent"
              size={iconSize}
              iconStyle={{ fontSize: fontSize, color: colours.black }}
            />
            <Text style={fonts.title3}>{buttonName}</Text>
          </View>

          <View>
            <Icon
              reverse
              name="chevron-forward-outline"
              type="ionicon"
              color="transparent"
              size={iconSize}
              iconStyle={fonts.title3}
              // containerStyle={{padding: 0, margin: 2}}
            />
          </View>
        </View>
      </Button>
    </View>
  );
};

export default SettingsButton;
