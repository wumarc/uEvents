import { FlatList, TouchableOpacity, View, Clipboard } from "react-native";
import { FC, useState } from "react";
import { Button, Image, Text } from "@rneui/themed";
import { Input } from "@rneui/base";
import { StyleSheet } from "react-native";
import { defaultStudent, Student } from "../../../utils/model/Student";
import { Avatar, SearchBar, Switch } from "react-native-elements";
import {
  useSateWithFireStore,
  useSateWithFireStoreArray,
  useStateWithFireStoreCollection,
  useStateWithFireStoreDocument,
} from "../../../utils/useStateWithFirebase";
import { getFirebaseUserID } from "../../../utils/util";
import { getAuth, signOut } from "firebase/auth";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "./main";
import { EventObject } from "../../../utils/model/EventObject";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { fireStore } from "../../../firebaseConfig";
import { SvgUri } from "react-native-svg";
import { colours } from "../../subatoms/Theme";
import { searchAlgo } from "../../../utils/search";

type props = NativeStackScreenProps<RootStackParamList, "Profile">;
// To access the type of user, use route.params.userType

const stateOrder = ["Pending", "Published", "Rejected", "Draft"];

const AllEvents = ({ route, navigation }: props) => {
  const [loading, events, add, del] =
    useStateWithFireStoreCollection<EventObject>("events");

  const [search, setSearch] = useState("");
  const [detailed, setDetailed] = useState(true);

  if (loading) {
    return <Text>Loading</Text>;
  }

  let filteredEvents = events as EventObject[];
  filteredEvents = searchAlgo(search, filteredEvents);

  return (
    <View>
      {/* Search Bar */}
      <View style={{display: "flex", flexDirection: "row"}}>
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
          placeholder="Search events by name or category"
          // placeholderTextColor="white"
          value={search}
          autoCapitalize="none"
          selectionColor={colours.purple}
        />
        <Switch
          value={detailed}
          onValueChange={() => setDetailed(!detailed)}
          color="purple"
        />
      </View>
      <FlatList
        style={{ height: "90%" }}
        data={filteredEvents?.sort((a, b) => {
          if (a.state == b.state) {
            // Order by start time
            return a.startTime.toDate().getTime() - b.startTime.toDate().getTime();
          } else {
            return stateOrder.indexOf(a.state) - stateOrder.indexOf(b.state);
          }
        })}
        renderItem={({ item }) => (
          <EventLine event={item} del={del} navigation={navigation} detailed={detailed} />
        )}
      />
    </View>
  );
};

const EventLine: FC<{
  event: EventObject;
  del: (id: string) => void;
  navigation: any;
  detailed?: boolean;
}> = ({ event, del, navigation, detailed }) => {
  let organizer = event.organizer;

  const [reason, setReason] = useState("");
  const [keep, setKeep] = useState(false);

  if (event.organizerType === "Organizer Added" || keep) {
    const [loading, organizer2] = useStateWithFireStoreDocument(
      "users",
      event.organizer
    );

    if (loading) {
      return <Text>Loading</Text>;
    }
    organizer = organizer2?.name;
  }

  let status = "";
  let statusColor = "black";

  if (event.state === "Published") {
    status = "Published";
    statusColor = "green";
  } else if (event.state === "Rejected") {
    status = "Rejected";
    statusColor = "orange";
  } else if (event.state === "Pending") {
    status = "Pending";
    statusColor = "blue";
  } else if (event.state === "Draft") {
    status = "Draft";
  }

  return (
    <View style={{ margin: 10, width: "100%", display: "flex", flexDirection: "column", height: detailed? 120 : 40 }} >
      <View style={{ width: "100%", display: "flex", flexDirection: "row", height: "50%", }} >
      <SvgUri
          width={40}
          height={40}
          uri={"https://openmoji.org/data/color/svg/" + (event.emoji ?? "❓").codePointAt(0)?.toString(16).toUpperCase() + ".svg"}
          fill="black"
        />
        <TouchableOpacity style={{ height: 40, alignItems: "flex-start", justifyContent: "flex-start", }} onPress={() => Clipboard.setString(event.id)}>
          <Text>{event.name}</Text>
          <View style={{display: "flex", flexDirection: "row"}}><Text>{event.startTime.toDate().toDateString() + " - "}</Text><Text style={{color: statusColor}}>{status}</Text></View>
          <Text>{event.organizerType + " - " + organizer}</Text>
        </TouchableOpacity>
      </View>
      {detailed ? (
      <View style={{ width: "100%", display: "flex", flexDirection: "row", height: "20%", }} >
        <View style={{ height: 40, }} >
          <Button size="sm" titleStyle={{fontSize: 12}}
            onPress={() => {
              navigation.navigate("Step0", { eventID: event.id, useDefault: false });
            }}
          >
            Edit
          </Button>
        </View>
        <View style={{ marginLeft: 5, height: 40, }} >
          <Button size="sm" color="error" titleStyle={{fontSize: 12}}
            onPress={() => {
              del(event.id);
            }}
          >
            Delete
          </Button>
        </View>
        {/* To be used for special purposes */}
        {/* <View style={{ marginLeft: 5, height: 40, }} >
          <Button size="sm" color="red" titleStyle={{fontSize: 12}}
            onPress={() => {
              if (event.organizerType === "Organizer Added") {
                setKeep(true);
              getDoc(doc(fireStore, "users/" + event.organizer)).then((org) => {
                setDoc(doc(fireStore, "events/" + event.id), {
                  ...event,
                  organizer: org.data()?.name,
                  organizerType: "Manually Added",
                }).then(() => {
                  console.log("done");
                });
              }
            );}
            }}
          >
            Transfer
          </Button>
        </View> */}
        <View style={{ marginLeft: 5, height: 40, }} >
          <Button color="green" size="sm" titleStyle={{fontSize: 12}}
            onPress={() => {
              navigation.navigate("Preview", { eventId: event.id, organizerId: event.organizer });
            }}
          >
            View
          </Button>
        </View>
        <View style={{ marginLeft: 5, height: 40, }} >
          {event.state === "Pending" ? (
            <Button size="sm" titleStyle={{fontSize: 12}}
              onPress={() => {
                setDoc(doc(fireStore, "events/" + event.id), {
                  ...event,
                  state: "Published",
                });
              }}
            >
              Approve
            </Button>
          ) : (
            <></>
          )}
          
        </View>
        <View
          style={{
            marginLeft: 5,
            height: 40,
          }}
        >
          {event.state === "Pending" || event.state === "Published" ? (
            <Button size="sm" titleStyle={{fontSize: 12}}
              onPress={() => {
                setDoc(doc(fireStore, "events/" + event.id), {
                  ...event,
                  state: "Rejected",
                  rejectReason: reason,
                });
              }}
            >
              Reject
            </Button>
          ) : (
            <></>
          )}
        </View>
        </View>
        ) : <></>}
        {detailed ? (
        <View style={{ width: "100%", display: "flex", flexDirection: "row", height: "30%", }} >
        <View style={{ height: "100%", width: "90%"}} >
          {event.state === "Pending" || event.state === "Published" ? (
            <Input
              placeholder="Reject reason"
              onChangeText={(t) => setReason(t)}
              style={{ width: "100%", fontSize: 12 }}
            />
          ) : (
            <></>
          )}
        </View>
      </View>
      ) : <></>}
    </View>
  );
};

export default AllEvents;
