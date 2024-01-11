import { Icon } from "react-native-elements";
import { View } from "react-native";
import { Button, Text } from "@rneui/themed";
import { borderRadius, colours, fonts } from "../subatoms/Theme";

interface buttonProps {
  buttonName: string;
  onPressListener: any;
  disabled?: boolean;
}

const SettingsButton = ({ buttonName, onPressListener, disabled }: buttonProps) => {
  const iconSize = 13;
  const fontSize = 23;
  const marginBottom = "4%";
  const fallbackSetting = { icon: "help-circle-outline", type: "ionicon" };
  const settingName = [
    { "My Profile": { icon: "account-outline", type: "material-community" } },
    { "Privacy Policy": { icon: "shield-lock-outline", type: "material-community" } },
    { "Contact Us": { icon: "mail-outline", type: "ionicon" } },
    { "Delete Account": { icon: "trash-outline", type: "ionicon" } },
    { "Hidden Events": { icon: "eye-off-outline", type: "ionicon" } },
    { "Blocked Organizers": { icon: "person-remove-outline", type: "ionicon" } },
  ];

  const findIconByKey = (key: any) => {
    const element: any = settingName.find((item) => key in item) ?? fallbackSetting;
    return element[key].icon;
  };

  const findTypebyKey = (key: any) => {
    const element: any = settingName.find((item) => key in item) ?? fallbackSetting;
    return element[key].type;
  };

  return (
    <View style={{ marginBottom: marginBottom }}>
      <Button
        buttonStyle={{ backgroundColor: colours.primaryGrey }}
        containerStyle={{ borderRadius: borderRadius.large }}
        onPress={onPressListener}
        disabled={disabled}
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
              iconStyle={{ fontSize: fontSize, color: disabled ? "grey" : colours.black }}
            />
            <Text style={{ ...fonts.title3, color: disabled ? "grey" : undefined }}>{buttonName}</Text>
          </View>

          <View>
            <Icon
              reverse
              name="chevron-forward-outline"
              type="ionicon"
              color="transparent"
              size={iconSize}
              iconStyle={{ ...fonts.title3, color: disabled ? "grey" : undefined }}
              // containerStyle={{padding: 0, margin: 2}}
            />
          </View>
        </View>
      </Button>
    </View>
  );
};

export default SettingsButton;
