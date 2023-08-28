import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Modal,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  Touchable,
  TouchableOpacity,
} from "react-native";
import { ButtonGroup, CheckBox, Icon } from "react-native-elements";
import { Input } from "@rneui/themed";
import { FC, useEffect, useRef, useState } from "react";
import { Button } from "@rneui/base";
import {
  colours,
  fonts,
  spacing,
  windowHeight,
  windowWidth,
} from "../../subatoms/Theme";
import { ProgressBar } from "react-native-paper";
import { Calendar, LocaleConfig } from "react-native-calendars";
import { Dropdown, MultiSelect } from "react-native-element-dropdown";
import emojiRegex from "emoji-regex";
import {
  useSateWithFireStore,
  useStateWithFireStoreCollection,
  useStateWithFireStoreDocument,
} from "../../../utils/useStateWithFirebase";
import { Loading } from "../Common/Loading";
import { getOrderedCategories } from "../../../utils/categories";
import {
  EventObject,
  defaultEvent,
  recurrence,
} from "../../../utils/model/EventObject";
import { getFirebaseUserIDOrEmpty, uid } from "../../../utils/util";
import { Timestamp, doc, setDoc, waitForPendingWrites } from "firebase/firestore";
import { fireStore } from "../../../firebaseConfig";
import DateTimePicker from "@react-native-community/datetimepicker";
import { SvgUri } from "react-native-svg";
import WheelPickerExpo from 'react-native-wheel-picker-expo';

const data = [
  { label: "Academic Hall (SMN)", address: "133-135 Séraphin Marion Street, Ottawa, Ontario"},
  { label: "Hagen (HGN)", address: "115 Séraphin Marion Street, Ottawa, Ontario"},
  { label: "William Commanda (WCA)", address: "52 University Street, Ottawa, Ontario"},
  { label: "Tabaret Hall (TBT)", address: "550 Cumberland Street, Ottawa, Ontario"},
  { label: "Department of Visual Arts (LRR)", address: "100 Laurier Street, Ottawa, Ontario"},
  { label: "Hamelin (MHN)", address: "70 Laurier Street East, Ottawa, Ontario"},
  { label: "Morisset (MRT)", address: "65 University Street, Ottawa, Ontario"},
  { label: "University Centre (UCU)", address: "85 University Street, Ottawa, Ontario"},
  { label: "University Square", address: "136 University Private, Ottawa, ON K1N 1H3"},
  { label: "141 Louis Pasteur (LPR)", address: "141 Louis Pasteur Street, Ottawa, Ontario"},
  { label: "Thompson Residence (THN)", address: "45 University Street, Ottawa, Ontario"},
  { label: "Montpetit (MNT)", address: "125 University Street, Ottawa, Ontario"},
  { label: "Pérez (PRZ)", address: "50 University Street, Ottawa, Ontario"},
  { label: "Residence (90U)", address: "90 University Street, Ottawa, Ontario"},
  { label: "Marchand Residence (MRD)", address: "110 University Street, Ottawa, Ontario"},
  { label: "Learning Crossroads (CRX)", address: "145 Jean-Jacques Lussier Street, Ottawa, Ontario"},
  { label: "Lamoureux (LMX)", address: "145 Jean-Jacques Lussier Street, Ottawa, Ontario"},
  { label: "Brooks (BRS)", address: "100 Thomas-More Street, Ottawa, Ontario"},
  { label: "Colonel By (CBY)", address: "161 Louis Pasteur Street, Ottawa, Ontario"},
  { label: "Leblanc Residence (LBC)", address: "45 Louis Pasteur Street, Ottawa, Ontario"},
  { label: "MCE", address: "100 Marie Curie Street, Ottawa, Ontario"},
  { label: "Bioscience-Ph I CAREG (CRG)", address: "20 Marie Curie Street, Ottawa, Ontario"},
  { label: "Fauteux (FTX)", address: "57 Louis Pasteur Street, Ottawa, Ontario"},
  { label: "Simard (SMD)", address: "60 University Street, Ottawa, Ontario"},
  { label: "Vanier (VNR)", address: "136 Jean-Jacques Lussier Street, Ottawa, Ontario"},
  { label: "Bioscience-Ph III, Gendron (GNN)", address: "30 Marie Curie Street, Ottawa, Ontario"},
  { label: "Marion (MRN)", address: "140 Louis Pasteur Street, Ottawa, Ontario"},
  { label: "Stanton Residence (STN)", address: "100 University Street, Ottawa, Ontario"},
  { label: "Hyman Soloway Residence (HSY)", address: "157 Laurier Street, Ottawa, Ontario"},
  { label: "Desmarais (DMS)", address: "55 Laurier Street, Ottawa, Ontario"},
  { label: "Social Sciences Building (FSS)", address: "120 University Street, Ottawa, Ontario"},
  { label: "Power Plant (CTE)", address: "720 King Edward Street, Ottawa, Ontario"},
  { label: "Matt Anthony Field", address: "801 King Edward, Ottawa, ON K1N 6N5"},
  { label: "Minto Sports Complex (MNO)", address: "801 King Edward Street, Ottawa, Ontario"},
  { label: "SITE (STE)", address: "800 King Edward Street, Ottawa, Ontario"},
  { label: "D'Iorio (DRO)", address: "10 Marie Curie Street, Ottawa, Ontario"},
  { label: "Bioscience-Ph II (BSC)", address: "30 Marie Curie Street, Ottawa, Ontario"},
  { label: "STEM Complex (STM)", address: "150 Louis Pasteur Street, Ottawa, Ontario"},
  { label: "Roger Guindon (RGN)", address: "451 Smyth Street, Ottawa, Ontario"},
  { label: "GSAED Grad House (GSD)", address: "601 Cumberland Street, Ottawa, Ontario"},
  { label: "HNN", address: "202 Henderson Street, Ottawa, Ontario"},
  { label: "Advanced Research Complex (ARC)", address: "25 Templeton Street, Ottawa, Ontario"},
  { label: "KED", address: "585 King Edward Street, Ottawa, Ontario"},
  { label: "STT", address: "1 Stewart Street, Ottawa, Ontario"},
  { label: "Alex Trebek Alumni Hall (ATK)", address: "157 Séraphin Marion Street, Ottawa, Ontario"},
  { label: "ANX", address: "Annex Residence, Ottawa, Ontario"},
  { label: "MNN", address: "Mann Residence, Ottawa, Ontario"},
  { label: "WBD", address: "200 Wilbrod Street, Ottawa, Ontario"},
  { label: "FRL", address: "Friel Residence, Ottawa, Ontario"},
  { label: "RDU", address: "Rideau Residence, Ottawa, Ontario"},
  { label: "Dome", address: "Lees 200 - Bloc F, Ottawa, Ontario"},
];

