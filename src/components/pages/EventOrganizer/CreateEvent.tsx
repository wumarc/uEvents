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
import { FC, useEffect, useState } from "react";
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
import { Dropdown } from "react-native-element-dropdown";
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
import { Timestamp, doc, setDoc } from "firebase/firestore";
import { fireStore } from "../../../firebaseConfig";
import DateTimePicker from "@react-native-community/datetimepicker";

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
        organizer: getFirebaseUserIDOrEmpty(),

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
        organizerType: "Organizer Added",
      });
    }
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <View style={{flex: 1, backgroundColor: colours.white, justifyContent: "space-between"}}>
    {/* behavior={Platform.OS === "ios" ? "padding" : "height"} */}

      <ScrollView>
        <View style={{ paddingHorizontal: spacing.page2, ...spacing.verticalPadding1 }}>
          {step == 1 && <Step1 eventID={id} />}
          {step == 2 && <Step2 eventID={id} />}
          {step == 3 && <Step3 eventID={id} />}
          {step == 4 && <Step4 eventID={id} />}
          {step == 5 && <Step5 eventID={id} />}
          {step == 6 && <Step6 eventID={id} />}
          {step == 7 && <Step7 eventID={id} />}
          {step == 8 && <Step8 eventID={id} />}
          {step == 9 && <Step9 eventID={id} />}
          {step == 10 && <Step10 eventID={id} />}
        </View>
      </ScrollView>

      {/* Static Footer */}
      <KeyboardAvoidingView style={{ marginBottom: windowHeight * 0.01 }}>
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
export const Step1: FC<{ eventID: string }> = (props) => {
  const [loading, event, set] = useStateWithFireStoreDocument<EventObject>("events", props.eventID);

  const [charactersAvailable, setCharactersAvailable] = useState<number>(35);

  if (loading) {
    return <Loading />;
  }

  return (
    <View>
      <Text style={{ ...fonts.title1, ...spacing.verticalMargin2}}>How should we call your event?</Text>
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
      <Text style={{ ...fonts.title1, ...spacing.verticalMargin2 }}>Pick one emoji to represent your event</Text>
      <Text style={fonts.regular}>Who still uses images? Yuck! Emojis are cooler 😎</Text>

      <View style={{ marginVertical: "5%", paddingHorizontal: "30%"}}>
        <Input
          selectionColor={colours.purple}
          autoCapitalize="none"
          defaultValue={event.emoji}
          inputContainerStyle={{borderColor: colours.grey, borderBottomWidth: 1, borderWidth: 1, paddingVertical: 4, paddingHorizontal: 10, borderRadius: 6}}
          textAlign="center"
          inputStyle={{ fontSize: 70}}
          onChange={(e) => set({ ...event, emoji: e.nativeEvent.text }) }
          maxLength={5}
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

  const data = [
    { label: "Academic Hall (SMN)", address: "133-135 Séraphin Marion Street, Ottawa, Ontario"},
    { label: "Hagen (HGN)", address: "115 Séraphin Marion Street, Ottawa, Ontario"},
    { label: "William Commanda (WCA)", address: "52 University Street, Ottawa, Ontario"},
    { label: "Tabaret Hall (TBT)", address: "550 Cumberland Street, Ottawa, Ontario"},
    { label: "Department of Visual Arts (LRR)", address: "100 Laurier Street, Ottawa, Ontario"},
    { label: "Hamelin (MHN)", address: "70 Laurier Street, Ottawa, Ontario"},
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

  if (loading) return <Loading />

  return (
    <View>
      <Text style={{...fonts.title1, ...spacing.verticalMargin2}}>Is your event taking place on campus?</Text>
      
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
              maxLength={10}
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
              maxLength={10}
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

  const [loading, event, set] = useStateWithFireStoreDocument<EventObject>("events", props.eventID);
  if (loading) return <Loading />;

  return (
    <View>
      <Text style={fonts.title1}>Provide the date and time of your event</Text>
      <Text style={fonts.regular}>Tells us when we can find you!</Text>

      {/* Recurrence */}
      <View style={spacing.verticalMargin1}>
        {/* <ButtonGroup
          buttons={["Single Event", "Weekly Event"]}
          onPress={(index) => {}}
          selectedIndex={0}
          containerStyle={{ height: 50 }}
          selectedButtonStyle={{ backgroundColor: colours.purple }}
        /> */}
      </View>

      <View style={{borderWidth: 1, borderRadius: 10, margin: 3, padding: 3}}>
        {Platform.OS === "ios" &&
          <>
            <Text style={fonts.title3}>Start Time</Text>
            <DateTimePicker
              value={event.startTime == null ? new Date() : event.startTime.toDate()}
              mode={"datetime"}
              display="spinner"
              minimumDate={new Date()}
              maximumDate={new Date(2023, 31, 31)}
              onChange={(e) => set({...event, startTime: Timestamp.fromMillis(e.nativeEvent.timestamp!)})}
            />
          </>
        }
        {Platform.OS === "android" &&
          <>
            <Text style={fonts.title3}>Start Time (MM-DD-YYYY-HH-MM)</Text>
            <Input
              selectionColor={colours.purple}
              defaultValue={event.startTime == null ? "" : event.startTime.toDate().toLocaleDateString() + "-" + event.startTime.toDate().toLocaleTimeString(undefined, {hour: '2-digit', minute: '2-digit'})}
              inputContainerStyle={{borderColor: colours.grey,borderWidth: 1, paddingVertical: 4, paddingHorizontal: 8, borderRadius: 6}}
              maxLength={50}
              onChange={(e) => set({...event, startTime: Timestamp.fromMillis(Date.parse(e.nativeEvent.text))})}
            />
          </>
        }

      </View>

      <View style={{borderWidth: 1, borderRadius: 10, margin: 3, padding: 3}}>
      {Platform.OS === "ios" &&
        <>
          <Text style={fonts.title3}>End Time (Optional)</Text>
          <DateTimePicker
            value={event.endTime == null ? new Date() : event.endTime.toDate()}
            mode={"datetime"}
            display="spinner"
            minimumDate={event.startTime == null ? new Date() : event.startTime.toDate()}
            maximumDate={new Date(2023, 31, 31)}
            onChange={(e) => set({...event, endTime: Timestamp.fromMillis(e.nativeEvent.timestamp!)})}
          />
        </>
      }
      {Platform.OS === "android" &&
        <>
          <Text>End Time (Optional)</Text>
          <Input
              selectionColor={colours.purple}
              defaultValue={event.startTime == null ? "" : event.startTime.toDate().toLocaleDateString() + "-" + event.startTime.toDate().toLocaleTimeString()}
              inputContainerStyle={{borderColor: colours.grey,borderWidth: 1, paddingVertical: 4, paddingHorizontal: 8, borderRadius: 6}}
              maxLength={50}
              onChange={(e) => set({...event, startTime: Timestamp.fromMillis(Date.parse(e.nativeEvent.text))})}
            />
        </>
      }
      </View>

    </View>
  );
};

/* ------------------------------- Description ------------------------------ */
export const Step5: FC<{ eventID: string }> = (props) => {
  
  const [loading, event, set] = useStateWithFireStoreDocument<EventObject>(
    "events",
    props.eventID
  );

  const [charactersAvailable, setCharactersAvailable] = useState<number>(400);

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
            setCharactersAvailable(400 - e.nativeEvent.text.length);
            set({...event, description: e.nativeEvent.text})
          }}
          maxLength={400}
        />
      </View>
    </View>
  );
};

