import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useEffect, useState } from "react";
import { daysOfWeekArray, daysOfWeekBrief, uid } from "../../../utils/util";
import { useStateWithFireStoreCollection, useStateWithFireStoreDocument } from "../../../utils/useStateWithFirebase";
import { EventObject, defaultEvent, recurrenceTypeArray } from "../../../utils/model/EventObject";
import { Loading } from "../Common/Loading";
import { CheckBox, Input } from "react-native-elements";
import { View, StyleSheet, Text, Platform, ScrollView } from "react-native";
import { Organizer } from "../../../utils/model/Organizer";
import { colours, windowHeight } from "../../subatoms/Theme";
import { CustomButton } from "../../atoms/CustomButton";
import CustomInput from "../../atoms/CustomInput";
import { Timestamp, doc, setDoc } from "firebase/firestore";
import { CustomDatePicker, CustomDatePickerList } from "../../atoms/CustomDatePicker";
import { fireStore } from "../../../firebaseConfig";
import { RootStackParamList } from "../../../../main";
import { CustomText } from "../../atoms/CustomText";
import { EmojiImage } from "../../organisms/EmojiImage";
import { CustomButtonGroup } from "../../atoms/CustomButtonGroup";
import { CustomDropdown } from "../../atoms/CustomDropdown";
import { CustomCheckBox } from "../../atoms/CustomCheckBox";

// NOTE!!!
// Beware that firebase does not accept undefined or null values

type props = NativeStackScreenProps<RootStackParamList, "CreateEventWeb">;

