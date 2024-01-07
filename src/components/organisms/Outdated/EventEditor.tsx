import { View, Text, FlatList, ScrollView, Button } from "react-native";
import { FC, useState } from "react";
import { Timestamp } from "firebase/firestore";
import { EventCategory, EventObject, daysToInt, recurrenceType, recurrenceTypeArray } from "../../../utils/model/EventObject";
import CustomButton from "../../atoms/CustomButton";
import { StyleSheet } from "react-native";
import { ButtonGroup, Input, Switch } from "react-native-elements";
import FirebaseImage from "../FirebaseImage";
import UploadFile from "./UploadFile";
import { deleteObject, ref } from "firebase/storage";
import { storage } from "../../../firebaseConfig";
import { daysOfWeekArray, daysOfWeekBrief } from "../../../utils/util";
import { DatePicker } from "../../atoms/DatePicker";

const EventEditor: FC<{
  default: EventObject;
  set: (newVal: EventObject) => void;
  children?: any;
}> = (props) => {
  // Error messages
  const [nameError, setNameError] = useState<string>("");
  const [priceMinError, setPriceMinError] = useState<string>("");
  const [priceMaxError, setPriceMaxError] = useState<string>("");
  const [priceDescriptionError, setPriceDescriptionError] = useState<string>("");
  const [descriptionError, setDescriptionError] = useState<string>("");
  const [locationError, setLocationError] = useState<string>("");
  const [addressError, setAddressError] = useState<string>("");
  const [organizerError, setOrganizerError] = useState<string>("");
  const [startTimeError, setStartTimeError] = useState<string>("");
  const [endTimeError, setEndTimeError] = useState<string>("");
  const [categoriesError, setCategoriesError] = useState<string>("");
  const [foodError, setFoodError] = useState<string>("");
  const [attireError, setAttireError] = useState<string>("");
  const [toBringError, setToBringError] = useState<string>("");
  const [includesError, setIncludesError] = useState<string>("");
  const [transportationError, setTransportationError] = useState<string>("");
  const [signUpLinkError, setSignUpLinkError] = useState<string>("");
  const [originalLinkError, setOriginalLinkError] = useState<string>("");

  const [recurrenceType, setRecurrenceType] = useState<number>(recurrenceTypeArray.indexOf(props.default.recurrence.type));

  const [selectedDays, setSelectedDays] = useState<number[]>(props.default.recurrence.customDays ? daysToInt(props.default.recurrence.customDays) : []);

  const [additionalDates, setAdditionalDates] = useState<Timestamp[]>(props.default.recurrence.customDates ? props.default.recurrence.customDates : []);

  let event = props.default;

  let categories = "";

  if (!event.categories) {
    event.categories = [];
  }

  for (const category of event.categories) {
    categories += category + ",";
  }

  // Remove last comma
  categories = categories.substring(0, categories.length - 1);

  return (
    <ScrollView style={styles.container}>
      <View>
        <FlatList
          data={event.images}
          renderItem={({ item }) => (
            <View
              style={{
                flexDirection: "row",
              }}
            >
              <FirebaseImage id={item} />
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Button
                  title="Delete"
                  onPress={() => {
                    // TODO: Delete from storage
                    deleteObject(ref(storage, "events/" + item))
                      .then(() => {
                        alert("Image deleted");
                      })
                      .catch((error) => {
                        alert("Error deleting image in database");
                      });
                    event.images = event.images.filter((id) => id !== item);
                    props.set(event);
                  }}
                />
              </View>
            </View>
          )}
        />

        <UploadFile setImage={(id) => props.set({ ...event, images: [id] })} />

        <Input defaultValue={event.name} label="Name" errorMessage={nameError} onChangeText={(value) => props.set({ ...event, name: value })} />
        <Input
          defaultValue={event.priceMin?.toString()}
          label="Min Price (Mandatory). If no max price is specified, this is the exact price"
          errorMessage={priceMinError}
          onChangeText={(value) => {
            props.set({
              ...event,
              priceMin: parseInt(value),
            });
          }}
        />
        <Input
          defaultValue={event.priceMax?.toString()}
          label="Max Price (Optional)"
          errorMessage={priceMaxError}
          onChangeText={(value) => {
            props.set({
              ...event,
              priceMax: parseInt(value),
            });
          }}
        />
        <Input
          defaultValue={event.priceDescription}
          errorMessage={priceDescriptionError}
          multiline={true}
          numberOfLines={4}
          label="Price Description (Optional). If needed, a description of the different prices"
          onChangeText={(value) => props.set({ ...event, priceDescription: value })}
        />
        <Input
          defaultValue={event.description}
          errorMessage={descriptionError}
          multiline={true}
          numberOfLines={8}
          label="Description (Mandatory)"
          onChangeText={(value) => props.set({ ...event, description: value })}
        />
        <Input defaultValue={event.location} errorMessage={locationError} label="Location" onChangeText={(value) => props.set({ ...event, location: value })} />
        <Input defaultValue={event.address} errorMessage={addressError} label="Address" onChangeText={(value) => props.set({ ...event, address: value })} />
        <Input
          defaultValue={event.organizer}
          errorMessage={organizerError}
          label={"Organizer"}
          onChangeText={(value) => {
            props.set({
              ...event,
              organizer: value,
            });
          }}
        />
        <DatePicker
          label="Start Date (Mandatory) (Format: YYYY:MM:DD:HH:MM). If no end date is provided, this is the exact date"
          default={event.startTime.toDate()}
          set={(date) => {
            props.set({
              ...event,
              startTime: Timestamp.fromDate(date),
            });
          }}
        />
        <DatePicker
          label="End Date (Optional) (Format: YYYY:MM:DD:HH:MM)"
          default={event.endTime?.toDate()}
          set={(date) => {
            props.set({
              ...event,
              endTime: Timestamp.fromDate(date),
            });
          }}
        />
        <Text>Recurrence Type (Mandatory)</Text>
        <ButtonGroup
          buttons={recurrenceTypeArray}
          selectedIndex={recurrenceType}
          onPress={(index) => {
            setRecurrenceType(index);
            props.set({
              ...event,
              recurrence: {
                ...event.recurrence,
                type: recurrenceTypeArray[index] as recurrenceType,
              },
            });
          }}
        />
        {recurrenceType == 4 ? (
          <View>
            <Text>Select which days the event will recur on</Text>
            <ButtonGroup
              selectMultiple
              buttons={["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]}
              selectedIndexes={selectedDays}
              onPress={(indexes) => {
                setSelectedDays(indexes);
                props.set({
                  ...event,
                  recurrence: {
                    ...event.recurrence,
                    type: "Custom Weekly",
                    customDays: indexes.map((index: number) => daysOfWeekArray[index]) as daysOfWeekBrief[],
                  },
                });
              }}
            />
          </View>
        ) : (
          <></>
        )}
        {recurrenceType == 5 ? (
          <View>
            <FlatList
              data={additionalDates}
              renderItem={({ item, index }) => (
                <View
                  style={{
                    flexDirection: "row",
                  }}
                >
                  <View
                    style={{
                      width: "80%",
                    }}
                  >
                    <DatePicker
                      label="Date (Format: YYYY:MM:DD:HH:MM)"
                      default={item.toDate()}
                      set={(date) => {
                        additionalDates[index] = Timestamp.fromDate(date);
                        setAdditionalDates(additionalDates);
                        props.set({
                          ...event,
                          recurrence: {
                            ...event.recurrence,
                            type: "Specific Dates",
                            customDates: additionalDates as Timestamp[],
                          },
                        });
                      }}
                    />
                  </View>
                  <View
                    style={{
                      width: "20%",
                      height: "100%",
                    }}
                  >
                    <Button
                      title="Delete"
                      onPress={() => {
                        additionalDates.splice(index, 1);
                        setAdditionalDates(additionalDates);

                        props.set({
                          ...event,
                          recurrence: {
                            ...event.recurrence,
                            type: "Specific Dates",
                            customDates: additionalDates as Timestamp[],
                          },
                        });
                      }}
                    />
                  </View>
                </View>
              )}
            />
            <Button
              title="Add Date"
              onPress={() => {
                if (!event.recurrence.customDates) {
                  event.recurrence.customDates = [];
                }
                setAdditionalDates([...additionalDates, new Timestamp(0, 0)]);
                props.set({
                  ...event,
                  recurrence: {
                    ...event.recurrence,
                    type: "Specific Dates",
                    customDates: [...event.recurrence.customDates, new Timestamp(0, 0)],
                  },
                });
              }}
            />
          </View>
        ) : (
          <></>
        )}
        {recurrenceType != 0 ? (
          <DatePicker
            label="Recurrence End Date (Mandatory) (Format: YYYY:MM:DD:HH:MM)"
            default={event.recurrence.end?.toDate()}
            set={(date) => {
              props.set({
                ...event,
                recurrence: {
                  ...event.recurrence,
                  end: Timestamp.fromDate(date),
                },
              });
            }}
          />
        ) : (
          <></>
        )}
        <Input
          defaultValue={categories}
          errorMessage={categoriesError}
          label={"Categories (Optional, coma separated) (Make sure you write the category exactly as it is in the list of categories!!!)"}
          onChangeText={(value: string) => {
            let categories = value.replace(" ", "").split(",") as EventCategory[];
            props.set({
              ...event,
              categories: categories,
            });
          }}
        />
        <View>
          <Text>On Campus</Text>
        </View>
        <Switch
          value={event.onCampus}
          onValueChange={(value) => {
            props.set({
              ...event,
              onCampus: value,
            });
          }}
        />

        <Input
          label={"food (Optional)"}
          errorMessage={foodError}
          multiline={true}
          defaultValue={event.food}
          numberOfLines={4}
          onChangeText={(value) => {
            let food: string | undefined = value;
            if (value == "") {
              food = undefined;
            }
            props.set({
              ...event,
              food: food,
            });
          }}
        />

        <Input
          label={"attire (Optional)"}
          errorMessage={attireError}
          defaultValue={event.attire}
          multiline={true}
          numberOfLines={4}
          onChangeText={(value) => {
            let attire: string | undefined = value;
            if (value == "") {
              attire = undefined;
            }
            props.set({
              ...event,
              attire: attire,
            });
          }}
        />

        <Input
          label={"To Bring (Optional)"}
          errorMessage={toBringError}
          defaultValue={event.toBring}
          multiline={true}
          numberOfLines={4}
          onChangeText={(value) => {
            let toBring: string | undefined = value;
            if (value == "") {
              toBring = undefined;
            }
            props.set({
              ...event,
              toBring: toBring,
            });
          }}
        />

        <Input
          label={"Includes (Optional)"}
          errorMessage={includesError}
          multiline={true}
          defaultValue={event.includes}
          numberOfLines={4}
          onChangeText={(value) => {
            let includes: string | undefined = value;
            if (value == "") {
              includes = undefined;
            }
            props.set({
              ...event,
              includes: includes,
            });
          }}
        />

        <Input
          label={"Transportation (Optional)"}
          errorMessage={transportationError}
          multiline={true}
          defaultValue={event.transportation}
          numberOfLines={4}
          onChangeText={(value) => {
            let transport: string | undefined = value;
            if (value == "") {
              transport = undefined;
            }
            props.set({
              ...event,
              transportation: transport,
            });
          }}
        />

        <Input
          label={"Sign Up Link (Optional)"}
          errorMessage={signUpLinkError}
          defaultValue={event.signUpLink}
          onChangeText={(value) => {
            let signUpLink: string | undefined = value;
            if (value == "") {
              signUpLink = undefined;
            }
            props.set({
              ...event,
              signUpLink: signUpLink,
            });
          }}
        />

        <Input
          label={"Original Link (Mandatory)"}
          errorMessage={originalLinkError}
          defaultValue={event.originalLink}
          onChangeText={(value) => {
            props.set({
              ...event,
              originalLink: value,
            });
          }}
        />

        {props.children}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "black",
    margin: 15,
    padding: 20,
  },
});

export default EventEditor;