/* --------------------------------- Price: Free or Nah? ---------------------------------- */
export const Step6: FC<{ eventID: string}> = (props) => {

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
        <Text style={{ ...fonts.title1, ...spacing.verticalMargin2 }}>Enter the price of your event</Text>
        <Text style={fonts.regular}>Skip this step if your event is free.</Text>
      </View>

      <View style={{flexDirection: 'row', ...spacing.verticalMargin1}}>

        <View style={{width: "48%"}}>
          <Input
            label=" "
            selectionColor={colours.purple}
            maxLength={4}
            autoCapitalize="none"
            placeholder=""
            leftIcon={<Icon name="dollar" type="font-awesome" size={40}color={colours.black}/>}
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
      
    </View>
  );
};

/* ------------------------------- Sign up link ----------------------------- */
export const Step7: FC<{ eventID: string }> = (props) => {

  const [loading, event, set] = useStateWithFireStoreDocument<EventObject>(
    "events",
    props.eventID
  );

  if (loading) {
    return <Loading />;
  }

  return (
    <View>
      
      <Text style={{ ...fonts.title1, ...spacing.verticalMargin2 }}>Do you require sign up?</Text>
      <Text style={fonts.regular}>Skip this step if your event requires no sign up.</Text>
      
      <View style={{ marginVertical: "5%" }}>
        <Input
          selectionColor={colours.purple}
          defaultValue={event?.signUpLink}
          placeholder="https://docs.google.com/forms/d/e/1FAIpQLSe7-SQCOLPxuD62i9ddBTcMPoA0OdUhrvJWprt7WY06IO3KEg/viewform"
          // inputStyle={{height: windowHeight*0.08}}
          inputContainerStyle={{
            borderColor: colours.grey,
            borderWidth: 1,
            paddingVertical: 4,
            paddingHorizontal: 10,
            borderRadius: 6,
          }}
          textAlignVertical="top"
          multiline={true}
          containerStyle={{paddingHorizontal: 0}}
          onChange={(e) => set({...event, signUpLink: e.nativeEvent.text})}
          maxLength={300}
        />
      </View>

    </View>
  );
};

