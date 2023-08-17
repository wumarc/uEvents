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
import { ButtonGroup, Icon } from "react-native-elements";
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
    <View
      style={{
        flex: 1,
        backgroundColor: colours.white,
        justifyContent: "space-between",
      }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      {/* Render the right step dynamically */}
      <ScrollView>
        <View
          style={{
            paddingHorizontal: spacing.page2,
            ...spacing.verticalPadding1,
          }}
        >
          {/* {step == 0 && <StepWelcome />} */}
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
        <ProgressBar progress={step * 0.09} color={colours.purple} />
        <View style={styles.footer_buttons}>
          <Button
            buttonStyle={{ backgroundColor: colours.white }}
            title={"Back"}
            onPress={() => (step == 1 ? navigation.pop() : setStep(step - 1))}
            titleStyle={{ ...fonts.title3, textDecorationLine: "underline" }}
            disabledStyle={{ backgroundColor: colours.white }}
            disabledTitleStyle={{ color: colours.white }}
            disabled={step == 1 || step == 11}
          />
          <Button
            buttonStyle={{
              backgroundColor: colours.purple,
              padding: 15,
              paddingHorizontal: 25,
              borderRadius: 10,
            }}
            title={step != 11 ? "Next" : "Finish"}
            onPress={() => {
              step != 11 ? setStep(step + 1) : navigation.pop();
            }}
            titleStyle={{ ...fonts.title2, color: colours.white }}
          />
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

/* --------------------------------- Welcome -------------------------------- */
export const StepWelcome = ({ route, navigation }: any) => {
  return (
    <View style={{ flex: 1, height: "100%", justifyContent: "center" }}>
      <View style={spacing.verticalMargin1}>
        <Text style={fonts.title1}>Create Event</Text>
      </View>

      <View>
        <Text style={fonts.regular}>
          Creating an event is easy. Let us guide you through every step.
        </Text>
      </View>
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

      <View style={{ marginVertical: "5%", paddingHorizontal: "15%" }}>
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
            height: windowHeight * 0.2,
          }}
          textAlign="center"
          inputStyle={{ fontSize: 150, fontWeight: "bold" }}
          onChange={(e) => {
            emojiToUnicode(e.nativeEvent.text);
          }}
          maxLength={5}
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

/* ---------------------------------- Date ---------------------------------- */
export const Step4: FC<{ eventID: string }> = (props) => {
  const [selected, setSelected] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedDates, setSelectedDates] = useState({
    startDate: null,
    endDate: null,
  });

  const onDayPress = (day) => {
    const { startDate, endDate } = selectedDates;
    if (startDate && endDate) {
      setSelectedDates({ startDate: day.dateString, endDate: null });
      return;
    }
    if (startDate) {
      setSelectedDates({ ...selectedDates, endDate: day.dateString });
      return;
    }
    setSelectedDates({ ...selectedDates, startDate: day.dateString });
  };

  return (
    <View>
      <Text style={fonts.title1}>Provide the date and time of your event</Text>

      <View>
        <Text>From:</Text>
        <View style={{ flexDirection: "row" }}>
          <Input
            onFocus={() => {
              setModalVisible(true);
            }}
            placeholder={"Select date"}
            selectionColor={colours.black}
          />
        </View>
      </View>

      <View>
        <Text>To:</Text>
        <View></View>
      </View>

      <Button
        title={"Start day"}
        buttonStyle={{
          backgroundColor: colours.purple,
          padding: 15,
          borderRadius: 10,
        }}
        onPress={() => {
          setModalVisible(true);
        }}
      />
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
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
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
                  setSelected(day.dateString), setModalVisible(false);
                }}
                markedDates={{
                  [selected]: { selected: true, disableTouchEvent: true },
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
          }}
          maxLength={200}
        />
      </View>
    </View>
  );
};

/* --------------------------------- Price ---------------------------------- */
export const Step6: FC<{ eventID: string }> = (props) => {
  return (
    <View>
      <View>
        <Text style={{ ...fonts.title1, ...spacing.verticalMargin2 }}>
          Now, set your price
        </Text>
        <Text style={fonts.regular}>
          If your event is free, just leave it blank.
        </Text>
      </View>

      {/* Price */}
      <View style={{ marginVertical: "5%" }}>
        <Input
          selectionColor={colours.black}
          autoCapitalize="none"
          placeholder="Free"
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
            width: windowWidth * 0.5,
            height: windowHeight * 0.1,
          }}
          keyboardType="decimal-pad"
          inputStyle={{ fontSize: 50, fontWeight: "bold" }}
          containerStyle={{
            padding: 20,
            justifyContent: "center",
            alignItems: "center",
          }}
          onChange={(e) => {}}
        />
      </View>
    </View>
  );
};

/* ------------------------------- Sign up link ----------------------------- */
export const Step7: FC<{ eventID: string }> = (props) => {
  return (
    <View>
      <Text style={{ ...fonts.title1, ...spacing.verticalMargin2 }}>
        Provide a link to sign up
      </Text>
      <Text style={fonts.regular}>
        Skip this step if your event requires no sign up.
      </Text>
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
          Tags
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