export const Step0 = ({ route, navigation }: any) => {
  const [step, setStep] = useState(1);
  const [id, setId] = useState(route.params.eventID ?? uid());
  const [freeEventProps, setFreeEventProps] = useState<any>(null);
  const [loading, event, set] = useStateWithFireStoreDocument<EventObject>(
    "events",
    id
  );

  useEffect(() => {
    if (route.params.eventID == undefined) {
      setDoc(doc(fireStore, "events/" + id), {
        id: id,
        organizer: route.params.organizerName ?? getFirebaseUserIDOrEmpty(),

        // Default event
        state: "Draft",
        name: "",
        description: "",
        startTime: new Timestamp(0, 0),
        location: "",
        categories: [],
        onCampus: true,
        images: [],
        priceMin: 0,
        originalLink: "",
        address: "",
        // recurrence: new recurrence("None"),
        organizerType: route.params.organizerName? "Manually Added": "Organizer Added",
      });
    }
  }, []);

  if (loading) {
    return <Loading />;
  }

  const isAdmin = route.params.organizerName != undefined;

  return (
    <View style={{flex: 1, backgroundColor: colours.white, justifyContent: "space-between"}}>
    {/* behavior={Platform.OS === "ios" ? "padding" : "height"} */}

      <ScrollView>
        <View style={{ paddingHorizontal: spacing.page2, ...spacing.verticalPadding1 }}>
          {step == 1 && <Step1 eventID={id} isAdmin={isAdmin} />}
          {step == 2 && <Step2 eventID={id} />}
          {step == 3 && <Step3 eventID={id} />}
          {step == 4 && <Step4 eventID={id} />}
          {step == 5 && <Step5 eventID={id} />}
          {step == 6 && <Step6 eventID={id} />}
          {step == 7 && <Step7 eventID={id} isAdmin={isAdmin} />}
          {step == 8 && <Step8 eventID={id} />}
          {step == 9 && <Step9 eventID={id} />}
          {step == 10 && <Step10 eventID={id} />}
        </View>
      </ScrollView>

      {/* Static Footer */}
      <KeyboardAvoidingView 
        style={{ marginBottom: windowHeight * 0.01 }}
        behavior={Platform.OS === 'ios' ? 'padding' : null}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 95 : 0}
      >
        <ProgressBar progress={step * 0.1} color={colours.purple} />
        <View style={styles.footer_buttons}>
          <Button
            buttonStyle={{ backgroundColor: colours.white }}
            title={"Back"}
            onPress={() => 
              (step == 1 ? navigation.pop() : step == 9 && freeEventProps ? setStep(step-2) : setStep(step - 1))
            }
            titleStyle={{ ...fonts.title3, textDecorationLine: "underline" }}
            disabledStyle={{ backgroundColor: colours.white }}
            disabledTitleStyle={{ color: colours.white }}
            disabled={step == 1 || step == 10}
          />
          <Button
            buttonStyle={{
              backgroundColor: colours.purple,
              padding: 15,
              paddingHorizontal: 25,
              borderRadius: 10,
            }}
            title={step == 10 ? "Publish" : step == 9 ? "Finish" : "Next"}
            onPress={() => {
              if (step == 10) {
                set({ ...event, state: "Pending" });
              }
              step >= 10 ? navigation.pop() : setStep(step + 1)
            }}
            titleStyle={{ ...fonts.title2, color: colours.white }}
          />
        </View>
      </KeyboardAvoidingView>

    </View>
  );
};

/* ---------------------------------- Name ---------------------------------- */
export const Step1: FC<{ eventID: string, isAdmin: boolean }> = (props) => {
  const [loading, event, set] = useStateWithFireStoreDocument<EventObject>("events", props.eventID);

  const [charactersAvailable, setCharactersAvailable] = useState<number>(35);

  if (loading) {
    return <Loading />;
  }

  return (
    <View>
      <Text style={{ ...fonts.title1, ...spacing.verticalMargin2}}>What is the name of your event?</Text>
      <Text style={fonts.regular}>Short names work best. Have fun with it!</Text>

      <View style={{ marginVertical: "5%" }}>
        <Text>
          {charactersAvailable}{" "}
          <Text style={{ color: colours.grey }}>characters available</Text>
        </Text>
        <Input
          selectionColor={colours.purple}
          inputContainerStyle={{
            borderColor: colours.grey,
            borderWidth: 1,
            paddingVertical: 4,
            paddingHorizontal: 8,
            borderRadius: 6,
          }}
          containerStyle={{ paddingHorizontal: 0}}
          onChange={(e) => {
            setCharactersAvailable(35 - e.nativeEvent.text.length);
            set({...event, name: e.nativeEvent.text});
          }}
          maxLength={35}
          defaultValue={event.name}
        />
        {props.isAdmin? 
        <Input
          label="Organizer"
          selectionColor={colours.purple}
          inputContainerStyle={{
            borderColor: colours.grey,
            borderWidth: 1,
            paddingVertical: 4,
            paddingHorizontal: 8,
            borderRadius: 6,
          }}
          containerStyle={{ paddingHorizontal: 0}}
          onChange={(e) => {
            set({...event, organizer: e.nativeEvent.text});
          }}
          defaultValue={event.organizer}
        /> : <></>
      }
      </View>
    </View>
  );
};

