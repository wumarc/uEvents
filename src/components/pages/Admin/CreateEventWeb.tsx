import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "./main";
import { useState } from "react";
import { uid } from "../../../utils/util";
import { useStateWithFireStoreCollection, useStateWithFireStoreDocument } from "../../../utils/useStateWithFirebase";
import { EventObject, defaultEvent } from "../../../utils/model/EventObject";
import { Loading } from "../Common/Loading";
import { Button } from "@rneui/themed";
import { Input } from "react-native-elements";
import { Icon } from "@rneui/themed";
import { Dropdown } from "react-native-element-dropdown";
import { View, StyleSheet, Text } from "react-native";
import { Organizer } from "../../../utils/model/Organizer";
import { colours, windowHeight } from "../../subatoms/Theme";
import CustomButton from "../../atoms/CustomButton";
import CustomInput from "../../atoms/CustomInput";

// Props has the wrong type is not used
type props = NativeStackScreenProps<RootStackParamList, "Profile">;

export const CreateEventWeb = ({ route, navigation }: props) => {
  const [id, setId] = useState(uid());
  const [loading, dbEvent, setDbEvent] = useStateWithFireStoreDocument<EventObject>("events", id);
  const [localEvent, setLocalEvent] = useState<EventObject>(defaultEvent);
  const [loading2, users, addUsers] = useStateWithFireStoreCollection<Organizer>("users");

  // Error messages
  const [minPriceError, setMinPriceError] = useState("");
  const [maxPriceError, setMaxPriceError] = useState("");

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

  return (
    <View style={{ margin: 50, maxWidth: 1000 }}>
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
        {localEvent.priceMax == undefined ? <Text style={{ fontSize: 30, margin: "auto" }}>⭕</Text> : <Text style={{ fontSize: 30, margin: "auto" }}>🟢</Text>}
      </View>
      {/* Location */}
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
    </View>
  );
};

const styles = StyleSheet.create({
  formElement: {
    marginVertical: 10,
  },
});