/* ---------------------------------- Tags ---------------------------------- */
export const Step8: FC<{ eventID: string }> = (props) => {
  // const [loading, categories, setCategories] = useSateWithFireStore<string[]>(
  //   "categories/names",
  //   "list",
  //   []
  // );

  // const [loading2, categoriesValue, setCategoriesValue] = useSateWithFireStore<
  //   number[]
  // >("categories/values", "list", []);

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

  categories = getOrderedCategories(events as EventObject[]);

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
          Select tags to represent your event
        </Text>
        <Text style={fonts.regular}>
          Pick up to 5 tags to represent your event
        </Text>
      </View>
      <ButtonGroup
        buttons={fixedCategories}
        onPress={(index) => {
          let selected = getSelectedIndexes();
          let newSelected = []
          if (selected.includes(index)) {
            newSelected = selected.filter((item) => item != index);
          } else {
            if (selected.length < 5) {
              newSelected = [...selected, index];
            } else {
              newSelected = [
                selected[1],
                selected[2],
                selected[3],
                selected[4],
                index,
              ];
            }
          }
          updateEvent(newSelected);
        }}
        selectedIndexes={getSelectedIndexes()}
        vertical
      />

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
          inputContainerStyle={{borderColor: colours.grey,borderWidth: 1,paddingVertical: 4,paddingHorizontal: 8,borderRadius: 6}}
          // leftIcon={<Icon name="event-note" type="material-icon" color={colours.grey} />}
          containerStyle={{ paddingHorizontal: 0}}
          onChange={(e) => set({...event, name: e.nativeEvent.text})}
          maxLength={35}
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
        <Input
          label="Location"
          selectionColor={colours.purple}
          inputContainerStyle={{borderColor: colours.grey,borderWidth: 1,paddingVertical: 4,paddingHorizontal: 8,borderRadius: 6}}
          containerStyle={{ paddingHorizontal: 0}}
          onChange={(e) => set({...event, location: e.nativeEvent.text})}
          maxLength={8}
          defaultValue={event.location}
        />

        {/* Date, time, recurrence */}
        <View style={{flexDirection: "row"}}>
          <Input
            label="Date and time"
            // leftIcon={<Icon name="date-range" type="ionicons" color={colours.grey} />}
            selectionColor={colours.purple}
            // inputStyle={{height: windowHeight*0.08}}
            inputContainerStyle={{
              borderColor: colours.grey,
              borderWidth: 1,
              paddingVertical: 2,
              borderRadius: 6,
            }}
            containerStyle={{paddingHorizontal: 0}}
          />
        </View>

        {/* Description */}
        <Input
          label="Description"
          selectionColor={colours.purple}
          multiline={true}
          maxLength={400}
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
        />

        {/* Tags */}
        <View style={{flexDirection: "row"}}>
          <Input
            label="Tags"
            selectionColor={colours.purple}
            inputContainerStyle={{borderColor: colours.grey,borderWidth: 1,paddingVertical: 4,paddingHorizontal: 8,borderRadius: 6}}
            containerStyle={{paddingHorizontal: 0}}
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
          You can view your event on the Events page.
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