/* ---------------------------------- Emoji --------------------------------- */
export const Step2: FC<{ eventID: string }> = (props) => {
  
  const [loading, event, set] = useStateWithFireStoreDocument<EventObject>(
    "events",
    props.eventID
  );

  if (loading) return <Loading />

  return (
    <View>
      <Text style={{ ...fonts.title1, ...spacing.verticalMargin2 }}>Pick <Text style={{color: 'red', textDecorationLine: 'underline'}}>one</Text> emoji to represent your event</Text>
      <Text style={fonts.regular}>Who still uses images? Yuck! Emojis are cooler 😎</Text>

      <View style={{ marginVertical: "5%", paddingHorizontal: "25%"}}>
        {event.emoji && (
          <>
            <Text>How your emoji will look on our platform</Text>
            <View style={{alignItems: 'center'}}>
              <SvgUri
                width={100}
                height={100}
                uri={"https://openmoji.org/data/color/svg/" + (event.emoji ?? "❓").codePointAt(0)?.toString(16).toUpperCase() + ".svg"}
                fill="black"
              />
            </View>
          </>
        )}
        <Input
          selectionColor={colours.purple}
          autoCapitalize="none"
          defaultValue={event.emoji}
          inputContainerStyle={{borderColor: colours.grey, borderBottomWidth: 1, borderWidth: 1, paddingVertical: 4, paddingHorizontal: 10, borderRadius: 6}}
          textAlign="center"
          inputStyle={{ fontSize: 70}}
          onChange={(e) => set({ ...event, emoji: e.nativeEvent.text }) }
          maxLength={8}
        />
        {/* <Input
          selectionColor={colours.purple}
          autoCapitalize="none"
          disabled={true}
          label="How your emoji will look to the students"
          labelStyle={{...fonts.regular}}
          inputContainerStyle={{ borderColor: colours.grey, borderBottomWidth: 1, borderWidth: 1, paddingVertical: 4, paddingHorizontal: 10, borderRadius: 6, height: windowHeight * 0.1}}
          textAlign="center"
          inputStyle={{ fontSize: 80, fontWeight: "bold" }}
          onChange={(e) => emojiToUnicode(e.nativeEvent.text)}
        /> */}
      </View>
    </View>
  );
};

/* --------------------------------- Location ------------------------------- */
export const Step3: FC<{ eventID: string}> = (props) => {
  
  const [loading, event, set] = useStateWithFireStoreDocument<EventObject>(
    "events",
    props.eventID
  );

  if (loading) return <Loading />

  return (
    <View>
      <Text style={{...fonts.title1, ...spacing.verticalMargin2}}>Where is your event taking place?</Text>
      
      <ButtonGroup
        buttons={["On-campus", "Off-campus"]}
        onPress={(index) => {
          if (index == 0) {
            set({ ...event, onCampus: true });
          } else {
            set({ ...event, onCampus: false });
          }
        }}
        selectedIndex={event.onCampus == true ? 0 : 1}
        containerStyle={{ height: 50 }}
        selectedButtonStyle={{ backgroundColor: colours.purple }}
      />
      
      <View style={{marginTop: '10%'}}>
        {event.onCampus ? (
          <View>
            <Text style={fonts.regular}>Select the building or place name</Text>
            <Dropdown
              search
              searchPlaceholder="Search by name or acronym"
              placeholderStyle={{ fontSize: 17, padding: 7}}
              data={data}
              labelField="label"
              valueField="address"
              placeholder={event.location == "" ?  "" :  event.location}
              style={{borderWidth: 1, borderColor: colours.grey, borderRadius: 6, height: windowHeight*0.05}}
              onChange={(item) => set({...event, location: item.label, address: item.address, onCampus: true})}
            />
            <Input
              
              label="Room number (optional)"
              selectTextOnFocus={true}
              selectionColor={colours.purple}
              labelStyle={{...fonts.regular}}
              inputContainerStyle={{borderColor: colours.grey,borderWidth: 1, paddingVertical: 4, paddingHorizontal: 8, borderRadius: 6}}
              containerStyle={{ paddingHorizontal: 0, marginTop: '3%'}}
              onChange={(e) => set({...event, roomNumber: e.nativeEvent.text, onCampus: true})}
              maxLength={30}
              defaultValue={event.roomNumber}
            />
          </View>
        ) :
          <View>
            <Input
              label="Street address"
              selectionColor={colours.purple}
              selectTextOnFocus={true}
              multiline={true}
              defaultValue={ event.address}
              labelStyle={{...fonts.regular}}
              inputContainerStyle={{borderColor: colours.grey,borderWidth: 1, paddingVertical: 4, paddingHorizontal: 8, borderRadius: 6}}
              maxLength={60}
              onChange={(e) => set({ ...event, address: e.nativeEvent.text, onCampus: false})}
            />
            <Input
              label="Location or building name"
              selectionColor={colours.purple}
              selectTextOnFocus={true}
              labelStyle={{...fonts.regular}}
              inputContainerStyle={{borderColor: colours.grey,borderWidth: 1, paddingVertical: 4, paddingHorizontal: 8, borderRadius: 6}}
              defaultValue={event.location}
              maxLength={50}
              onChange={(e) => set({ ...event, location: e.nativeEvent.text, onCampus: false})}
            />
            <Input
              label="Room number (optional)"
              selectionColor={colours.purple}
              selectTextOnFocus={true}
              labelStyle={{...fonts.regular}}
              inputContainerStyle={{borderColor: colours.grey,borderWidth: 1, paddingVertical: 4, paddingHorizontal: 8, borderRadius: 6}}
              defaultValue={event.roomNumber}
              maxLength={30}
              onChange={(e) => set({ ...event, roomNumber: e.nativeEvent.text, onCampus: false})}
            />
          </View>
        }
      </View>

    </View>
  );

};

