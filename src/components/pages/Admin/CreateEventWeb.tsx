import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "./main";
import { useState } from "react";
import { emojiUrl, uid } from "../../../utils/util";
import { useStateWithFireStoreCollection, useStateWithFireStoreDocument } from "../../../utils/useStateWithFirebase";
import { EventObject, defaultEvent } from "../../../utils/model/EventObject";
import { Loading } from "../Common/Loading";
import { Button } from "@rneui/themed";
import { CheckBox, Input } from "react-native-elements";
import { Icon } from "@rneui/themed";
import { Dropdown } from "react-native-element-dropdown";
import { View, StyleSheet, Text, Platform } from "react-native";
import { Organizer } from "../../../utils/model/Organizer";
import { colours, windowHeight } from "../../subatoms/Theme";
import CustomButton from "../../atoms/CustomButton";
import CustomInput from "../../atoms/CustomInput";
import { Timestamp } from "firebase/firestore";
import { SvgUri } from "react-native-svg";
import { TimePickerModal, DatePickerModal } from "react-native-paper-dates";

// Props has the wrong type is not used
type props = NativeStackScreenProps<RootStackParamList, "Profile">;

export const CreateEventWeb = ({ route, navigation }: props) => {
  const [id, setId] = useState(uid());
  const [loading, dbEvent, setDbEvent] = useStateWithFireStoreDocument<EventObject>("events", id);
  const [localEvent, setLocalEvent] = useState<EventObject>(defaultEvent);
  const [loading2, users, addUsers] = useStateWithFireStoreCollection<Organizer>("users");
  const [backupUrl, setBackupUrl] = useState<string | undefined>(undefined);

  // Error messages
  const [minPriceError, setMinPriceError] = useState("");
  const [maxPriceError, setMaxPriceError] = useState("");

  // Time
  const [startTimeVisible, setStartTimeVisible] = useState(false);
  const [startDateVisible, setStartDateVisible] = useState(false);

  if (loading || loading2) {
    return <Loading />;
  }

  const organizers: Organizer[] = users?.filter((user) => user.type == "organizer") ?? [];
  const organizerData = [];
  for (const organizer of organizers) {
    organizerData.push({ label: organizer.name, value: organizer.id });
  }

  function findOrganizerName(id: string) {
    for (const organizer of organizers) {
      if (organizer.id == id) {
        return organizer.name;
      }
    }
    return "Choose organizer";
  }

  if (loading) {
    return <Loading />;
  }

  // TODO: Investigate why the background color is broken
  return (
    <View>
      <View style={{ margin: 50, maxWidth: 1000, marginBottom: windowHeight }}>
        <CustomButton
          style={styles.formElement}
          onPress={() => {
            console.log(localEvent);
          }}
        >
          Log event object to console
        </CustomButton>
        <Text style={styles.formElement}>
          The optional fields have a red or green circle besides them. Make sure the circle is red if you want to leave it empty.
        </Text>

        {/* Name */}
        <CustomInput
          containerStyle={styles.formElement}
          placeholder="Name"
          value={localEvent.name}
          onChangeText={(text: any) => {
            setLocalEvent({ ...localEvent, name: text });
          }}
        />

        {/* Organizer select */}
        <Dropdown
          search
          searchPlaceholder="Choose organizer"
          placeholderStyle={{ fontSize: 17, padding: 7 }}
          data={organizerData}
          labelField="label"
          valueField="value"
          placeholder={findOrganizerName(localEvent.organizer)}
          style={{ borderWidth: 1, borderColor: colours.grey, borderRadius: 6, height: windowHeight * 0.05, ...styles.formElement }}
          onChange={(item) => setLocalEvent({ ...localEvent, organizer: item.value, organizerType: "Organizer Added" })}
        />

        {/* Emoji */}
        {/* TODO: Create a central component for the emoji */}
        {localEvent.emoji ? (
          <>
            <Text>How your emoji will look on our platform</Text>
            <View style={{ alignItems: "center" }}>
              {Platform.OS === "web" ? (
                <img
                  src={backupUrl ?? emojiUrl(localEvent.emoji)}
                  style={{
                    width: "100%",
                    maxWidth: 200,
                    height: "100%",
                    maxHeight: 200,
                  }}
                  onError={() => {
                    let parts = (backupUrl ?? emojiUrl(localEvent.emoji)).split("-");
                    // remove last part
                    parts.pop();
                    setBackupUrl(parts.join("-") + ".svg");
                  }}
                />
              ) : (
                <SvgUri
                  width="100%"
                  height="100%"
                  uri={backupUrl ?? emojiUrl(localEvent.emoji)}
                  fill="black"
                  onError={() => {
                    let parts = (backupUrl ?? emojiUrl(localEvent.emoji)).split("-");
                    // remove last part
                    parts.pop();
                    setBackupUrl(parts.join("-") + ".svg");
                  }}
                />
              )}
            </View>
          </>
        ) : (
          <></>
        )}
        <Input
          selectionColor={colours.purple}
          autoCapitalize="none"
          defaultValue={localEvent.emoji}
          label="Emoji"
          style={{ ...styles.formElement }}
          inputContainerStyle={{
            borderColor: colours.grey,
            borderBottomWidth: 1,
            borderWidth: 1,
            paddingVertical: 4,
            paddingHorizontal: 10,
            borderRadius: 6,
          }}
          textAlign="center"
          inputStyle={{ fontSize: 70 }}
          onChange={(e) => {
            setLocalEvent({ ...localEvent, emoji: e.nativeEvent.text });
          }}
          maxLength={8}
        />

        {/* Description */}
        <CustomInput
          containerStyle={{ ...styles.formElement }}
          style={{ height: windowHeight * 0.2 }}
          placeholder="Description"
          multiline={true}
          value={localEvent.description}
          onChangeText={(text: any) => {
            setLocalEvent({ ...localEvent, description: text });
          }}
        />

        {/* Price min */}
        <CustomInput
          containerStyle={styles.formElement}
          placeholder="Price min"
          label="Min price (Or exact price if there is no max price)"
          value={localEvent.priceMin.toString()}
          errorMessage={minPriceError}
          onChangeText={(text: any) => {
            if (isNaN(text)) {
              setMinPriceError("Please enter a number");
              return;
            } else if (minPriceError != "") {
              setMinPriceError("");
            }
            if (text == "") {
              setLocalEvent({ ...localEvent, priceMin: 0 });
              return;
            }
            setLocalEvent({ ...localEvent, priceMin: parseInt(text) });
          }}
        />

        {/* Max price */}
        <View style={{ display: "flex", flexDirection: "row" }}>
          <CustomInput
            containerStyle={{ ...styles.formElement }}
            placeholder="Price max"
            label="Max price. -- Set value to 0 to make it undefined (In the case where there is no max price)"
            value={(localEvent.priceMax ?? 0).toString()}
            errorMessage={maxPriceError}
            onChangeText={(text: any) => {
              if (isNaN(text)) {
                setMaxPriceError("Please enter a number");
                return;
              } else if (maxPriceError != "") {
                setMaxPriceError("");
              }
              if (text == "" || text == "0") {
                setLocalEvent({ ...localEvent, priceMax: undefined });
                return;
              }
              setLocalEvent({ ...localEvent, priceMax: parseInt(text) });
            }}
          />
          {localEvent.priceMax == undefined ? (
            <Text style={{ fontSize: 30, margin: "auto" }}>⭕</Text>
          ) : (
            <Text style={{ fontSize: 30, margin: "auto" }}>🟢</Text>
          )}
        </View>
        <View style={{ display: "flex", flexDirection: "row" }}>
          <CheckBox
            title="Location is TBD"
            checked={localEvent.onCampus == "TBD"}
            onPress={() => {
              if (localEvent.onCampus == "TBD") {
                // Switching from TBD to a specific value
                setLocalEvent({ ...localEvent, onCampus: undefined });
                return;
              }
              // Switching from a specific value to TBD
              setLocalEvent({ ...localEvent, onCampus: "TBD" });
            }}
          />
          {localEvent.onCampus != "TBD" ? (
            <CheckBox
              title="On campus"
              checked={localEvent.onCampus}
              onPress={() => {
                setLocalEvent({ ...localEvent, onCampus: !localEvent.onCampus });
              }}
            />
          ) : (
            <></>
          )}
        </View>

        {/* Location */}
        {localEvent.onCampus ? (
          <Dropdown
            search
            searchPlaceholder="Search by name or acronym"
            placeholderStyle={{ fontSize: 17, padding: 10 }}
            data={data}
            labelField="label"
            valueField="address"
            placeholder={localEvent.location == "" ? "Select building" : localEvent.location}
            style={{ borderWidth: 1, borderColor: colours.grey, borderRadius: 6, height: windowHeight * 0.05, ...styles.formElement }}
            onChange={(item) => {
              setLocalEvent({
                ...localEvent,
                location: item.label,
                address: item.address,
                onCampus: true,
              });
            }}
          />
        ) : (
          <View style={{ display: "flex", flexDirection: "row" }}>
            <CustomInput
              containerStyle={styles.formElement}
              label="Location or building name. In the case of campus events, this would be CRX for ex."
              placeholder="Location"
              value={localEvent.location}
              onChangeText={(text: any) => {
                if (text == "") {
                  setLocalEvent({ ...localEvent, location: undefined });
                  return;
                }
                setLocalEvent({ ...localEvent, location: text });
              }}
            />
            {localEvent.location == undefined || localEvent.location == "" ? (
              <Text style={{ fontSize: 30, margin: "auto" }}>⭕</Text>
            ) : (
              <Text style={{ fontSize: 30, margin: "auto" }}>🟢</Text>
            )}
          </View>
        )}

        {/* Room Number */}
        <View style={{ display: "flex", flexDirection: "row" }}>
          <CustomInput
            containerStyle={styles.formElement}
            placeholder="Room Number"
            value={localEvent.roomNumber}
            onChangeText={(text: any) => {
              setLocalEvent({ ...localEvent, roomNumber: text });
            }}
          />
          {localEvent.roomNumber == undefined || localEvent.roomNumber == "" ? (
            <Text style={{ fontSize: 30, margin: "auto" }}>⭕</Text>
          ) : (
            <Text style={{ fontSize: 30, margin: "auto" }}>🟢</Text>
          )}
        </View>

        {/* Address */}
        <View style={{ display: "flex", flexDirection: "row" }}>
          <CustomInput
            containerStyle={styles.formElement}
            placeholder="Address"
            label="Street address of the event."
            value={localEvent.address}
            onChangeText={(text: any) => {
              setLocalEvent({ ...localEvent, address: text });
            }}
          />
          {localEvent.address == undefined || localEvent.address == "" ? (
            <Text style={{ fontSize: 30, margin: "auto" }}>⭕</Text>
          ) : (
            <Text style={{ fontSize: 30, margin: "auto" }}>🟢</Text>
          )}
        </View>

        {/* Start time */}
        <Text style={{ ...styles.formElement, fontSize: 20 }}>
          {"Start Date : " +
            localEvent.startTime.toDate().toLocaleString("default", { month: "long" }) +
            " " +
            localEvent.startTime.toDate().getDate() +
            " " +
            localEvent.startTime.toDate().getFullYear() +
            " : " +
            localEvent.startTime.toDate().getHours() +
            "h " +
            localEvent.startTime.toDate().getMinutes() +
            ""}
        </Text>
        <View style={{ display: "flex", flexDirection: "row" }}>
          <CustomButton
            style={{ ...styles.formElement, marginHorizontal: 10 }}
            onPress={() => {
              setStartTimeVisible(true);
            }}
          >
            Select start time
          </CustomButton>
          <CustomButton
            style={{ ...styles.formElement, marginHorizontal: 10 }}
            onPress={() => {
              setStartDateVisible(true);
            }}
          >
            Select start date
          </CustomButton>
        </View>

        <TimePickerModal
          visible={startTimeVisible}
          onDismiss={() => {
            setStartTimeVisible(false);
          }}
          onConfirm={(value: any) => {
            let date = localEvent.startTime.toDate();
            date.setHours(value.hours);
            date.setMinutes(value.minutes);
            setLocalEvent({ ...localEvent, startTime: Timestamp.fromDate(date) });
            setStartTimeVisible(false);
          }}
          label="Select start time"
          cancelLabel="Cancel"
          confirmLabel="Ok"
          animationType="fade"
          locale={"en"}
        />

        <DatePickerModal
          visible={startDateVisible}
          onDismiss={() => {
            setStartDateVisible(false);
          }}
          onConfirm={(value: any) => {
            let date = localEvent.startTime.toDate();
            date.setFullYear(value.date.getFullYear());
            date.setMonth(value.date.getMonth());
            date.setDate(value.date.getDate());
            setLocalEvent({ ...localEvent, startTime: Timestamp.fromDate(date) });
            setStartDateVisible(false);
          }}
          mode="single"
          label="Select start date"
          animationType="fade"
          locale={"en"}
        />

        {/* End time */}
        {/* <CheckBox
          title="Use end time"
          checked={localEvent.endTime != undefined}
          onPress={() => {
            if (localEvent.endTime == undefined) {
              // Switching to using end time
              setLocalEvent({ ...localEvent, endTime: Timestamp.now() });
              return;
            } else {
              // Switching to not using end time
              setLocalEvent({ ...localEvent, endTime: undefined });
              return;
            }
          }}
        />

        {localEvent.endTime != undefined ? (
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateTimePicker
              label="End time"
              onChange={(value: any) => {
                let date = dayjs(value);
                let timestamp = date.unix();
                console.log(timestamp);
                setLocalEvent({ ...localEvent, startTime: Timestamp.fromMillis(timestamp * 1000) });
              }}
            />
          </LocalizationProvider>
        ) : (
          <></>
        )} */}

        {/* Sign up link */}
        <View style={{ display: "flex", flexDirection: "row" }}>
          <CustomInput
            containerStyle={styles.formElement}
            placeholder="Sign up link"
            label="Link to sign up for the event. This is optional."
            value={localEvent.signUpLink}
            onChangeText={(text: any) => {
              setLocalEvent({ ...localEvent, signUpLink: text });
            }}
          />
          {localEvent.signUpLink == undefined || localEvent.signUpLink == "" ? (
            <Text style={{ fontSize: 30, margin: "auto" }}>⭕</Text>
          ) : (
            <Text style={{ fontSize: 30, margin: "auto" }}>🟢</Text>
          )}
        </View>

        {/* Original link */}
        <View style={{ display: "flex", flexDirection: "row" }}>
          <CustomInput
            containerStyle={styles.formElement}
            placeholder="Event link"
            label="Link to the event. This is optional (TODO is it?)"
            value={localEvent.originalLink}
            onChangeText={(text: any) => {
              setLocalEvent({ ...localEvent, originalLink: text });
            }}
          />
          {localEvent.originalLink == undefined || localEvent.originalLink == "" ? (
            <Text style={{ fontSize: 30, margin: "auto" }}>⭕</Text>
          ) : (
            <Text style={{ fontSize: 30, margin: "auto" }}>🟢</Text>
          )}
        </View>

        {/* Submit */}
        <CustomButton
          style={styles.formElement}
          onPress={() => {
            // TODO: Complete
          }}
        >
          Submit
        </CustomButton>
      </View>
      <Text>End of page</Text>
    </View>
  );
};

