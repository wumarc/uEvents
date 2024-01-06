import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "./main";
import { useStateWithFireStoreCollection } from "../../../utils/useStateWithFirebase";
import { Organizer as OrganizerType } from "../../../utils/model/Organizer";
import { Loading } from "../Common/Loading";
import { FlatList, View, Text, Clipboard, TouchableOpacity, Linking } from "react-native";
import Organizer from "../../organisms/Organizer";
import { Button, FAB, Icon, Image } from "@rneui/themed";
import { deleteDoc, doc, setDoc } from "firebase/firestore";
import { fireStore } from "../../../firebaseConfig";
import { uid } from "../../../utils/util";
import { CheckBox, SearchBar } from "react-native-elements";
import { useState } from "react";
import { colours } from "../../subatoms/Theme";

type props = NativeStackScreenProps<RootStackParamList, "AllOrganizers">;
export const AllOrganizers = ({ route, navigation }: props) => {
  const [loading, users, add] = useStateWithFireStoreCollection<OrganizerType>("users");
  const [search, setSearch] = useState("");

  // Filters
  const [showOnlyAuthentic, setShowOnlyAuthentic] = useState(false);
  const [showCreated, setShowCreated] = useState(true);
  const [showApproved, setShowApproved] = useState(true);

  if (loading) {
    return <Loading />;
  }

  let organizers = users?.filter((user) => user.type === "organizer") ?? [];
  let organizer = organizers.sort((a, b) => {
    // undefined first
    if (a.approved == undefined) {
      return -1;
    }
    // not approved next
    if (!a.approved) {
      return -1;
    }
    // approved last
    return 1;
  });

  // Filter by search
  if (search !== "") {
    organizers = organizers.filter((organizer) => {
      return organizer.name.toLowerCase().includes(search.toLowerCase());
    });
  }

  // Other filters
  organizers = organizers.filter((organizer) => {
    if (showOnlyAuthentic && !organizer.authentic) {
      return false;
    }
    if (organizer.approved != undefined) {
      if (!showCreated && !organizer.approved) {
        return false;
      }
      if (!showApproved && organizer.approved) {
        return false;
      }
    }

    return true;
  });

  return (
    <View style={{ height: "100%" }}>
      {/* Search Bar */}
      <View>
        <SearchBar
          platform="default"
          inputContainerStyle={{
            borderRadius: 6,
            height: 38,
            backgroundColor: "#ebebeb",
          }}
          containerStyle={{
            backgroundColor: "white",
            flex: 1,
            borderBottomColor: "transparent",
            borderTopColor: "transparent",
          }}
          onChangeText={(value) => setSearch(value)}
          placeholder="Search organizer by name"
          // placeholderTextColor="white"
          value={search}
          autoCapitalize="none"
          selectionColor={colours.purple}
        />
      </View>

      {/* Filter */}
      <View style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
        <CheckBox
          checked={showOnlyAuthentic}
          title="Show only authentic"
          onPress={() => {
            setShowOnlyAuthentic(!showOnlyAuthentic);
          }}
        />
        <CheckBox
          checked={showCreated}
          title="Show created"
          onPress={() => {
            setShowCreated(!showCreated);
          }}
        />
        <CheckBox
          checked={showApproved}
          title="Show approved"
          onPress={() => {
            setShowApproved(!showApproved);
          }}
        />
      </View>
      <FlatList
        style={{ height: "100%" }}
        data={organizers}
        renderItem={({ item }) => (
          <View style={{ margin: 2 }}>
            <Organizer name={item.name == "" || item.name == undefined ? "Undefined Name" : item.name} imageID={item.image} />
            <View style={{ display: "flex", flexDirection: "row" }}>
              <Text style={{ color: item.authentic ? "red" : "black" }}>
                {" "}
                {item.approved != undefined ? (item.approved ? "Approved" : "Created") : "Undefined"} {item.authentic ? " - Authentic" : ""}
              </Text>
              <Button
                size="sm"
                style={{ marginLeft: 5 }}
                titleStyle={{ fontSize: 12 }}
                onPress={() => {
                  if (item.id == undefined) {
                    console.log("Undefined id");
                    return;
                  }
                  let nextValue = item.approved != undefined ? !item.approved : true;
                  setDoc(doc(fireStore, "users/" + item.id), { ...item, approved: nextValue });
                }}
              >
                Toggle
              </Button>
              <Button
                size="sm"
                style={{ marginLeft: 5 }}
                titleStyle={{ fontSize: 12 }}
                onPress={() => {
                  navigation.navigate("EventOrganizerView", { organizerID: item.id, imageID: item.image });
                }}
              >
                View
              </Button>
              <Button
                size="sm"
                color="blue"
                style={{ marginLeft: 5 }}
                titleStyle={{ fontSize: 12 }}
                onPress={() => {
                  Linking.openURL("https://console.firebase.google.com/u/1/project/uevents-a9365/firestore/data/~2Fusers~2F" + item.id);
                }}
              >
                Open DB
              </Button>
              <Button
                size="sm"
                style={{ marginLeft: 5 }}
                titleStyle={{ fontSize: 12 }}
                onPress={() => {
                  navigation.navigate("OrganizerProfile", { userType: "", id: item.id });
                }}
              >
                Edit
              </Button>
              <Button
                size="sm"
                style={{ marginLeft: 5 }}
                titleStyle={{ fontSize: 12 }}
                color="red"
                onPress={() => {
                  deleteDoc(doc(fireStore, "users/" + item.id));
                }}
              >
                Delete
              </Button>
            </View>
          </View>
        )}
      />
      <View style={{ position: "absolute", bottom: 0, right: 0 }}>
        <FAB
          icon={{ name: "add", color: "white" }}
          placement="right"
          color={"#FD6262"}
          size="large"
          onPress={() => {
            // Creating new organizer
            let id: string = uid();
            setDoc(doc(fireStore, "users/" + id), {
              type: "organizer",
              saved: [],
              id: id,
              approved: false,
              authentic: false,
            });
            navigation.navigate("OrganizerProfile", { userType: "", id: id });
          }}
        />
      </View>
    </View>
  );
};
