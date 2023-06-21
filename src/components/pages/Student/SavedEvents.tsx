import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { View, Text, ScrollView, FlatList } from "react-native";
import { RootStackParamList } from "./main";
import {
  EventObject,
  mockEventClimbing,
} from "../../../utils/model/EventObject";
import {
  useSateWithFireStoreArray,
  useStateWithFireStoreCollection,
} from "../../../utils/useStateWithFirebase";
import {
  getFirebaseUserID,
  getFirebaseUserIDOrEmpty,
} from "../../../utils/util";
import Event from "../../organisms/Event";
import { Loading } from "../Common/Loading";
import { StyleSheet } from "react-native";

type props = NativeStackScreenProps<RootStackParamList, "Saved">;
// To access the type of user, use route.params.userType

const SavedEvents = ({ route, navigation }: props) => {
  const [loading, events, add] =
    useStateWithFireStoreCollection<EventObject>("events");

  if (loading) {
    return <Loading/>;
  }

  return (
    <View
      style={{
        height: "100%",
        width: "100%",
      }}
    >
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Saved Events</Text>
      </View>

      <FlatList
        data={events?.filter((event) =>
          event.saved.includes(getFirebaseUserIDOrEmpty())
        )}
        renderItem={({ item }) => (
          <Event
            id={item.id}
            userType={route.params.userType}
            navigation={navigation}
          />
        )}
      />
    </View>
  );
};


const styles = StyleSheet.create({
  titleContainer: {
    paddingTop: 25,
    paddingLeft: 20
  },
  title: {
    fontSize: 33,
    fontWeight: "500",
  }
});


export default SavedEvents;
