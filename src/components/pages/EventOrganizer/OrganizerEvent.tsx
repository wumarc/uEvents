import { View, Text, Touchable, TouchableOpacity } from "react-native";
import { Icon } from "react-native-elements";
import { Dialog } from "react-native-elements";
import { colours, fonts, spacing, windowHeight, windowWidth } from "../../subatoms/Theme";
import { FC, useState } from "react";
import { EventObject, formattedDate, getTimeInAMPM } from "../../../utils/model/EventObject";
import { Button } from "@rneui/base";
import { Timestamp, deleteDoc, doc } from "firebase/firestore";
import { fireStore } from "../../../firebaseConfig";
import { useStateWithFireStoreDocument } from "../../../utils/useStateWithFirebase";
import { Loading } from "../Common/Loading";
import { CustomButton } from "../../atoms/CustomButton";
import { EmojiImage } from "../../organisms/EmojiImage";

const OrganizerEvent: FC<{ eventID: string; navigation: any }> = (props) => {
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [loading, event, setEvent] = useStateWithFireStoreDocument<EventObject>("events", props.eventID);

  if (loading) {
    return <Loading />;
  }

  let publishOption = event.state === "Draft" ? "Publish" : "Unpublish";

  return (
    <TouchableOpacity
      onPress={() =>
        props.navigation.navigate("EventDetailsView", {
          eventID: props.eventID,
          organizerID: event.organizer,
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
        <EmojiImage emoji={event.emoji} style={{ justifyContent: "center", width: windowWidth * 0.25, height: windowHeight * 0.15 }} />

        <View style={{ width: windowWidth * 0.5 }}>
          {/* Emoji */}
          <Text style={{ ...fonts.title2, color: colours.purple }}>{event.name}</Text>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Icon name="time-outline" type="ionicon" size={19} color={colours.grey} />
            <Text style={{ ...fonts.small, fontWeight: "500" }}>{formattedDate(event.startTime, event.endTime)}</Text>
          </View>
          {/* <Text style={fonts.title3}>{getTimeInAMPM(event.endTime.toDate())}</Text> */}
          {event.rejectReason && <Text style={{ ...fonts.small, color: "red" }}>Reason for rejection: {event.rejectReason}</Text>}
          {/* {<Text style={{ ...fonts.small, color: "red" }}>Reason for rejection: {event.rejectReason}</Text>} */}
          {/* <Text style={{...fonts.title3}}>345 Clicks</Text> */}
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
            <Text
              style={{
                ...fonts.title3,
                paddingLeft: 10,
                paddingRight: 10,
                color: event.state == "Draft" ? colours.grey : event.state == "Published" ? "#93C572" : event.state == "Rejected" ? "red" : "#EF9B0F",
              }}
            >
              {event.state}
            </Text>
          </View>
        </View>

        <View style={{ flexDirection: "row" }}>
          <View style={{ justifyContent: "center" }}>
            <TouchableOpacity
              style={{ flexDirection: "row", alignItems: "center", justifyContent: "flex-end" }}
              onPress={() =>
                props.navigation.navigate("CreateEventWeb", {
                  id: props.eventID,
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
                iconStyle={{ ...fonts.title1, color: colours.black }}
              />
            </TouchableOpacity>

            <TouchableOpacity style={{ flexDirection: "row", alignItems: "center", justifyContent: "flex-end" }} onPress={() => setConfirmDelete(true)}>
              <Text style={fonts.title3}>Delete</Text>
              <Icon
                reverse
                name="delete-outline"
                type="material-community"
                color="transparent"
                size={15}
                iconStyle={{ ...fonts.title1, color: colours.black }}
              />
            </TouchableOpacity>

            <Dialog isVisible={confirmDelete} onDismiss={() => setConfirmDelete(false)} style={{ backgroundColor: colours.white, borderRadius: 15 }}>
              <Text style={{ ...fonts.regular, textAlign: "center" }}>Are you sure you want to delete the event?</Text>
              <CustomButton title="Delete" onPress={() => deleteDoc(doc(fireStore, "events/" + props.eventID))} />
              <Button
                style={{
                  paddingHorizontal: 10,
                  borderRadius: 15,
                  marginVertical: "1%",
                }}
                color={"transparent"}
                titleStyle={{ color: colours.purple, fontWeight: "600" }}
                title={"Cancel"}
                onPress={() => {
                  setConfirmDelete(false);
                }}
              />
            </Dialog>
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
