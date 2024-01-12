import { FlatList, TouchableOpacity, View, Clipboard, Platform, ScrollView, Linking } from "react-native";
import { FC, useState } from "react";
import { Button, Image, Text } from "@rneui/themed";
import { Input } from "@rneui/base";
import { CheckBox, SearchBar, Switch } from "react-native-elements";
import { useStateWithFireStoreCollection, useStateWithFireStoreDocument } from "../../../utils/useStateWithFirebase";
import { getNextDate } from "../../../utils/util";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { EventObject } from "../../../utils/model/EventObject";
import { doc, setDoc } from "firebase/firestore";
import { fireStore } from "../../../firebaseConfig";
import { SvgUri } from "react-native-svg";
import { colours } from "../../subatoms/Theme";
import { searchAlgo } from "../../../utils/search";
import { Student } from "../../../utils/model/Student";
import { RootStackParamList } from "../../../../main";
import { CustomText } from "../../atoms/CustomText";
import { CustomDialog } from "../../atoms/CustomDialog";
import { CustomSearchBar } from "../../atoms/CustomSearchBar";
import { EmojiImage } from "../../organisms/EmojiImage";

type props = NativeStackScreenProps<RootStackParamList, "AllEvents">;
// To access the type of user, use route.params.userType

const stateOrder = ["Pending", "Published", "Rejected", "Draft"];

