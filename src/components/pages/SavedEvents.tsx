import { View, Text, ScrollView, FlatList } from "react-native";
import { EventObject, mockEventClimbing } from "../../utils/model/EventObject";
import {
  useSateWithFireStoreArray,
  useStateWithFireStoreCollection,
} from "../../utils/useStateWithFirebase";
import { getFirebaseUserID, getFirebaseUserIDOrEmpty } from "../../utils/util";
import Event from "../organisms/Event";

const SavedEvents = () => {
  const [loading, events, add] = useStateWithFireStoreCollection("events");

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
        renderItem={({ item }) => <Event id={item.id} />}
      />
    </View>
  );
};

export default SavedEvents;
