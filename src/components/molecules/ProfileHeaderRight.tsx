import { FC, useState } from "react";
import { View } from "react-native";
import { colours } from "../subatoms/Theme";
import { Menu } from "react-native-paper";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const ProfileHeaderRight: FC<{ eventID: string }> = (props) => {

    const [visible, setVisible] = useState(false);

    return (
        <View style={{backgroundColor: colours.white, flexDirection: 'row'}}>          
          <Menu
            visible={visible}
            onDismiss={() => setVisible(false)}
            style={{backgroundColor: colours.white}}
            contentStyle={{backgroundColor: colours.white}}
            anchor={
              <MaterialCommunityIcons
                name="dots-vertical"
                color={colours.black}
                size={30}
                onPress={() => setVisible(true)}
              />
            }
          >
            <Menu.Item onPress={() => {}} title="Report" />
            <Menu.Item onPress={() => {}} title="Block user" />
          </Menu>
        </View>
    );

}

export default ProfileHeaderRight;