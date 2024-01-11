import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useStateWithFireStoreCollection } from "../../../utils/useStateWithFirebase";
import { Organizer as OrganizerType } from "../../../utils/model/Organizer";
import { Loading } from "../Common/Loading";
import { FlatList, View, Text, Linking } from "react-native";
import Organizer from "../../organisms/Organizer";
import { Button, FAB } from "@rneui/themed";
import { deleteDoc, doc, setDoc } from "firebase/firestore";
import { fireStore } from "../../../firebaseConfig";
import { CheckBox } from "react-native-elements";
import { useState } from "react";
import { RootStackParamList } from "../../../../main";
import { CustomSearchBar } from "../../atoms/CustomSearchBar";
import { black } from "react-native-paper/lib/typescript/styles/themes/v2/colors";
import { CustomDialog } from "../../atoms/CustomDialog";

type props = NativeStackScreenProps<RootStackParamList, "AllOrganizers">;
export const AllOrganizers = ({ route, navigation }: props) => {
  const [loading, users, add] = useStateWithFireStoreCollection<OrganizerType>("users");
  const [search, setSearch] = useState("");
  const [deleteVisible, setDeleteVisible] = useState(false);
  const [pendingDelete, setPendingDelete] = useState("");

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
      <CustomSearchBar placeholder="Search organizer by name" search={search} setSearch={setSearch} />

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
          <View style={{ margin: 20 }}>
            <Organizer name={item.name == "" || item.name == undefined ? "Undefined Name" : item.name} imageID={item.image} noSpacing />
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
                  navigation.navigate("OrganizerSettings", { id: item.id });
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
                  setPendingDelete(item.id ?? "");
                  setDeleteVisible(true);
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
            navigation.navigate("OrganizerSettings", { id: undefined, new: true });
          }}
        />
      </View>

      {/* Delete confirmation */}
      <CustomDialog
        visible={deleteVisible}
        setVisible={setDeleteVisible}
        includeCancel
        navigation={navigation}
        buttons={[
          {
            buttonName: "Delete",
            onPress: () => {
              setDeleteVisible(false);
              deleteDoc(doc(fireStore, "users/" + pendingDelete));
            },
          },
        ]}
      >
        Are you sure you want to delete this organizer
      </CustomDialog>
    </View>
  );
};