export const AllEvents = ({ route, navigation }: props) => {
  // Use state
  const [loading, events, add, del] = useStateWithFireStoreCollection<EventObject>("events");
  const [loading3, eventsFake, addFake, delFake] = useStateWithFireStoreCollection<EventObject>("events-test");
  const [loading2, users, add2] = useStateWithFireStoreCollection<Student>("users");
  const [search, setSearch] = useState("");

  // Options
  const [detailed, setDetailed] = useState(true);
  const [showOutdated, setShowOutdated] = useState(false);
  const [showDraft, setShowDraft] = useState(true);
  const [showPending, setShowPending] = useState(true);
  const [showPublished, setShowPublished] = useState(true);
  const [showRejected, setShowRejected] = useState(true);
  const [showReported, setShowReported] = useState(true);
  const [showFake, setShowFake] = useState(true);
  const [showFakeOnly, setShowFakeOnly] = useState(false);
  const [showOnlyRecurring, setShowOnlyRecurring] = useState(false);

  // Loading
  if (loading || loading2 || loading3) {
    return <Text>Loading</Text>;
  }

  // Filter events
  let filteredEvents = events as EventObject[];
  filteredEvents = filteredEvents.concat(eventsFake as EventObject[]);
  filteredEvents = searchAlgo(search, filteredEvents);

  // Extract reported status
  let reportedEvents: string[] = [];
  for (let user of users ?? []) {
    if (user.reported) {
      reportedEvents = reportedEvents.concat(user.reported);
    }
  }
  filteredEvents.map((event) => {
    if (reportedEvents.includes(event.id)) {
      event.state = "Reported";
    }
  });

  // Remove outdated events
  filteredEvents = filteredEvents.filter((event) => {
    if (!showOutdated) {
      let [startTime, endTime] = getNextDate(event, new Date());
      if (endTime.getTime() < Date.now()) {
        return false;
      }
    }
    if (!showDraft && event.state === "Draft") {
      return false;
    }
    if (!showPending && event.state === "Pending") {
      return false;
    }
    if (!showPublished && event.state === "Published") {
      return false;
    }
    if (!showRejected && event.state === "Rejected") {
      return false;
    }
    if (!showReported && event.state === "Reported") {
      return false;
    }
    if (!showFake && event.fake) {
      return false;
    }
    if (showFakeOnly && !event.fake) {
      return false;
    }
    if (showOnlyRecurring && (event.recurrenceType === "None" || !event.recurrenceType)) {
      return false;
    }
    return true;
  });

  return (
    <View style={{ height: "100%" }}>
      {/* Search Bar */}
      <CustomSearchBar placeholder="Search event by name" search={search} setSearch={setSearch} />
      {/* TODO: Fix the weird top margin */}
      <View style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}>
        <CheckBox
          title="Detailed"
          checked={detailed}
          onPress={() => {
            setDetailed(!detailed);
          }}
        />
        <CheckBox
          title="Show Outdated"
          checked={showOutdated}
          onPress={() => {
            setShowOutdated(!showOutdated);
          }}
        />
        <CheckBox
          title="Show Draft"
          checked={showDraft}
          onPress={() => {
            setShowDraft(!showDraft);
          }}
        />
        <CheckBox
          title="Show Pending"
          checked={showPending}
          onPress={() => {
            setShowPending(!showPending);
          }}
        />
        <CheckBox
          title="Show Published"
          checked={showPublished}
          onPress={() => {
            setShowPublished(!showPublished);
          }}
        />
        <CheckBox
          title="Show Rejected"
          checked={showRejected}
          onPress={() => {
            setShowRejected(!showRejected);
          }}
        />
        <CheckBox
          title="Show Reported"
          checked={showReported}
          onPress={() => {
            setShowReported(!showReported);
          }}
        />
        <CheckBox
          title="Show Fake"
          checked={showFake}
          onPress={() => {
            setShowFake(!showFake);
          }}
        />
        <CheckBox
          title="Show Fake Only"
          checked={showFakeOnly}
          onPress={() => {
            setShowFakeOnly(!showFakeOnly);
          }}
        />
        <CheckBox
          title="Show Only Recurring"
          checked={showOnlyRecurring}
          onPress={() => {
            setShowOnlyRecurring(!showOnlyRecurring);
          }}
        />
      </View>
      <FlatList
        style={{ height: "100%" }}
        data={filteredEvents?.sort((a, b) => {
          if (a.state == b.state) {
            // Order by start time
            return a.startTime.toDate().getTime() - b.startTime.toDate().getTime();
          } else {
            return stateOrder.indexOf(a.state) - stateOrder.indexOf(b.state);
          }
        })}
        renderItem={({ item }) => <EventLine event={item} del={item.fake ? delFake : del} navigation={navigation} detailed={detailed} />}
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

  // State
  const [reason, setReason] = useState("");
  const [keep, setKeep] = useState(false);
  const [backupUrl, setBackupUrl] = useState<string | undefined>(undefined);
  const [deleteVisible, setDeleteVisible] = useState(false);
  const [pendingDelete, setPendingDelete] = useState("");

  if (event.organizerType === "Organizer Added" || keep) {
    const [loading, organizer2] = useStateWithFireStoreDocument("users", event.organizer == "" ? "Default" : event.organizer);

    if (loading) {
      return <Text>Loading</Text>;
    }
    organizer = organizer2?.name;
  }

  if (!organizer) {
    organizer = "Organizer name not found";
  }

  let [nextStartTime, nextEndTime] = getNextDate(event, new Date());
  let containerHeight = event.recurrenceType !== "None" ? 60 : 40;

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
  } else if (event.state === "Reported") {
    status = "!!! Reported !!!";
    statusColor = "red";
  }

  let dbPath = event.fake ? "events-test" : "events";

  return (
    <View style={{ margin: 10, width: "100%", display: "flex", flexDirection: "column", height: detailed ? containerHeight + 100 : containerHeight }}>
      <EmojiImage style={{ width: "100%", display: "flex", flexDirection: "row", height: "50%" }} emoji={event.emoji} />
      <View>
        <View style={{ height: containerHeight, alignItems: "flex-start", justifyContent: "flex-start" }}>
          <Text style={{ color: event.fake ? "blue" : undefined }}>
            {event.name}
            {event.fake && " (Test Event)"}
          </Text>
          <View style={{ display: "flex", flexDirection: "row" }}>
            <Text>{event.startTime.toDate().toDateString()}</Text>
            <Text style={{ color: statusColor }}>{" - " + status}</Text>
          </View>
          {event.recurrenceType !== "None" && (
            <View style={{ display: "flex", flexDirection: "row" }}>
              <Text style={{ color: "purple" }}>{event.recurrenceType}</Text>
              <Text style={{ color: "purple" }}>{" (next): " + nextStartTime.toDateString()}</Text>
              <Text style={{ color: "purple" }}>{" (until): " + event.recurrenceEnd?.toDate().toDateString()}</Text>
            </View>
          )}
          <View style={{ display: "flex", flexDirection: "row" }}>
            <Text>{event.organizerType + " - "}</Text>
            <Text style={{ color: organizer == "Organizer name not found" ? "red" : undefined }}>{organizer}</Text>
          </View>
        </View>
      </View>
      {detailed ? (
        <View style={{ width: "100%", display: "flex", flexDirection: "row", height: "20%" }}>
          <View style={{ height: containerHeight }}>
            <Button
              size="sm"
              titleStyle={{ fontSize: 12 }}
              onPress={() => {
                navigation.navigate("CreateEventWeb", { id: event.id, fake: event.fake });
              }}
            >
              Edit
            </Button>
          </View>
          <View style={{ marginLeft: 5, height: containerHeight }}>
            <Button
              size="sm"
              color="error"
              titleStyle={{ fontSize: 12 }}
              onPress={() => {
                setPendingDelete(event.id);
                setDeleteVisible(true);
              }}
            >
              Delete
            </Button>
          </View>
          {/* To be used for special purposes */}
          {/* <View style={{ marginLeft: 5, height: containerHeight, }} >
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
          <View style={{ marginLeft: 5, height: containerHeight }}>
            <Button
              color="green"
              size="sm"
              titleStyle={{ fontSize: 12 }}
              onPress={() => {
                navigation.navigate("Preview", { eventId: event.id, organizerId: event.organizer, fake: event.fake });
              }}
            >
              View
            </Button>
          </View>
          <View style={{ marginLeft: 5, height: containerHeight }}>
            <Button
              color="blue"
              size="sm"
              titleStyle={{ fontSize: 12 }}
              onPress={() => {
                if (event.fake) {
                  Linking.openURL("https://console.firebase.google.com/u/1/project/uevents-a9365/firestore/data/~2Fevents-test~2F" + event.id);
                } else {
                  Linking.openURL("https://console.firebase.google.com/u/1/project/uevents-a9365/firestore/data/~2Fevents~2F" + event.id);
                }
              }}
            >
              DB event
            </Button>
          </View>
          <View style={{ marginLeft: 5, height: containerHeight }}>
            <Button
              color="blue"
              size="sm"
              titleStyle={{ fontSize: 12 }}
              onPress={() => {
                Clipboard.setString(event.id);
              }}
            >
              Copy ID
            </Button>
          </View>
          {event.organizerType === "Organizer Added" && (
            <View style={{ marginLeft: 5, height: containerHeight }}>
              <Button
                color="blue"
                size="sm"
                titleStyle={{ fontSize: 12 }}
                onPress={() => {
                  Linking.openURL("https://console.firebase.google.com/u/1/project/uevents-a9365/firestore/data/~2Fusers~2F" + event.organizer);
                }}
              >
                DB organizer
              </Button>
            </View>
          )}
          <View style={{ marginLeft: 5, height: containerHeight }}>
            {event.state === "Pending" || event.state === "Rejected" ? (
              <Button
                size="sm"
                titleStyle={{ fontSize: 12 }}
                onPress={() => {
                  setDoc(doc(fireStore, dbPath + "/" + event.id), {
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
              height: containerHeight,
            }}
          >
            {event.state === "Pending" || event.state === "Published" || event.state === "Reported" ? (
              <Button
                size="sm"
                titleStyle={{ fontSize: 12 }}
                onPress={() => {
                  setDoc(doc(fireStore, dbPath + "/" + event.id), {
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
      ) : (
        <></>
      )}
      {detailed ? (
        <View style={{ width: "100%", display: "flex", flexDirection: "row", height: "30%" }}>
          <View style={{ height: "100%", width: "90%" }}>
            {event.state === "Pending" || event.state === "Published" ? (
              <Input placeholder="Reject reason" onChangeText={(t) => setReason(t)} style={{ width: "100%", fontSize: 12 }} />
            ) : (
              <></>
            )}
          </View>
        </View>
      ) : (
        <></>
      )}

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
              del(pendingDelete);
            },
          },
        ]}
      >
        Are you sure you want to delete this event
      </CustomDialog>
    </View>
  );
};