/* ---------------------------------- Date ---------------------------------- */
export const Step4: FC<{ eventID: string }> = (props) => {

  const hours = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];
  const minutes = ['00', '05', '10', '15', '20', '25', '30', '35', '40', '45', '50', '55'];
  const ampm = ['AM', 'PM'];
  const days = [
    'Wed Aug 30',
    'Thu Aug 31',
    'Fri Sep 01',
    'Sat Sep 02',
    'Sun Sep 03',
    'Mon Sep 04',
    'Tue Sep 05',
    'Wed Sep 06',
    'Thu Sep 07',
    'Fri Sep 08',
    'Sat Sep 09',
    'Sun Sep 10',
    'Mon Sep 11',
    'Tue Sep 12',
    'Wed Sep 13',
    'Thu Sep 14',
    'Fri Sep 15',
    'Sat Sep 16',
    'Sun Sep 17',
    'Mon Sep 18',
    'Tue Sep 19',
    'Wed Sep 20',
    'Thu Sep 21',
    'Fri Sep 22',
    'Sat Sep 23',
    'Sun Sep 24',
    'Mon Sep 25',
    'Tue Sep 26',
    'Wed Sep 27',
    'Thu Sep 28',
    'Fri Sep 29',
    'Sat Sep 30',
    'Sun Oct 01',
    'Mon Oct 02',
    'Tue Oct 03',
    'Wed Oct 04',
    'Thu Oct 05',
    'Fri Oct 06',
    'Sat Oct 07',
    'Sun Oct 08',
    'Mon Oct 09',
    'Tue Oct 10',
    'Wed Oct 11',
    'Thu Oct 12',
    'Fri Oct 13',
    'Sat Oct 14',
    'Sun Oct 15',
    'Mon Oct 16',
    'Tue Oct 17',
    'Wed Oct 18',
    'Thu Oct 19',
    'Fri Oct 20',
    'Sat Oct 21',
    'Sun Oct 22',
    'Mon Oct 23',
    'Tue Oct 24',
    'Wed Oct 25',
    'Thu Oct 26',
    'Fri Oct 27',
    'Sat Oct 28',
    'Sun Oct 29',
    'Mon Oct 30',
    'Tue Oct 31',
    'Wed Nov 01',
    'Thu Nov 02',
    'Fri Nov 03',
    'Sat Nov 04',
    'Sun Nov 05',
    'Mon Nov 06',
    'Tue Nov 07',
    'Wed Nov 08',
    'Thu Nov 09',
    'Fri Nov 10',
    'Sat Nov 11',
    'Sun Nov 12',
    'Mon Nov 13',
    'Tue Nov 14',
    'Wed Nov 15',
    'Thu Nov 16',
    'Fri Nov 17',
    'Sat Nov 18',
    'Sun Nov 19',
    'Mon Nov 20',
    'Tue Nov 21',
    'Wed Nov 22',
    'Thu Nov 23',
    'Fri Nov 24',
    'Sat Nov 25',
    'Sun Nov 26',
    'Mon Nov 27',
    'Tue Nov 28',
    'Wed Nov 29',
    'Thu Nov 30',
    'Fri Dec 01',
    'Sat Dec 02',
    'Sun Dec 03',
    'Mon Dec 04',
    'Tue Dec 05',
    'Wed Dec 06',
    'Thu Dec 07',
    'Fri Dec 08',
    'Sat Dec 09',
    'Sun Dec 10',
    'Mon Dec 11',
    'Tue Dec 12',
    'Wed Dec 13',
    'Thu Dec 14',
    'Fri Dec 15',
    'Sat Dec 16',
    'Sun Dec 17',
    'Mon Dec 18',
    'Tue Dec 19',
    'Wed Dec 20',
    'Thu Dec 21',
    'Fri Dec 22',
    'Sat Dec 23',
    'Sun Dec 24',
    'Mon Dec 25',
    'Tue Dec 26',
    'Wed Dec 27',
    'Thu Dec 28',
    'Fri Dec 29',
    'Sat Dec 30',
    'Sun Dec 31'
  ];
  const [date, setDate] = useState({
    day: "",
    hour: "",
    minute: "",
    ampm: "",
  });

  const convert = () => {
    const dateString = date.day + ' ' + new Date().getFullYear() + ' ' + ((date.ampm === "PM" && date.hour !== "12") ? date.hour+12 : date.hour) + ':' + date.minute + ' ' + date.ampm;
    const dateObj = new Date(dateString);
    // const firebaseTimestamp = Timestamp.fromMillis(dateObj)
    // Timestamp.fromMillis(e.nativeEvent.timestamp!)}
    console.log(dateObj);
  }

  const [loading, event, set] = useStateWithFireStoreDocument<EventObject>("events", props.eventID);
  if (loading) return <Loading />;

  return (
    <View>
      <Text style={fonts.title1}>Provide the date and time of your event</Text>
      <Text style={fonts.regular}>Tells us when we can find you!</Text>

      {/* Recurrence */}
      <View style={spacing.verticalMargin1}>
        <ButtonGroup
          buttons={["Single Event", "Weekly Event", "Custom Weekly", "Specific dates" ]}
          onPress={(index) => {}}
          selectedIndex={0}
          containerStyle={{ height: 50 }}
          selectedButtonStyle={{ backgroundColor: colours.purple }}
        />
      </View>

      <View style={{borderWidth: 1, borderRadius: 10, margin: 3, padding: 3, flexDirection: 'row'}}>
        <WheelPickerExpo
          height={200}
          width={130}
          initialSelectedIndex={0}
          items={days.map(name => ({ label: name, value: ''}))}
          onChange={({ item }) => setDate({...date, day: item.label})}
          selectedStyle={{borderColor: 'black', borderWidth: 1}}
        />
        <WheelPickerExpo
          height={200}
          width={50}
          initialSelectedIndex={0}
          items={hours.map(name => ({ label: name, value: '' }))}
          selectedStyle={{borderColor: 'black', borderWidth: 1}}
          onChange={({ item }) => setDate({...date, hour: item.label})}
        />
        <WheelPickerExpo
          height={200}
          width={50}
          initialSelectedIndex={0}
          items={minutes.map(name => ({ label: name, value: '' }))}
          selectedStyle={{borderColor: 'black', borderWidth: 1}}
          onChange={({ item }) => setDate({...date, minute: item.label})}
        />
        <WheelPickerExpo
          height={200}
          width={50}
          initialSelectedIndex={0}
          items={ampm.map(name => ({ label: name, value: '' }))}
          selectedStyle={{borderColor: 'black', borderWidth: 1}}
          onChange={({ item }) => setDate({...date, ampm: item.label})}
        />
        <Button
          title="Set"
          onPress={() => {
            console.log(date)
            convert();
          }}
        ></Button>
      </View>

      {/* <View style={{borderWidth: 1, borderRadius: 10, margin: 3, padding: 3}}>
      </View> */}

    </View>
  );
};