const data = [
  {
    label: "Academic Hall (SMN)",
    address: "133-135 Séraphin Marion Street, Ottawa, Ontario",
  },
  {
    label: "Hagen (HGN)",
    address: "115 Séraphin Marion Street, Ottawa, Ontario",
  },
  {
    label: "William Commanda (WCA)",
    address: "52 University Street, Ottawa, Ontario",
  },
  {
    label: "Tabaret Hall (TBT)",
    address: "550 Cumberland Street, Ottawa, Ontario",
  },
  {
    label: "Department of Visual Arts (LRR)",
    address: "100 Laurier Street, Ottawa, Ontario",
  },
  {
    label: "Hamelin (MHN)",
    address: "70 Laurier Street East, Ottawa, Ontario",
  },
  { label: "Morisset (MRT)", address: "65 University Street, Ottawa, Ontario" },
  {
    label: "University Centre (UCU)",
    address: "85 University Street, Ottawa, Ontario",
  },
  {
    label: "University Square",
    address: "136 University Private, Ottawa, ON K1N 1H3",
  },
  {
    label: "141 Louis Pasteur (LPR)",
    address: "141 Louis Pasteur Street, Ottawa, Ontario",
  },
  {
    label: "Thompson Residence (THN)",
    address: "45 University Street, Ottawa, Ontario",
  },
  {
    label: "Montpetit (MNT)",
    address: "125 University Street, Ottawa, Ontario",
  },
  { label: "Pérez (PRZ)", address: "50 University Street, Ottawa, Ontario" },
  {
    label: "Residence (90U)",
    address: "90 University Street, Ottawa, Ontario",
  },
  {
    label: "Marchand Residence (MRD)",
    address: "110 University Street, Ottawa, Ontario",
  },
  {
    label: "Learning Crossroads (CRX)",
    address: "145 Jean-Jacques Lussier Street, Ottawa, Ontario",
  },
  {
    label: "Lamoureux (LMX)",
    address: "145 Jean-Jacques Lussier Street, Ottawa, Ontario",
  },
  { label: "Brooks (BRS)", address: "100 Thomas-More Street, Ottawa, Ontario" },
  {
    label: "Colonel By (CBY)",
    address: "161 Louis Pasteur Street, Ottawa, Ontario",
  },
  {
    label: "Leblanc Residence (LBC)",
    address: "45 Louis Pasteur Street, Ottawa, Ontario",
  },
  { label: "MCE", address: "100 Marie Curie Street, Ottawa, Ontario" },
  {
    label: "Bioscience-Ph I CAREG (CRG)",
    address: "20 Marie Curie Street, Ottawa, Ontario",
  },
  {
    label: "Fauteux (FTX)",
    address: "57 Louis Pasteur Street, Ottawa, Ontario",
  },
  { label: "Simard (SMD)", address: "60 University Street, Ottawa, Ontario" },
  {
    label: "Vanier (VNR)",
    address: "136 Jean-Jacques Lussier Street, Ottawa, Ontario",
  },
  {
    label: "Bioscience-Ph III, Gendron (GNN)",
    address: "30 Marie Curie Street, Ottawa, Ontario",
  },
  {
    label: "Marion (MRN)",
    address: "140 Louis Pasteur Street, Ottawa, Ontario",
  },
  {
    label: "Stanton Residence (STN)",
    address: "100 University Street, Ottawa, Ontario",
  },
  {
    label: "Hyman Soloway Residence (HSY)",
    address: "157 Laurier Street, Ottawa, Ontario",
  },
  { label: "Desmarais (DMS)", address: "55 Laurier Street, Ottawa, Ontario" },
  {
    label: "Social Sciences Building (FSS)",
    address: "120 University Street, Ottawa, Ontario",
  },
  {
    label: "Power Plant (CTE)",
    address: "720 King Edward Street, Ottawa, Ontario",
  },
  {
    label: "Matt Anthony Field",
    address: "801 King Edward, Ottawa, ON K1N 6N5",
  },
  {
    label: "Minto Sports Complex (MNO)",
    address: "801 King Edward Street, Ottawa, Ontario",
  },
  { label: "SITE (STE)", address: "800 King Edward Street, Ottawa, Ontario" },
  { label: "D'Iorio (DRO)", address: "10 Marie Curie Street, Ottawa, Ontario" },
  {
    label: "Bioscience-Ph II (BSC)",
    address: "30 Marie Curie Street, Ottawa, Ontario",
  },
  {
    label: "STEM Complex (STM)",
    address: "150 Louis Pasteur Street, Ottawa, Ontario",
  },
  {
    label: "Roger Guindon (RGN)",
    address: "451 Smyth Street, Ottawa, Ontario",
  },
  {
    label: "GSAED Grad House (GSD)",
    address: "601 Cumberland Street, Ottawa, Ontario",
  },
  { label: "HNN", address: "202 Henderson Street, Ottawa, Ontario" },
  {
    label: "Advanced Research Complex (ARC)",
    address: "25 Templeton Street, Ottawa, Ontario",
  },
  { label: "KED", address: "585 King Edward Street, Ottawa, Ontario" },
  { label: "STT", address: "1 Stewart Street, Ottawa, Ontario" },
  {
    label: "Alex Trebek Alumni Hall (ATK)",
    address: "157 Séraphin Marion Street, Ottawa, Ontario",
  },
  { label: "ANX", address: "Annex Residence, Ottawa, Ontario" },
  { label: "MNN", address: "Mann Residence, Ottawa, Ontario" },
  { label: "WBD", address: "200 Wilbrod Street, Ottawa, Ontario" },
  { label: "FRL", address: "Friel Residence, Ottawa, Ontario" },
  { label: "RDU", address: "Rideau Residence, Ottawa, Ontario" },
  { label: "Dome", address: "Lees 200 - Bloc F, Ottawa, Ontario" },
];

const styles = StyleSheet.create({
  formElement: {
    marginVertical: 10,
  },
});
