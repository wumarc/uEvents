import { colours } from "../subatoms/Theme";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import React, { FC, useState } from "react";
import {
  useSateWithFireStore,
  useStateWithFireStoreDocument,
} from "../../utils/useStateWithFirebase";
import { getFirebaseUserIDOrEmpty } from "../../utils/util";
import { Menu, Modal } from "react-native-paper";
import { Button, Dialog } from "react-native-elements";
import { Text } from "react-native";

const HeaderRight: FC<{ eventID: string }> = (props) => {
  const [loading, userData, setUserData] = useStateWithFireStoreDocument(
    "users",
    getFirebaseUserIDOrEmpty()
  );

  const [loading2, event, setEvent] = useStateWithFireStoreDocument(
    "events",
    props.eventID
  );

  const [visible, setVisible] = useState(false);

  const [reportVisible, setReportVisible] = useState(false);

  if (loading || loading2) {
    return (
      <MaterialCommunityIcons name="heart" color={colours.black} size={30} />
    );
  }

  const saved = (userData?.saved ?? []).includes(props.eventID);

  return (
    <View style={{backgroundColor: colours.white, flexDirection: 'row'}}>  
      <MaterialCommunityIcons
        name={saved ? "heart" : "heart-outline"}
        color={saved ? colours.purple : colours.black}
        size={30}
        onPress={() => {
          if (saved) {
            setUserData({
              saved: (userData?.saved ?? []).filter(
                (id: string) => id !== props.eventID
              ),
            });
          } else {
            setUserData({
              saved: [...(userData?.saved ?? []), props.eventID],
            });
          }
        }}
      />
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
        <Menu.Item onPress={() => {setReportVisible(true)}} title="Report" />
        <Menu.Item onPress={() => {}} title="Block" />
        {/* <Menu.Item onPress={() => {}} title="Claim event" /> */}
        <Menu.Item onPress={() => {}} title="Hide" />
      </Menu>
      {/* Report dialog */}
      <Dialog
        isVisible={reportVisible}
        onDismiss={() => setReportVisible(false)}
        style={{backgroundColor: colours.white}}
      >
        <Text>Report an event if you think it is inappropriate for this platform. When an event is reported, it will be added to your hidden list and you will not be able to see it anymore. The uEvents team will review the event in a short delay, and remove it from the platform if judged inappropriate.</Text>
        <Button
          title="Report"
          onPress={() => {
            setReportVisible(false);
            setVisible(false);
          }}
        />
        <Button
          title="Cancel"
          onPress={() => {
            setReportVisible(false);
            setVisible(false);
          }}
        />
      </Dialog>
      {/* Hide dialog */}
      <Dialog
        isVisible={reportVisible}
        onDismiss={() => setReportVisible(false)}
        style={{backgroundColor: colours.white}}
      >
        <Text>This option will hide this event from your feed. You can undo this action in the settings. This only affects you. Report this even instead if you judge it is inappropriate for all users.</Text>
        <Button
          title="Report"
          onPress={() => {
            setReportVisible(false);
            setVisible(false);
          }}
        />
        <Button
          title="Cancel"
          onPress={() => {
            setReportVisible(false);
            setVisible(false);
          }}
        />
      </Dialog>
      {/* Block dialog */}
      <Dialog
        isVisible={reportVisible}
        onDismiss={() => setReportVisible(false)}
        style={{backgroundColor: colours.white}}
      >
        <Text>Blocking will block all events from this organizer. You will not be able to see any of their events on your feed. You can unblock anytime in settings.</Text>
        <Button
          title="Report"
          onPress={() => {
            setReportVisible(false);
            setVisible(false);
          }}
        />
        <Button
          title="Cancel"
          onPress={() => {
            setReportVisible(false);
            setVisible(false);
          }}
        />
      </Dialog>
      {/* Claim dialog */}
      {/* <Dialog
        isVisible={reportVisible}
        onDismiss={() => setReportVisible(false)}
        style={{backgroundColor: colours.white}}
      >
        <Text>The uEvents team add events to the platform regularly. It can happen that we added an event organized by you. After we review your request, we will transfer the ownership of this event to you by claiming it.</Text>
        <Button
          title="Report"
          onPress={() => {
            setReportVisible(false);
            setVisible(false);
          }}
        />
        <Button
          title="Cancel"
          onPress={() => {
            setReportVisible(false);
            setVisible(false);
          }}
        />
      </Dialog> */}
    </View>
  );
};

export default HeaderRight;