/* ------------------------------- Description ------------------------------ */
export const Step5: FC<{ eventID: string }> = (props) => {
  
  const [loading, event, set] = useStateWithFireStoreDocument<EventObject>(
    "events",
    props.eventID
  );

  const [charactersAvailable, setCharactersAvailable] = useState<number>(750);

  if (loading) return <Loading />;

  return (
    <View>
      <View>
        <Text style={{ ...fonts.title1, ...spacing.verticalMargin2 }}>
          Provide a description of your event
        </Text>
        <Text style={fonts.regular}>
          Anything you want to share that is not in the title.
        </Text>
      </View>

      <View style={{ marginVertical: "5%" }}>
        <Text>
          {charactersAvailable}{" "}
          <Text style={{ color: colours.grey }}>characters available</Text>
        </Text>
        <Input
          selectionColor={colours.purple}
          defaultValue={event?.description}
          inputStyle={{ height: windowHeight * 0.13 }}
          inputContainerStyle={{
            borderColor: colours.grey,
            borderWidth: 1,
            paddingVertical: 4,
            paddingHorizontal: 10,
            borderRadius: 6,
          }}
          textAlignVertical="top"
          multiline={true}
          containerStyle={{ paddingHorizontal: 0 }}
          onChange={(e) => {
            setCharactersAvailable(750 - e.nativeEvent.text.length);
            set({...event, description: e.nativeEvent.text})
          }}
          maxLength={750}
        />
      </View>
    </View>
  );
};

/* --------------------------------- Price: Free or Nah? ---------------------------------- */
export const Step6: FC<{ eventID: string}> = (props) => {

  const [showField, setShowField] = useState<boolean>(false);
  const [loading, event, set] = useStateWithFireStoreDocument<EventObject>(
    "events",
    props.eventID
  );

  if (loading) {
    return <Loading />;
  }

  return (
    <View>

      <View>
        <Text style={{ ...fonts.title1, ...spacing.verticalMargin2 }}>Enter the price your event</Text>
        <Text style={fonts.regular}></Text>
      </View>

      <View style={{ marginVertical: "5%" }}>
        <ButtonGroup
          buttons={["Free", "Paid"]}
          onPress={(index) => {
            if (index == 0) {
              setShowField(false);
              set({ ...event, priceMin: 0, priceMax: 0});
            } else {
              setShowField(true);
            }
          }}
          selectedIndex={(showField || event.priceMin != 0) ? 1 : 0}
          containerStyle={{ height: 50, paddingHorizontal: 0}}
          selectedButtonStyle={{ backgroundColor: colours.purple }}
        />
      </View>

      {(showField || event.priceMin != 0) &&
        <View style={{flexDirection: 'row', ...spacing.verticalMargin1}}>
          
          <View style={{width: "48%"}}>
            <Input
              label=" "
              selectionColor={colours.purple}
              maxLength={4}
              autoCapitalize="none"
              defaultValue={event.priceMin == 0 ? "" : event.priceMin.toString()}
              leftIcon={<Icon name="dollar" type="font-awesome" size={40} color={colours.black}/>}
              inputContainerStyle={{borderColor: colours.grey, paddingVertical: 4, paddingHorizontal: 10, borderRadius: 6}}
              keyboardType="decimal-pad"
              inputStyle={{ fontSize: 40, fontWeight: "bold" }}
              containerStyle={{
                padding: 20,
                justifyContent: "center",
                alignItems: "center",
              }}
              onChange={(e) => {set({...event, priceMin: parseInt(e.nativeEvent.text)})}}
            />
          </View>
          
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <Text style={{...fonts.title1}}>-</Text>
          </View>
      
          <View style={{width: "48%"}}>
          <Input
            label="Max (Optional)"
            selectionColor={colours.purple}
            maxLength={4}
            autoCapitalize="none"
            leftIcon={<Icon name="dollar" type="font-awesome" size={40} color={colours.black}/>}
            inputContainerStyle={{borderColor: colours.grey, paddingVertical: 4, paddingHorizontal: 10, borderRadius: 6}}
            keyboardType="decimal-pad"
            inputStyle={{ fontSize: 40, fontWeight: "bold" }}
            containerStyle={{padding: 20, justifyContent: "center", alignItems: "center"}}
            onChange={(e) => {set({...event, priceMax: parseInt(e.nativeEvent.text)})}}
          />

          </View>

        </View>
      }
      
    </View>
  );
};

