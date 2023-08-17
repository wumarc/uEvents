import { View, Text, Touchable, TouchableOpacity } from "react-native";
import { Icon } from "@rneui/themed";
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
        props.navigation.navigate("OrganizerEventDetails", {
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
          <Text style={{...fonts.title3}}>345 Clicks</Text>
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
            <Text style={{
              ...fonts.title2, 
              color: event.state == "Draft" ? colours.grey : '#EF9B0F'
            }}>
              {event.state}
            </Text>

          </View>
        </View>

        <View style={{ flexDirection: "row"}}>

          <View style={{justifyContent: "center"}}>

            <TouchableOpacity 
              style={{flexDirection: 'row', alignItems: 'center', justifyContent: "flex-end"}}
              onPress={() =>
                props.navigation.navigate("Step0", {
                  eventID: props.eventID,
                  useDefault: false,
                })
              }
            >
              <Text style={fonts.title3}>Edit</Text>
              <Icon
                reverse
                name="square-edit-outline"
                type="material-community"
                color="transparent"
                size={15}
                iconStyle={{...fonts.title1, color: colours.black}}
              />
            </TouchableOpacity >

            <TouchableOpacity 
              style={{flexDirection: 'row', alignItems: 'center', justifyContent: "flex-end"}}
              onPress={() => deleteDoc(doc(fireStore, "events/" + props.eventID))}
            >
              <Text style={fonts.title3}>Delete</Text>
              <Icon
                reverse
                name="delete-outline"
                type="material-community"
                color="transparent"
                size={15}
                iconStyle={{...fonts.title1, color: colours.black}}
              />
            </TouchableOpacity>

          </View>

{/*           
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
          */}

        </View>

      </View>
    </TouchableOpacity>
  );
};

export default OrganizerEvent;
