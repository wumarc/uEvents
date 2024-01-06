import { colours, fonts } from "../subatoms/Theme";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { View } from "react-native";
import React, { FC, useState } from "react";
import { useStateWithFireStoreDocument, useStateWithFireStoreDocumentLogged } from "../../utils/useStateWithFirebase";
import { getFirebaseUserIDOrEmpty, isLogged } from "../../utils/util";
import { Dialog } from "react-native-elements";
import { Button } from "@rneui/base";
import { Text } from "react-native";
import CustomButton from "../atoms/CustomButton";
import { LoginDialog } from "../atoms/LoginDialog";

const HeaderRight: FC<{ eventID: string; navigation: any }> = (props) => {
  // States
  const [loading, userData, setUserData] = useStateWithFireStoreDocumentLogged("users", getFirebaseUserIDOrEmpty());
  const [loading2, event, setEvent] = useStateWithFireStoreDocument("events", props.eventID === "" ? "0" : props.eventID);
  const [visible, setVisible] = useState(false);
  const [reportVisible, setReportVisible] = useState(false);
  const [hideVisible, setHideVisible] = useState(false);
  const [blockVisible, setBlockVisible] = useState(false);
  const [loginVisible, setLoginVisible] = useState(false);
  const [loginReason, setLoginReason] = useState("");

  // Loading
  if (loading || loading2) {
    return <MaterialCommunityIcons name="heart" color={colours.black} size={30} />;
  }

  const saved = (userData?.saved ?? []).includes(props.eventID);

  return (
    <View style={{ backgroundColor: colours.white, flexDirection: "row" }}>
      <MaterialCommunityIcons
        name={saved ? "heart" : "heart-outline"}
        color={saved ? colours.purple : colours.black}
        size={30}
        onPress={() => {
          if (!isLogged()) {
            setLoginReason("You need to be logged in to save events.");
            setLoginVisible(true);
            return;
          }
          if (setUserData) {
            if (saved) {
              setUserData({
                saved: (userData?.saved ?? []).filter((id: string) => id !== props.eventID),
              });
            } else {
              setUserData({
                saved: [...(userData?.saved ?? []), props.eventID],
              });
            }
          }
        }}
      />
      {props.eventID === "" ? (
        <></>
      ) : (
        <MaterialCommunityIcons
          name="dots-vertical"
          color={colours.black}
          size={30}
          onPress={() => {
            if (!isLogged()) {
              setLoginReason("You need to be logged in to report events.");
              setLoginVisible(true);
              return;
            }
            setVisible(true);
          }}
        />
      )}
      <Dialog isVisible={visible} onDismiss={() => setVisible(false)} style={{ backgroundColor: colours.white }}>
        <CustomButton
          buttonName="Report"
          onPress={() => {
            setReportVisible(true);
            setVisible(false);
          }}
        />
        {event && event.organizerType === "Organizer Added" ? (
          <CustomButton
            buttonName="Block"
            onPress={() => {
              setBlockVisible(true);
              setVisible(false);
            }}
          />
        ) : (
          <></>
        )}
        <CustomButton
          buttonName="Hide"
          onPress={() => {
            setHideVisible(true);
            setVisible(false);
          }}
        />
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
            setVisible(false);
          }}
        />
      </Dialog>

      {/* Report dialog */}
      <Dialog isVisible={reportVisible} onDismiss={() => setReportVisible(false)} style={{ backgroundColor: colours.white }}>
        <Text style={{ ...fonts.regular, textAlign: "center" }}>
          Report an event if you think it is inappropriate for this platform. When an event is reported, we will review the event in a short delay, and remove
          it from the platform if judged inappropriate.
        </Text>
        <CustomButton
          buttonName="Report"
          onPress={() => {
            if (setUserData) {
              setUserData({
                ...userData,
                reported: [...(userData?.reported ?? []), props.eventID],
                hidden: [...(userData?.hidden ?? []), props.eventID],
              });
            }
            setReportVisible(false);
            setVisible(false);
            props.navigation.pop();
          }}
        />
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
            setReportVisible(false);
            setVisible(false);
          }}
        />
      </Dialog>

      {/* Hide dialog */}
      <Dialog isVisible={hideVisible} onDismiss={() => setHideVisible(false)} style={{ backgroundColor: colours.white }}>
        <Text style={{ ...fonts.regular, textAlign: "center" }}>
          This option will hide this event from your feed. You can undo this action in the settings. Report this even instead if you judge it is inappropriate
          for all users.
        </Text>
        <CustomButton
          buttonName="Hide"
          onPress={() => {
            if (setUserData) {
              setUserData({
                ...userData,
                hidden: [...(userData?.hidden ?? []), props.eventID],
              });
            }
            setHideVisible(false);
            setVisible(false);
            props.navigation.pop();
          }}
        />
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
            setHideVisible(false);
            setVisible(false);
          }}
        />
      </Dialog>

      {/* Block dialog */}
      <Dialog isVisible={blockVisible} onDismiss={() => setBlockVisible(false)} style={{ backgroundColor: colours.white }}>
        <Text style={{ ...fonts.regular, textAlign: "center" }}>
          Blocking will block all events from this organizer. You will not be able to see any of their events on your feed. You can unblock anytime in settings.
        </Text>
        <CustomButton
          buttonName="Block"
          onPress={() => {
            if (setUserData) {
              setUserData({
                ...userData,
                blocked: [...(userData?.blocked ?? []), event?.organizer],
              });
            }
            setBlockVisible(false);
            setVisible(false);
            props.navigation.pop();
          }}
        />
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
            setBlockVisible(false);
            setVisible(false);
          }}
        />
      </Dialog>
      <LoginDialog visible={loginVisible} setVisible={setLoginVisible} reason={loginReason} navigation={props.navigation} />
    </View>
  );
};

export default HeaderRight;
