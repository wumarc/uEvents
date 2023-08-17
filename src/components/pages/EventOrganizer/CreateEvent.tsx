import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Modal,
  KeyboardAvoidingView,
  Platform,
  Pressable,
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

export const Step0 = ({ route, navigation }: any) => {
  const [step, setStep] = useState(1);
  const [id, setId] = useState(route.params.eventID ?? uid());
  const [propsFromStep3, setPropsFromStep3] = useState<any>(null);
  const [freeEventProps, setFreeEventProps] = useState<any>(null);

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
        onCampus: false,
        images: [],
        priceMin: 0,
        originalLink: "",
        address: "",
        // recurrence: new recurrence("None"),
        organizerType: "Organizer Added",
      });
    }
  }, []);

  return (
    <View style={{flex: 1, backgroundColor: colours.white, justifyContent: "space-between"}}>
    {/* behavior={Platform.OS === "ios" ? "padding" : "height"} */}
      
      <ScrollView>
        <View style={{ paddingHorizontal: spacing.page2, ...spacing.verticalPadding1 }}>
          {step == 1 && <Step1 eventID={id} />}
          {step == 2 && <Step2 eventID={id} />}
          {step == 3 && <Step3 eventID={id} />}
          {step == 4 && <Step3b eventID={id} />}
          {step == 5 && <Step4 eventID={id} />}
          {step == 6 && <Step4 eventID={id} />}
          {step == 7 && <Step5 eventID={id} />}
          {step == 8 && <Step6 eventID={id} setFreeEventProps={setFreeEventProps} step={step} setStep={setStep}/>}
          {step == 9 && <Step6b eventID={id} freeEventProps={freeEventProps}/>}
          {step == 10 && <Step7 eventID={id} />}
          {step == 11 && <Step8 eventID={id} />}
          {step == 12 && <Step9 eventID={id} />}
          {step == 13 && <Step10 eventID={id} />}
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
            disabled={step == 6}
            title={step != 10 ? "Next" : "Finish"}
            onPress={() => {
              step != 10 ? setStep(step + 1) : navigation.pop();
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
  const [loading, event, set] = useStateWithFireStoreDocument<EventObject>(
    "events",
    props.eventID
  );

  const [charactersAvailable, setCharactersAvailable] = useState<number>(35);

  if (loading) {
    return <Loading />;
  }

  return (
    <View>
      <Text style={{ ...fonts.title1, ...spacing.verticalMargin2 }}>
        How should we call your event?
      </Text>

      <Text style={fonts.regular}>
        Short names work best. Have fun with it!
      </Text>

      <View style={{ marginVertical: "5%" }}>
        <Text>
          {charactersAvailable}{" "}
          <Text style={{ color: colours.grey }}>characters available</Text>
        </Text>
        <Input
          selectionColor={colours.black}
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
          containerStyle={{ paddingHorizontal: 0 }}
          onChange={(e) => {
            setCharactersAvailable(35 - e.nativeEvent.text.length);
            set({ ...event, name: e.nativeEvent.text });
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
  const [unicodePath, setUnicodePath] = useState<string>(
    "../../../assets/openmojis/1F600.png"
  );

  // use this to valide the emoji
  const isEmoji = (character: string) => {
    const regex = emojiRegex();
    return regex.test(character);
  };

  function emojiToUnicode(emoji: any) {
    if (emoji.length == 0) return;
    setUnicodePath(
      "../../../assets/openmojis/" +
        emoji.codePointAt(0).toString(16).toUpperCase()
    );
  }

  return (
    <View>
      <Text style={{ ...fonts.title1, ...spacing.verticalMargin2 }}>
        Pick an emoji to represent your event
      </Text>
      <Text style={fonts.regular}>
        Who still uses images? Yuck! Emojis are cooler 😎
      </Text>

      <View style={{ marginVertical: "5%", paddingHorizontal: "3%"}}>
        <Input
          selectionColor={colours.black}
          autoCapitalize="none"
          inputContainerStyle={{
            borderColor: colours.grey,
            borderBottomWidth: 1,
            borderWidth: 1,
            paddingVertical: 4,
            paddingHorizontal: 10,
            borderRadius: 6,
          }}
          onChange={(e) => {emojiToUnicode(e.nativeEvent.text)}}
          maxLength={5}
        />
        <Input
          selectionColor={colours.black}
          autoCapitalize="none"
          disabled={true}
          label="How your emoji will look to the students"
          labelStyle={{...fonts.regular}}
          inputContainerStyle={{
            borderColor: colours.grey,
            borderBottomWidth: 1,
            borderWidth: 1,
            paddingVertical: 4,
            paddingHorizontal: 10,
            borderRadius: 6,
            height: windowHeight * 0.1,
          }}
          textAlign="center"
          inputStyle={{ fontSize: 80, fontWeight: "bold" }}
          onChange={(e) => {
            emojiToUnicode(e.nativeEvent.text);
          }}
        />
      </View>
    </View>
  );
};

/* --------------------------------- Location ------------------------------- */
export const Step3: FC<{ eventID: string }> = (props) => {
  const [nextStep, setNextStep] = useState<boolean>(false);
  const [onCampus, setOnCampus] = useState<boolean>(false);
  const [buildingName, setBuildingName] = useState<string>("");
  const [isFocus, setIsFocus] = useState(false);

  const data = [
    { label: "Montpetit Gym", value: "1" },
    { label: "University Centre", value: "2" },
    { label: "Learning Crossroad", value: "3" },
    { label: "Cant find a building?", value: "4" },
  ];

  return (
    <View>
      {!nextStep && (
        <View>
          <Text style={{ ...fonts.title1, ...spacing.verticalMargin2 }}>
            Is your event taking place on campus?
          </Text>

          <View style={{ marginVertical: "5%" }}>
            <Button
              title={"Yes"}
              buttonStyle={{
                backgroundColor: colours.purple,
                padding: 15,
                borderRadius: 10,
                marginBottom: 10,
              }}
              onPress={() => {
                setNextStep(true);
                setOnCampus(true);
              }}
            />
            <Button
              title={"No"}
              buttonStyle={{
                backgroundColor: colours.purple,
                padding: 15,
                borderRadius: 10,
              }}
              onPress={() => {
                setNextStep(true);
                setOnCampus(false);
              }}
            />
          </View>
        </View>
      )}

      {nextStep && (
        <View>
          <Text style={fonts.title1}>
            {onCampus
              ? "In which building is your event taking place?"
              : "Where will the event take place?"}
          </Text>

          <View style={{ marginVertical: "5%" }}>
            <Text style={fonts.regular}>
              {onCampus
                ? "Search the building by its acronym!"
                : "Provide the building name and then the address"}
            </Text>

            <Dropdown
              style={isFocus && { borderColor: "blue" }}
              // placeholderStyle={styles.placeholderStyle}
              // selectedTextStyle={styles.selectedTextStyle}
              // inputSearchStyle={styles.inputSearchStyle}
              // iconStyle={styles.iconStyle}
              data={data}
              search
              maxHeight={300}
              labelField="label"
              valueField="value"
              placeholder={!isFocus ? "Select building" : ""}
              searchPlaceholder="Search..."
              value={buildingName}
              onFocus={() => setIsFocus(true)}
              // onBlur={() => setIsFocus(false)}
              onChange={(item) => {
                setBuildingName(item.value);
                setIsFocus(false);
              }}
            />
          </View>
        </View>
      )}
    </View>
  );
};

export const Step3b: FC<{ eventID: string }> = (props) => {

  return (
    <View>

    </View>
  )

}

/* ---------------------------------- Date ---------------------------------- */
export const Step4: FC<{ eventID: string }> = (props) => {
  
  const [startModalVisible, setStartModalVisible] = useState(false);
  const [endModalVisible, setEndModalVisible] = useState(false);
  const [selectedDates, setSelectedDates] = useState({
    startDate: null,
    endDate: null,
  });

  const formatDate = (date: Date) => {
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    return `${months[date.getMonth()]} ${date.getDate()} ${date.getFullYear()}`;
  }

  return (
    <View>
      <Text style={fonts.title1}>Provide the date and time of your event</Text>

      {/* Start date button */}
      <View>
        <Text>Start date and time:</Text>
        
        <View style={{ flexDirection: "row" }}>
          <Button
            title={selectedDates.startDate ? formatDate(selectedDates.startDate) : "Select date"}
            onPress={() => {setStartModalVisible(true)}}
            buttonStyle={{
              borderRadius: 8,
              borderWidth: 2,
              backgroundColor: 'transparent',
              borderColor: colours.grey,
            }}
            titleStyle={{ color: colours.black }}
          />
          
        </View>
        
        

      </View>

      {/* End date button */}
      <View>
        <Text>End date and time (optional):</Text>
        
        <View style={{ flexDirection: "row" }}>
          <Button
            title={selectedDates.endDate ? formatDate(selectedDates.endDate) : "Select date"}
            onPress={() => {setEndModalVisible(true)}}
            buttonStyle={{
              borderRadius: 8,
              borderWidth: 2,
              backgroundColor: 'transparent',
              borderColor: colours.grey,
            }}
            titleStyle={{ color: colours.black }}
          />
        </View>

      </View>

      {/* Start date modal */}
      <View
        style={{
          width: windowWidth,
          height: windowHeight * 0.5,
          justifyContent: "center",
          marginTop: 10,
        }}
      >
        <Modal
          animationType="slide"
          transparent={true}
          visible={startModalVisible}
          onRequestClose={() => {setStartModalVisible(!startModalVisible)}}
        >
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "rgba(0, 0, 0, 0.5)",
            }}
          >
            <View
              style={{
                width: "90%",
                backgroundColor: "white",
                borderRadius: 10,
              }}
            >
              <Calendar
                onDayPress={(day) => {
                  setStartModalVisible(false);
                }}
                minDate={Date()}
                allowSelectionOutOfRange={false}
                markingType="multi-period"
                hideExtraDays={true}
                firstDay={1}
                disableAllTouchEventsForDisabledDays={true}
                style={{ borderWidth: 1, borderColor: "gray", height: 350 }}
                theme={{
                  textSectionTitleColor: "#b6c1cd",
                  selectedDayBackgroundColor: colours.purple,
                  arrowColor: colours.purple,
                  todayTextColor: colours.purple,
                }}
              />
            </View>
          </View>
        </Modal>
      </View>

      {/* End date modal */}
      <View
        style={{
          width: windowWidth,
          height: windowHeight * 0.5,
          justifyContent: "center",
          marginTop: 10,
        }}
      >
        <Modal
          animationType="slide"
          transparent={true}
          visible={endModalVisible}
          onRequestClose={() => {setEndModalVisible(!endModalVisible)}}
        >
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "rgba(0, 0, 0, 0.5)",
            }}
          >
            <View
              style={{
                width: "90%",
                backgroundColor: "white",
                borderRadius: 10,
              }}
            >
              <Calendar
                onDayPress={(day) => {
                  setEndModalVisible(false);
                }}
                minDate={Date()}
                allowSelectionOutOfRange={false}
                markingType="multi-period"
                hideExtraDays={true}
                firstDay={1}
                disableAllTouchEventsForDisabledDays={true}
                style={{ borderWidth: 1, borderColor: "gray", height: 350 }}
                theme={{
                  textSectionTitleColor: "#b6c1cd",
                  selectedDayBackgroundColor: colours.purple,
                  arrowColor: colours.purple,
                  todayTextColor: colours.purple,
                }}
              />
            </View>
          </View>
        </Modal>
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

  const [charactersAvailable, setCharactersAvailable] = useState<number>(200);

  return (
    <View>
      <View>
        <Text style={{ ...fonts.title1, ...spacing.verticalMargin2 }}>
          Provide a description of your event
        </Text>
        <Text style={fonts.regular}>
          Anything you would like to share that is not in the title.
        </Text>
      </View>

      <View style={{ marginVertical: "5%" }}>
        <Text>
          {charactersAvailable}{" "}
          <Text style={{ color: colours.grey }}>characters available</Text>
        </Text>
        <Input
          selectionColor={colours.black}
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
            setCharactersAvailable(200 - e.nativeEvent.text.length);
            set({...event, description: e.nativeEvent.text})
          }}
          maxLength={200}
        />
      </View>
    </View>
  );
};

