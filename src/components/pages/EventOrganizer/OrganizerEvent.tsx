import { View, Text, Touchable, TouchableOpacity } from "react-native";
import { Icon } from "@rneui/base";
import { colours, fonts, spacing } from "../../subatoms/Theme";
import { FC } from "react";
import { EventObject } from "../../../utils/model/EventObject";
import { Button } from "react-native-elements";

const OrganizerEvent: FC<{ event: EventObject; navigation: any }> = (props) => {
  return (
    <TouchableOpacity
      onPress={() =>
        props.navigation.navigate("EventDetailsView", {
          eventID: props.event.id,
        })
      }
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          ...spacing.verticalPadding1,
        }}
      >
        <View>
          <Text style={{ ...fonts.title2, color: colours.purple }}>
            {props.event.name}
          </Text>
          <Text style={fonts.title3}>June 13 2023</Text>
          <Text style={fonts.title3}>10 PM - 4 PM</Text>
          <Text style={fonts.title3}>345 Clicks</Text>
        </View>

        <View
          style={{
            flexDirection: "column",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text style={{ ...fonts.title3 }}>Published</Text>

            <Icon
              reverse
              name="chevron-forward-outline"
              type="ionicon"
              color="transparent"
              size={20}
              iconStyle={fonts.title3}
              // containerStyle={{padding: 0, margin: 2}}
            />
          </View>
          <Button title="Edit" />
          <Button title="Publish" />
          <Button title="Delete" />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default OrganizerEvent;