/// Form to create event intended for web use by admin only
export const CreateEventWeb = ({ route, navigation }: props) => {
  // Fake event
  // Fake event if the fake parameter is defined
  let isFake = route.params?.fake ?? false;
  let dbPath = isFake ? "events-test" : "events";

  // Editing event
  // Editing event if the id is defined
  let editing = route.params?.id != undefined;
  let previousEventId = route.params?.id ?? "dummy";

  // States
  const [id, setId] = useState(route.params?.id ?? uid()); // ID used to write in DB
  const [loading, dbEvent, setDbEvent] = useStateWithFireStoreDocument<EventObject>(dbPath, previousEventId);
  const [localEvent, setLocalEvent] = useState<EventObject>(defaultEvent);
  const [loading2, users, addUsers] = useStateWithFireStoreCollection<Organizer>("users");
  const [backupUrl, setBackupUrl] = useState<string | undefined>(undefined);

  // Error messages
  const [minPriceError, setMinPriceError] = useState("");
  const [maxPriceError, setMaxPriceError] = useState("");
  const [nameError, setNameError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");
  const [topError, setTopError] = useState("");

  // Char limit
  const [nameChar, setNameChar] = useState(0);
  const NAME_CHAR_LIMIT = 35;
  const [descriptionChar, setDescriptionChar] = useState(0);
  const DESCRIPTION_CHAR_LIMIT = 750;

  useEffect(() => {
    if (editing && dbEvent) {
      setLocalEvent(dbEvent);
    }
  }, [loading]);

  // Loading
  if (loading || loading2) {
    return <Loading />;
  }

  // Organizers
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

  // Days of the week to index
  // TODO: Move this logic into common code
  let daysOfWeek = localEvent.recurrenceCustomDays;
  let daysOfWeekIndex: number[] = [];
  if (daysOfWeek) {
    for (const day of daysOfWeek) {
      daysOfWeekIndex.push(daysOfWeekArray.indexOf(day));
    }
  }

  // Fields before submitting
  function beforeSubmit(temp: EventObject) {
    temp.id = id;
    temp.state = "Pending";
    temp.organizerType = "Organizer Added"; // TODO: Confirm

    // Fake
    if (isFake) {
      temp.fake = true;
    } else {
      temp.fake = false;
    }
  }

  return (
    <ScrollView>
      <View style={{ margin: 50, maxWidth: 1000 }}>
        {isFake && <CustomText style={{ textAlign: "center", color: "red" }}>Warning !!! You are editing / creating a fake event</CustomText>}
        <CustomButton
          style={styles.formElement}
          onPress={() => {
            let temp = localEvent;
            beforeSubmit(temp);
            console.log(temp);
          }}
        >
          Log event object to console
        </CustomButton>
        {/* Name */}
        <CustomInput
          containerStyle={styles.formElement}
          label="Name"
          value={localEvent.name}
          errorMessage={nameError}
          onChangeText={(text: any) => {
            setLocalEvent({ ...localEvent, name: text });
            setNameChar(text.length);
            if (text.length > NAME_CHAR_LIMIT) {
              setNameError("Name exceeds character limit. " + text.length + "/" + NAME_CHAR_LIMIT);
            } else {
              setNameError("");
            }
          }}
        />

        {/* Organizer select */}
        <CustomDropdown
          searchPlaceholder="Choose organizer"
          data={organizerData}
          labelField="label"
          valueField="value"
          placeholder={findOrganizerName(localEvent.organizer)}
          style={styles.formElement}
          onChange={(item) => setLocalEvent({ ...localEvent, organizer: item.value, organizerType: "Organizer Added" })}
        />

        {/* New Organizer */}
        <CustomButton
          onPress={() => {
            navigation.navigate("OrganizerSettings", { id: undefined, new: true });
          }}
        >
          Create new organizer
        </CustomButton>

        {/* Emoji */}
        <EmojiImage emoji={localEvent.emoji} style={{ alignItems: "center", margin: "auto", height: 200 }} />
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
          label="Description"
          multiline={true}
          errorMessage={descriptionError}
          value={localEvent.description}
          onChangeText={(text: any) => {
            setLocalEvent({ ...localEvent, description: text });
            setDescriptionChar(text.length);
            if (text.length > DESCRIPTION_CHAR_LIMIT) {
              setDescriptionError("Description exceeds character limit. " + text.length + "/" + DESCRIPTION_CHAR_LIMIT);
            } else {
              setDescriptionError("");
            }
          }}
        />

        {/* Price min */}
        <CustomInput
          containerStyle={styles.formElement}
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
        <CustomInput
          containerStyle={{ ...styles.formElement }}
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
              setLocalEvent({ ...localEvent, priceMax: 0 });
              return;
            }
            setLocalEvent({ ...localEvent, priceMax: parseInt(text) });
          }}
        />
        <View style={{ display: "flex", flexDirection: "row" }}>
          <CustomCheckBox
            title="Location is TBD"
            checked={localEvent.onCampus == "TBD"}
            onPress={() => {
              if (localEvent.onCampus == "TBD") {
                // Switching from TBD to a specific value
                setLocalEvent({ ...localEvent, onCampus: true });
                return;
              }
              // Switching from a specific value to TBD
              setLocalEvent({ ...localEvent, onCampus: "TBD" });
            }}
          />
          {localEvent.onCampus != "TBD" ? (
            <CustomCheckBox
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
          <CustomDropdown
            searchPlaceholder="Search by name or acronym"
            data={data}
            labelField="label"
            valueField="address"
            placeholder={localEvent.location == "" ? "Select building" : localEvent.location ?? ""}
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
          <CustomInput
            containerStyle={styles.formElement}
            label="Location or building name. In the case of campus events, this would be CRX for ex."
            value={localEvent.location}
            onChangeText={(text: any) => {
              if (text == "") {
                setLocalEvent({ ...localEvent, location: "" });
                return;
              }
              setLocalEvent({ ...localEvent, location: text });
            }}
          />
        )}

        {/* Room Number */}
        <CustomInput
          containerStyle={styles.formElement}
          label="Room Number"
          value={localEvent.roomNumber ?? ""}
          onChangeText={(text: any) => {
            setLocalEvent({ ...localEvent, roomNumber: text });
          }}
        />

        {/* Address */}
        <CustomInput
          containerStyle={styles.formElement}
          label="Street address of the event."
          value={localEvent.address}
          onChangeText={(text: any) => {
            setLocalEvent({ ...localEvent, address: text });
          }}
        />

        {/* Start time */}
        <CustomDatePicker
          time={localEvent.startTime}
          setTime={(time: any) => {
            setLocalEvent({ ...localEvent, startTime: time });
          }}
          selectDateString="Select start date"
          selectTimeString="Select start time"
          baseStyle={styles.formElement}
          label="Start"
        />

        {/* End time */}
        <CustomCheckBox
          title="Use end time"
          checked={localEvent.endTime != undefined && localEvent.endTime.seconds != 0}
          onPress={() => {
            if (localEvent.endTime == new Timestamp(0, 0) || localEvent.endTime == undefined) {
              // Switching to using end time
              setLocalEvent({ ...localEvent, endTime: localEvent.startTime });
              return;
            } else {
              // Switching to not using end time
              setLocalEvent({ ...localEvent, endTime: new Timestamp(0, 0) });
              return;
            }
          }}
        />

        {localEvent.endTime != undefined && localEvent.endTime.seconds != 0 ? (
          <CustomDatePicker
            time={localEvent.endTime}
            setTime={(time: any) => {
              setLocalEvent({ ...localEvent, endTime: time });
            }}
            selectDateString="Select end date"
            selectTimeString="Select end time"
            baseStyle={styles.formElement}
            label="End"
          />
        ) : (
          <></>
        )}

        {/* Sign up link */}
        <CustomInput
          containerStyle={styles.formElement}
          label="Link to sign up for the event. This is optional."
          value={localEvent.signUpLink ?? ""}
          onChangeText={(text: any) => {
            setLocalEvent({ ...localEvent, signUpLink: text });
          }}
        />

        {/* Original link */}
        <CustomInput
          containerStyle={styles.formElement}
          label="Link to the event. This is optional (TODO is it?)"
          value={localEvent.originalLink ?? ""}
          onChangeText={(text: any) => {
            setLocalEvent({ ...localEvent, originalLink: text });
          }}
        />

        {/* Recurrence type */}
        <CustomButtonGroup
          buttons={["None", "Weekly", "Custom Weekly", "Specific Dates"]}
          selectedIndex={recurrenceTypeArray.indexOf(localEvent.recurrenceType)}
          onPress={(index) => {
            setLocalEvent({ ...localEvent, recurrenceType: recurrenceTypeArray[index] ?? "None" });
          }}
        />

        {/* Recurrence Custom days */}
        {localEvent.recurrenceType == "Custom Weekly" && (
          <CustomButtonGroup
            buttons={["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]}
            selectedIndexes={daysOfWeekIndex}
            onPress={(index) => {
              let newIndex = daysOfWeekIndex;
              if (daysOfWeekIndex.includes(index)) {
                // Remove day
                newIndex.splice(daysOfWeekIndex.indexOf(index), 1);
              } else {
                // Add day
                newIndex.push(index);
              }
              let newDaysOfWeek: daysOfWeekBrief[] = [];
              for (const index of newIndex) {
                newDaysOfWeek.push(daysOfWeekArray[index] ?? "Sun");
              }
              setLocalEvent({ ...localEvent, recurrenceCustomDays: newDaysOfWeek });
            }}
          />
        )}

        {/* Recurrence Custom Dates */}
        {localEvent.recurrenceType == "Specific Dates" && (
          <CustomDatePickerList
            label="Specific dates"
            times={localEvent.recurrenceCustomDates}
            setTimes={(newTimes: any) => {
              setLocalEvent({ ...localEvent, recurrenceCustomDates: newTimes });
            }}
            selectDateString="Select date"
            selectTimeString="Select time"
            baseStyle={styles.formElement}
            useOnlyDate={true}
          />
        )}

        {/* Recurrence End */}
        {localEvent.recurrenceType != "None" && (
          <View>
            <Text style={{ ...styles.formElement, fontSize: 20 }}>Recurrence end</Text>
            <CustomDatePicker
              time={localEvent.recurrenceEnd ?? Timestamp.now()}
              setTime={(time: any) => {
                setLocalEvent({ ...localEvent, recurrenceEnd: time });
              }}
              selectDateString="Select end date"
              selectTimeString="Select end time"
              baseStyle={styles.formElement}
              useOnlyDate={true}
            />
          </View>
        )}

        {/* Recurrence exceptions */}
        {localEvent.recurrenceType != "None" && (
          <CustomDatePickerList
            label="Recurrence exceptions"
            times={localEvent.recurrenceExceptions}
            setTimes={(newTimes: any) => {
              setLocalEvent({ ...localEvent, recurrenceExceptions: newTimes });
            }}
            selectDateString="Select date"
            selectTimeString="Select time"
            baseStyle={styles.formElement}
            useOnlyDate={true}
          />
        )}

        {/* Submit */}
        <CustomButton
          style={styles.formElement}
          onPress={() => {
            let temp = localEvent;
            beforeSubmit(temp);

            // Check name
            if (temp.name == "") {
              setTopError("Could not submit event. Please enter a name");
              return;
            }

            if (temp.name.length > NAME_CHAR_LIMIT) {
              setTopError("Could not submit event. Name exceeds character limit. " + temp.name.length + "/" + NAME_CHAR_LIMIT);
              return;
            }

            // Check priceMin
            if (isNaN(temp.priceMin)) {
              setTopError("Could not submit event. Please enter a number for the minimum price");
              return;
            }

            // Check description
            if (temp.description == "") {
              setTopError("Could not submit event. Please enter a description");
              return;
            }

            if (temp.description.length > DESCRIPTION_CHAR_LIMIT) {
              setTopError("Could not submit event. Description exceeds character limit. " + temp.description.length + "/" + DESCRIPTION_CHAR_LIMIT);
              return;
            }

            // Check address
            if (temp.address == "" && temp.onCampus != "TBD") {
              setTopError("Could not submit event. Please enter an address");
              return;
            }

            // Check organizer
            if (temp.organizer == "") {
              setTopError("Could not submit event. Please select an organizer");
              return;
            }

            // Check start time
            if (temp.startTime == undefined) {
              setTopError("Could not submit event. Please select a start time");
              return;
            }

            // Check emoji
            if (temp.emoji == "") {
              setTopError("Could not submit event. Please enter an emoji");
              return;
            }

            // Write event
            setDoc(doc(fireStore, dbPath + "/" + id), temp);
            navigation.pop();
          }}
        >
          {isFake ? "Submit test event" : "Submit event"}
        </CustomButton>

        {isFake && (
          <CustomButton
            style={styles.formElement}
            onPress={() => {
              let temp = localEvent;
              beforeSubmit(temp);
              setDoc(doc(fireStore, dbPath + "/" + id), temp);
              navigation.pop();
            }}
          >
            Force submit test event (Without checks)
          </CustomButton>
        )}
        <Text style={{ ...styles.formElement, color: "red" }}>{topError}</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  formElement: {
    marginVertical: 10,
  },
});

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