/* ------------------------------- Sign up link ----------------------------- */
export const Step7: FC<{ eventID: string, isAdmin: boolean }> = (props) => {

  const [showField, setShowField] = useState<boolean>(false);
  const [loading, event, set] = useStateWithFireStoreDocument<EventObject>(
    "events",
    props.eventID
  );

  if (loading) {
    return <Loading />;
  }

  return (
    <View>
      
      <Text style={{ ...fonts.title1, ...spacing.verticalMargin2 }}>Does your event require sign up or ticket purchasing?</Text>
      <Text style={fonts.regular}>Provide the link where students can sign up or purchase tickets to the event.</Text>
      
      <View style={{ marginVertical: "5%" }}>
        <ButtonGroup
          buttons={["No", "Yes"]}
          onPress={(index) => {
            if (index == 0) {
              set({...event, signUpLink: ""}) //TODO Ask Antoine Lavigne
              setShowField(false)
            } else {
              setShowField(true)
            }
          }}
          selectedIndex={(showField || event.signUpLink || event.signUpLink != "") ? 1 : 0}
          containerStyle={{ height: 50, paddingHorizontal: 0}}
          selectedButtonStyle={{ backgroundColor: colours.purple }}
        />
      </View>

      {(event.signUpLink || event.signUpLink != "" || showField) && 
        <View style={{ marginVertical: "5%" }}>
          <Input
            selectionColor={colours.purple}
            defaultValue={event?.signUpLink}
            placeholder="Insert link"
            // inputStyle={{height: windowHeight*0.08}}
            inputContainerStyle={{
              borderColor: colours.grey,
              borderWidth: 1,
              paddingVertical: 4,
              paddingHorizontal: 10,
              borderRadius: 6,
            }}
            textAlignVertical="top"
            containerStyle={{paddingHorizontal: 0}}
            onChange={(e) => set({...event, signUpLink: e.nativeEvent.text})}
            maxLength={300}
          />
        </View>
      }

      {props.isAdmin && 
        <Input
        selectionColor={colours.purple}
        defaultValue={event?.originalLink}
        placeholder="Insert original link"
        // inputStyle={{height: windowHeight*0.08}}
        inputContainerStyle={{
          borderColor: colours.grey,
          borderWidth: 1,
          paddingVertical: 4,
          paddingHorizontal: 10,
          borderRadius: 6,
        }}
        textAlignVertical="top"
        containerStyle={{paddingHorizontal: 0}}
        onChange={(e) => set({...event, originalLink: e.nativeEvent.text})}
        maxLength={300}
      />
      }

    </View>
  );
};

/* ---------------------------------- Tags ---------------------------------- */
export const Step8: FC<{ eventID: string }> = (props) => {

  const [loading, event, set] = useStateWithFireStoreDocument<EventObject>(
    "events",
    props.eventID
  );

  const [loading2, events, add] =
  useStateWithFireStoreCollection<EventObject>("events");

  const [fixedCategories, setFixedCategories] = useState<string[]>([]);

  let categories: string[] = [];

  useEffect(() => {
    if (fixedCategories.length == 0) {
      setFixedCategories(categories);
    }
  }, [events]);

  const [newCategory, setNewCategory] = useState<string>("");
  
  if (loading || loading2) {
    return <Loading />;
  }

  const getSelectedIndexes = () => {
    // Calculate the selected categories
    let set: number[] = [];
    for (let category of event.categories) {
      set.push(fixedCategories.indexOf(category));
    }
    return set;
  }

  const getSelectedCategories = () => {
    // Calculate the selected categories
    let set: string[] = [];
    for (let category of event.categories) {
      set.push(category);
    }
    return set;
  }

  categories = getOrderedCategories(events as EventObject[]);

  let categoryData = [];
  for (let category of fixedCategories) {
    categoryData.push({label: category, value: category});
  }

  const updateEvent = (indexes: number[]) => {
    let newCategories: string[] = [];
    for (let index of indexes) {
      newCategories.push(fixedCategories[index] as string);
    }
    set({ ...event, categories: newCategories });
  }

  return (
    <View>
      <View>
        <Text style={{ ...fonts.title1, ...spacing.verticalMargin2 }}>
          Select up to 5 tags for your event
        </Text>
        <Text>
          Tags are used as categories and search keywords.
        </Text>
      </View>
      <MultiSelect
        search
        searchPlaceholder="Search tags"
        placeholderStyle={{ fontSize: 17, padding: 7}}
        selectedStyle={{borderRadius: 10, padding: '2%', borderColor: colours.black}}
        selectedTextStyle={{color: colours.black, fontSize: 18}}
        data={categoryData}
        maxSelect={5}
        activeColor={colours.purple}
        value={event.categories}
        labelField={"label"}
        valueField={"value"}
        placeholder={"Select up to 5 tags"}
        style={{borderWidth: 1, borderColor: colours.grey, borderRadius: 6, height: windowHeight*0.05}}
        onChange={(item) => {
          set({...event, categories: item})
        }}
      />
      <Input
        label="Create a new tag"
        disabled={getSelectedCategories().length >= 5}
        selectTextOnFocus={true}
        selectionColor={colours.purple}
        labelStyle={{...fonts.title3, paddingTop: 10}}
        inputContainerStyle={{borderColor: colours.grey,borderWidth: 1, paddingVertical: 0, borderRadius: 6, padding: 10}}
        containerStyle={{ paddingHorizontal: 0}}
        onChangeText={(text) => setNewCategory(text.toLowerCase())}
        value={newCategory}
        maxLength={30}
        defaultValue={event.roomNumber}
      />
      <Button
        buttonStyle={{
          backgroundColor: colours.purple,
          padding: 10,
          borderRadius: 10,
          width: '30%',
        }}
        disabled={getSelectedCategories().length >= 5}
        title="Add tag"
        onPress={() =>{
          if (newCategory == "") {
            return;
          }
          set({...event, categories: [...event.categories, newCategory]})
          categoryData.push({label: newCategory, value: newCategory});
          setNewCategory("");
        }}
        titleStyle={{ ...fonts.title3, color: colours.white}}
      />
      <Text>
        Note that the created tag will not show up in the list above, but will still be created. Choose tags that represent categories of events. Avoid tags that contain information already specified such as "On campus" or "Free". Separate words with spaces.
      </Text>
      <View></View>
    </View>
  );
};