/* --------------------------------- Price: Free or Nah? ---------------------------------- */
export const Step6: FC<{ eventID: string, setFreeEventProps: any, setStep: any, step: number }> = (props) => {

  return (
    <View>

      <View>
        <Text style={{ ...fonts.title1, ...spacing.verticalMargin2 }}>Is your event free?</Text>
      </View>

      <View style={{ marginVertical: "5%" }}>
            <Button
              title={"Yes"}
              buttonStyle={{
                backgroundColor: colours.purple,
                padding: 15,
                borderRadius: 10,
                marginBottom: 10,
              }}
              onPress={() => {
                props.setFreeEventProps(true)
                props.setStep(props.step+2)
              }}
            />
            <Button
              title={"No"}
              buttonStyle={{
                backgroundColor: colours.purple,
                padding: 15,
                borderRadius: 10,
              }}
              onPress={() => { 
                props.setFreeEventProps(true)
                props.setStep(props.step+1)
              }}
            />
      </View>      


    </View>
  );
};

export const Step6b: FC<{ eventID: string, freeEventProps: any }> = (props) => {

  return (

    <View>

      <Text style={{ ...fonts.title1, ...spacing.verticalMargin2 }}>Enter the price of your event</Text>
      <Text style={fonts.regular}>We all prefer free events, but sometimes we have to pay for the good.</Text>

      <View style={{flexDirection: 'row'}}>
          
        <View style={{width: "48%"}}>
          <Input
            label=" "
            selectionColor={colours.black}
            maxLength={4}
            autoCapitalize="none"
            placeholder=""
            leftIcon={
              <Icon
                name="dollar"
                type="font-awesome"
                size={40}
                color={colours.black}
              />
            }
            inputContainerStyle={{
              borderColor: colours.grey,
              borderBottomWidth: 0,
              paddingVertical: 4,
              paddingHorizontal: 10,
              borderRadius: 6,
            }}
            keyboardType="decimal-pad"
            inputStyle={{ fontSize: 40, fontWeight: "bold" }}
            containerStyle={{
              padding: 20,
              justifyContent: "center",
              alignItems: "center",
            }}
            onChange={(e) => {}}
          />
        </View>
        
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <Text style={{...fonts.title1}}>-</Text>
        </View>
    
        <View style={{width: "48%"}}>
        <Input
          label="Max (Optional)"
          selectionColor={colours.black}
          maxLength={4}
          autoCapitalize="none"
          leftIcon={
            <Icon
              name="dollar"
              type="font-awesome"
              size={40}
              color={colours.black}
            />
          }
          inputContainerStyle={{
            borderColor: colours.grey,
            borderBottomWidth: 0,
            paddingVertical: 4,
            paddingHorizontal: 10,
            borderRadius: 6,
          }}
          keyboardType="decimal-pad"
          inputStyle={{ fontSize: 40, fontWeight: "bold" }}
          containerStyle={{
            padding: 20,
            justifyContent: "center",
            alignItems: "center",
          }}
          onChange={(e) => {}}
        />
        </View>
      
      </View>

    </View>

  );

}

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
          selectionColor={colours.black}
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
  const [loading, categories, setCategories] = useSateWithFireStore<string[]>(
    "categories/names",
    "list",
    []
  );

  const [loading2, categoriesValue, setCategoriesValue] = useSateWithFireStore<
    number[]
  >("categories/values", "list", []);

  const [selected, setSelected] = useState<number[]>([]);

  if (loading || loading2) {
    return <Loading />;
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
        buttons={getOrderedCategories(categories, categoriesValue)}
        onPress={(index) => {
          if (selected.includes(index)) {
            setSelected(selected.filter((item) => item != index));
          } else {
            if (selected.length < 5) {
              setSelected([...selected, index]);
            } else {
              setSelected([
                selected[1],
                selected[2],
                selected[3],
                selected[4],
                index,
              ]);
            }
          }
        }}
        selectedIndexes={selected}
        vertical
      />

      <View></View>
    </View>
  );
};

/* --------------------------------- Review --------------------------------- */
export const Step9: FC<{ eventID: string }> = (props) => {
  return (
    <View>
      <View>
        <Text style={{ ...fonts.title1, ...spacing.verticalMargin2 }}>
          Review and publish
        </Text>
        <Text style={fonts.regular}>
          Let's review your event to confirm all the details.
        </Text>
      </View>

      <View>
        {/* Name */}
        <View style={{ flexDirection: "row" }}>
          <Icon name="event" type="material" color={colours.grey} />
          <Text>Tuesday Weekly Salsa</Text>
        </View>

        {/* Location */}
        <View style={{ flexDirection: "row" }}>
          <Icon name="location-pin" type="entypo" color={colours.purple} />
          <Text>Montpetit Gym</Text>
        </View>

        {/* Date and time */}
        <View></View>

        {/* Description */}
        <View></View>

        {/* Price */}
        <View></View>

        {/* Sign up link */}
        <View></View>

        {/* Recurrence */}
        <View></View>
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
