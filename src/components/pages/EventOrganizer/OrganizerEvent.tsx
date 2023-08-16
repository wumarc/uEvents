import { View, Text, Touchable, TouchableOpacity } from "react-native";
import { Icon } from "@rneui/base";
import { colours, fonts, spacing } from "../../subatoms/Theme";
import { FC } from "react";
import { EventObject } from "../../../utils/model/EventObject";
import { Button } from "react-native-elements";
import { deleteDoc, doc } from "firebase/firestore";
import { fireStore } from "../../../firebaseConfig";
import { useStateWithFireStoreDocument } from "../../../utils/useStateWithFirebase";
import { Loading } from "../Common/Loading";

const OrganizerEvent: FC<{ eventID: string; navigation: any }> = (props) => {
  const [loading, event, setEvent] = useStateWithFireStoreDocument(
    "events",
    props.eventID
  );

  if (loading) {
    return <Loading />;
  }

  let publishOption = event.state === "Draft" ? "Publish" : "Unpublish";

  return (
    <TouchableOpacity
      onPress={() =>
        props.navigation.navigate("EventDetailsView", {
          eventID: props.eventID,
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
            {event.name}
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
            <Text style={{ ...fonts.title3 }}>{event.state}</Text>

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
          <Button
            title="Edit"
            onPress={() =>
              props.navigation.navigate("Step0", {
                eventID: props.eventID,
                useDefault: false,
              })
            }
          />
          <Button
            title={publishOption}
            onPress={() => {
              if (event.state === "Draft") {
                setEvent({ ...event, state: "Pending" });
              } else {
                setEvent({ ...event, state: "Draft" });
              }
            }}
          />
          <Button
            title="Delete"
            onPress={() => deleteDoc(doc(fireStore, "events/" + props.eventID))}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default OrganizerEvent;
