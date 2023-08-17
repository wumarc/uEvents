import { FlatList, View } from "react-native";
import { FC, useState } from "react";
import { Button, Image, Text } from "@rneui/themed";
import { Input } from "@rneui/base";
import { StyleSheet } from "react-native";
import { defaultStudent, Student } from "../../../utils/model/Student";
import { Avatar } from "react-native-elements";
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
import { doc, setDoc } from "firebase/firestore";
import { fireStore } from "../../../firebaseConfig";

type props = NativeStackScreenProps<RootStackParamList, "Profile">;
// To access the type of user, use route.params.userType

const Profile = ({ route, navigation }: props) => {
  const [loading, events, add, del] =
    useStateWithFireStoreCollection<EventObject>("events");

  if (loading) {
    return <Text>Loading</Text>;
  }

  return (
    <View>
      <FlatList
        data={events?.sort((a, b) => a.name.localeCompare(b.name))} // Sort by alphabetical order
        renderItem={({ item }) => (
          <EventLine event={item} del={del} navigation={navigation} />
        )}
      />
    </View>
  );
};

const EventLine: FC<{
  event: EventObject;
  del: (id: string) => void;
  navigation: any;
}> = ({ event, del, navigation }) => {
  let organizer = event.organizer;

  const [reason, setReason] = useState("");

  if (event.organizerType === "Organizer Added") {
    const [loading, organizer2] = useStateWithFireStoreDocument(
      "users",
      event.organizer
    );

    if (loading) {
      return <Text>Loading</Text>;
    }
    organizer = organizer2?.name;
  }

  return (
    <View
      style={{
        margin: 10,
        width: "100%",
        display: "flex",
        flexDirection: "row",
        height: 40,
      }}
    >
      <View
        style={{
          height: 40,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text>{event.name}</Text>
        <Text>{event.organizerType + " - " + organizer}</Text>
      </View>

      <View
        style={{
          marginLeft: 40,
          height: 40,
        }}
      >
        <Button
          onPress={() => {
            navigation.navigate("EditEvent", { eventId: event.id });
          }}
        >
          Edit
        </Button>
      </View>
      <View
        style={{
          marginLeft: 40,
          height: 40,
        }}
      >
        <Button
          color="error"
          onPress={() => {
            del(event.id);
          }}
        >
          Delete
        </Button>
      </View>

      <View
        style={{
          marginLeft: 40,
          height: 40,
        }}
      >
        <Button
          color="green"
          onPress={() => {
            navigation.navigate("Preview", { eventId: event.id });
          }}
        >
          View
        </Button>
      </View>
      <View
        style={{
          marginLeft: 40,
          height: 40,
        }}
      >
        {event.state === "Draft" ? <Text>Draft</Text> : <></>}
        {event.state === "Pending" ? (
          <Button
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
        {event.state === "Published" ? <Text>Approved</Text> : <></>}
        {event.state === "Rejected" ? <Text>Rejected</Text> : <></>}
      </View>
      <View
        style={{
          marginLeft: 40,
          height: 40,
        }}
      >
        {event.state === "Pending" ? (
          <Button
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
      <View
        style={{
          marginLeft: 40,
          height: 40,
        }}
      >
        {event.state === "Pending" ? (
          <Input
            placeholder="Reject reason"
            onChangeText={(t) => setReason(t)}
            style={{ width: 400 }}
          />
        ) : (
          <></>
        )}
      </View>
    </View>
  );
};

export default Profile;
