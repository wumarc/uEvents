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

type props = NativeStackScreenProps<RootStackParamList, "Saved">;
// To access the type of user, use route.params.userType

const SavedEvents = ({ route, navigation }: props) => {
  const [loading, events, add] =
    useStateWithFireStoreCollection<EventObject>("events");

  if (loading) {
    return <Text>Loading</Text>;
  }

  return (
    <View
      style={{
        height: "100%",
        width: "100%",
      }}
    >
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

export default SavedEvents;