/* --------------------------------- Review --------------------------------- */
export const Step9: FC<{ eventID: string }> = (props) => {
  
  const [loading, event, set] = useStateWithFireStoreDocument<EventObject>(
    "events",
    props.eventID
  );

  const [loading2, events, add] =
  useStateWithFireStoreCollection<EventObject>("events");

  const [fixedCategories, setFixedCategories] = useState<string[]>([]);

  let categories: string[] = [];

  useEffect(() => {
    if (fixedCategories.length == 0) {
      setFixedCategories(categories);
    }
  }, [events]);

  const [newCategory, setNewCategory] = useState<string>("");
  
  if (loading || loading2) {
    return <Loading />;
  }

  const getSelectedCategories = () => {
    // Calculate the selected categories
    let set: string[] = [];
    for (let category of event.categories) {
      set.push(category);
    }
    return set;
  }

  categories = getOrderedCategories(events as EventObject[]);

  let categoryData = [];
  for (let category of fixedCategories) {
    categoryData.push({label: category, value: category});
  }

  if (loading) {
    return <Loading />;
  }

  return (
    <View style={{}}>

      <View>
        <Text style={{ ...fonts.title1, ...spacing.verticalMargin2 }}>Review and Publish</Text>
        <Text style={fonts.regular}>Let's review the details.</Text>
      </View>

      <View style={spacing.verticalMargin1}>

        {/* Name */}
        <Input
          label="Event Name"
          selectionColor={colours.purple}
          inputContainerStyle={{borderColor: colours.grey, borderWidth: 1, paddingVertical: 4, paddingHorizontal: 8, borderRadius: 6}}
          // leftIcon={<Icon name="event-note" type="material-icon" color={colours.grey} />}
          containerStyle={{ paddingHorizontal: 0}}
          onChange={(e) => set({...event, name: e.nativeEvent.text})}
          // maxLength={35}
          defaultValue={event.name}
        />
        
        {/* Emoji */}
        <Input
          label="Emoji"
          selectionColor={colours.purple}
          inputContainerStyle={{borderColor: colours.grey,borderWidth: 1,paddingVertical: 4,paddingHorizontal: 8,borderRadius: 6}}
          // leftIcon={<Icon name="sticker-emoji" type="material-community" color={colours.grey} />}
          containerStyle={{ paddingHorizontal: 0}}
          onChange={(e) => set({...event, emoji: e.nativeEvent.text})}
          maxLength={8}
          defaultValue={event.emoji}
        />

        {/* Location */}
        <View style={{backgroundColor: '#F1F1F1', padding: '1%'}}>
          <Text style={{...fonts.title3, fontWeight: 'bold', color: 'grey', paddingLeft: '3%'}}>On-campus</Text>
          <ButtonGroup
            buttons={["Yes", "No"]}
            onPress={(index) => {
              if (index == 0) {
                set({ ...event, onCampus: true });
              } else {
                set({ ...event, onCampus: false });
              }
            }}
            selectedIndex={event.onCampus == true ? 0 : 1}
            containerStyle={{ height: 50, paddingHorizontal: 0}}
            selectedButtonStyle={{ backgroundColor: colours.purple }}
          />

          <View>
            {event.onCampus ? (
              <View>
                <Text style={fonts.regular}>Select the building or place name</Text>
                <Dropdown
                  search
                  searchPlaceholder="Search by name or acronym"
                  placeholderStyle={{ fontSize: 17, padding: 10}}
                  data={data}
                  labelField="label"
                  valueField="address"
                  placeholder={event.location == "" ?  "" :  event.location}
                  style={{borderWidth: 1, borderColor: colours.grey, borderRadius: 6, height: windowHeight*0.05}}
                  onChange={(item) => set({...event, location: item.label, address: item.address, onCampus: true})}
                />
                <Input
                  label="Room number (optional)"
                  selectTextOnFocus={true}
                  selectionColor={colours.purple}
                  labelStyle={{...fonts.regular}}
                  inputContainerStyle={{borderColor: colours.grey,borderWidth: 1, paddingVertical: 4, borderRadius: 6}}
                  containerStyle={{ paddingHorizontal: 0}}
                  onChange={(e) => set({...event, roomNumber: e.nativeEvent.text, onCampus: true})}
                  maxLength={30}
                  defaultValue={event.roomNumber}
                />
              </View>
            ) :
              <View>
                <Input
                  label="Street address"
                  selectionColor={colours.purple}
                  selectTextOnFocus={true}
                  multiline={true}
                  defaultValue={ event.address}
                  labelStyle={{...fonts.regular}}
                  inputContainerStyle={{borderColor: colours.grey,borderWidth: 1, paddingHorizontal: 8, borderRadius: 6}}
                  maxLength={60}
                  onChange={(e) => set({ ...event, address: e.nativeEvent.text, onCampus: false})}
                />
                <Input
                  label="Location or building name"
                  selectionColor={colours.purple}
                  selectTextOnFocus={true}
                  labelStyle={{...fonts.regular}}
                  inputContainerStyle={{borderColor: colours.grey,borderWidth: 1, paddingHorizontal: 8, borderRadius: 6}}
                  defaultValue={event.location}
                  maxLength={50}
                  onChange={(e) => set({ ...event, location: e.nativeEvent.text, onCampus: false})}
                />
                <Input
                  label="Room number (optional)"
                  selectionColor={colours.purple}
                  selectTextOnFocus={true}
                  labelStyle={{...fonts.regular}}
                  inputContainerStyle={{borderColor: colours.grey,borderWidth: 1, paddingVertical: 4, paddingHorizontal: 8, borderRadius: 6}}
                  defaultValue={event.roomNumber}
                  maxLength={30}
                  onChange={(e) => set({ ...event, roomNumber: e.nativeEvent.text, onCampus: false})}
                />
              </View>
            }
          </View>
          
        </View>

        {/* Date, time, recurrence */}
        <View style={{backgroundColor: '#F1F1F1', padding: '1%'}}>
          <Text style={fonts.title3}>Start Time</Text>
          <DateTimePicker
            value={event.startTime == null ? new Date() : event.startTime.toDate()}
            mode={"datetime"}
            display="spinner"
            minimumDate={new Date()}
            maximumDate={new Date(2023, 31, 31)}
            onChange={(e) => set({...event, startTime: Timestamp.fromMillis(e.nativeEvent.timestamp!)})}
          />
          <Text style={fonts.title3}>End Time</Text>
          <DateTimePicker
            value={event.endTime == null ? new Date() : event.endTime.toDate()}
            mode={"datetime"}
            display="spinner"
            minimumDate={event.startTime == null ? new Date() : event.startTime.toDate()}
            maximumDate={new Date(2023, 31, 31)}
            onChange={(e) => set({...event, endTime: Timestamp.fromMillis(e.nativeEvent.timestamp!)})}
          />
        </View>

        {/* Description */}
        <Input
          label="Description"
          selectionColor={colours.purple}
          multiline={true}
          maxLength={750}
          inputContainerStyle={{borderColor: colours.grey,borderWidth: 1,paddingVertical: 4,paddingHorizontal: 8,borderRadius: 6}}
          onChange={(e) => set({ ...event, description: e.nativeEvent.text })}
          defaultValue={event.description}
          containerStyle={{ paddingHorizontal: 0}}
        />

        {/* Price */}
        <View style={{flexDirection: "row"}}>
          <Input
            label="Price"
            defaultValue={event.priceMin.toString()}
            onChange={(e) => set({...event, priceMin: Number(e.nativeEvent.text)})}
            selectionColor={colours.purple}
            inputContainerStyle={{borderColor: colours.grey,borderWidth: 1,paddingVertical: 4,paddingHorizontal: 8,borderRadius: 6}}
            containerStyle={{paddingHorizontal: 0, flex:1}}
            maxLength={4}
          />
          <Text> </Text>
          <Input
            label="Max Price (Optional)"
            defaultValue={event.priceMax?.toString()}
            onChange={(e) => set({...event, priceMax: Number(e.nativeEvent.text)})}
            selectionColor={colours.purple}
            inputContainerStyle={{borderColor: colours.grey,borderWidth: 1,paddingVertical: 4,paddingHorizontal: 8,borderRadius: 6}}
            containerStyle={{paddingHorizontal: 0, flex:1}}
            maxLength={4}
          />
        </View>

        {/* Sign up link */}
        <Input
          label="Sign up link"
          multiline={true}
          defaultValue={event.signUpLink}
          onChange={(e) => set({ ...event, signUpLink: e.nativeEvent.text })}
          selectionColor={colours.purple}
          inputContainerStyle={{borderColor: colours.grey,borderWidth: 1,paddingVertical: 4,paddingHorizontal: 8,borderRadius: 6}}
          containerStyle={{paddingHorizontal: 0}}
          maxLength={300}
        />

        {/* Tags */}
        <View>
          <Text style={{...fonts.title3, fontWeight: 'bold', color: 'grey'}}>
            Tags
          </Text>
          <MultiSelect
            search
            searchPlaceholder="Search tags"
            placeholderStyle={{ fontSize: 17, padding: 7}}
            selectedStyle={{borderRadius: 10, padding: '2%', borderColor: colours.black}}
            selectedTextStyle={{color: colours.black, fontSize: 18}}
            data={categoryData}
            maxSelect={5}
            activeColor={colours.purple}
            value={getSelectedCategories()}
            labelField={"label"}
            valueField={"value"}
            placeholder={"Select up to 5 tags"}
            style={{borderWidth: 1, borderColor: colours.grey, borderRadius: 6, height: windowHeight*0.05}}
            onChange={(item) => {
              set({...event, categories: item})
            }}
          />
          <Input
            label="New Tag (Note that it will not show above once created)"
            disabled={getSelectedCategories().length >= 5}
            selectTextOnFocus={true}
            selectionColor={colours.purple}
            labelStyle={{...fonts.regular}}
            inputContainerStyle={{borderColor: colours.grey,borderWidth: 1, paddingVertical: 4, borderRadius: 6}}
            containerStyle={{ paddingHorizontal: 0}}
            onChangeText={(text) => setNewCategory(text)}
            value={newCategory}
            maxLength={30}
            defaultValue={event.roomNumber}
          />
          <Button
            buttonStyle={{
              backgroundColor: colours.purple,
              padding: 10,
              borderRadius: 10,
              width: '30%',
            }}
            disabled={getSelectedCategories().length >= 5}
            title="create"
            onPress={() =>{
              if (newCategory == "") {
                return;
              }
              set({...event, categories: [...event.categories, newCategory]})
              categoryData.push({label: newCategory, value: newCategory});
              setNewCategory("");
            }}
            titleStyle={{ ...fonts.title2, color: colours.white }}
          />
        </View>

      </View>

    </View>
  );
};

/* --------------------------------- Finish --------------------------------- */
export const Step10: FC<{ eventID: string }> = (props) => {
  return (
    <View>
      <View>
        <Text style={{ ...fonts.title1, ...spacing.verticalMargin2 }}>
          🎉 You're all set! Sit back and relax while we approve your event. 🎉
        </Text>
        <Text style={fonts.regular}>
          Events approval can take up to 2 hours.
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  footer_buttons: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: "2.5%",
    paddingHorizontal: "5%",
    alignItems: "center",
    backgroundColor: colours.white,
    borderTopColor: colours.primaryGrey,
    borderTopWidth: 2,
  },
});