import { View, Text, ScrollView, FlatList } from "react-native";
import { EventObject, mockEventClimbing } from "../../utils/model/EventObject";
import { useSateWithFireStoreArray } from "../../utils/useStateWithFirebase";
import { getFirebaseUserID, getFirebaseUserIDOrEmpty } from "../../utils/util";
import Event from "../organisms/Event";

const SavedEvents = () => {
  const [loading, dbListenedValue, set, add, remove] =
    useSateWithFireStoreArray<EventObject>("event/eventList", "eventListObj");

  if (
    loading ||
    dbListenedValue == null ||
    dbListenedValue.length == undefined
  ) {
    return <Text>Loading</Text>;
  }

  return (
    <ScrollView
      style={{
        height: "100%",
        width: "100%",
      }}
    >
      <FlatList
        data={dbListenedValue.filter((event) => {
          if (event.saved == undefined) {
            return false;
          }
          return event.saved.includes(getFirebaseUserIDOrEmpty());
        })}
        renderItem={({ item }) => (
          <Event
            event={item}
            saveEvent={() => {
              for (let i = 0; i < dbListenedValue.length; i++) {
                if (dbListenedValue[i]?.id == item.id) {
                  let newEvent = dbListenedValue[i];
                  if (newEvent == undefined) {
                    // This should never happen
                    return;
                  }
                  let flag = false;
                  for (let i = 0; i < newEvent.saved.length; i++) {
                    if (newEvent.saved[i] == getFirebaseUserIDOrEmpty()) {
                      // Removing the user from the saved list
                      flag = true;
                      newEvent.saved.splice(i, 1);
                      break;
                    }
                  }

                  if (!flag) {
                    // Adding the user to the saved list
                    newEvent.saved.push(getFirebaseUserIDOrEmpty());
                  }
                  dbListenedValue[i] = newEvent;
                  set(dbListenedValue);
                  break;
                }
              }
            }}
          />
        )}
      />
    </ScrollView>
  );
};

export default SavedEvents;
