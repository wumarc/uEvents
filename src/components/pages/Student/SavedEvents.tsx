import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { View, Text, ScrollView, FlatList} from "react-native";
import { useState } from "react";
import { RootStackParamList } from "./main";
import { EventObject } from "../../../utils/model/EventObject";
import {
  useSateWithFireStoreArray,
  useStateWithFireStoreCollection,
} from "../../../utils/useStateWithFirebase";
import { getFirebaseUserIDOrEmpty } from "../../../utils/util";
import Event from "../../organisms/Event";
import { Loading } from "../Common/Loading";
import { StyleSheet } from "react-native";

type props = NativeStackScreenProps<RootStackParamList, "Saved">;
// To access the type of user, use route.params.userType

const SavedEvents = ({ route, navigation }: props) => {

  const [loading, events, add] =
    useStateWithFireStoreCollection<EventObject>("events");

  if (loading) {
    return <Loading />;
  }

  return (
    <View
      style={{
        height: "100%",
        width: "100%",
      }}
    >
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Your Saved Events</Text>
      </View>

      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        {(events?.filter((event) => event.saved.includes(getFirebaseUserIDOrEmpty())).length !== 0)
        ? 
          <FlatList
            data={events?.filter((event) =>
              event.saved.includes(getFirebaseUserIDOrEmpty())
            )}
            renderItem={({ item }) => (
              <Event
                id={item.id}
                imageId={item.images[0] ?? ""}
                userType={route.params.userType}
                navigation={navigation}
                onSaveEvent={() => {}}
              />
            )}
          />
        :
          <View style={{paddingHorizontal: '10%'}}>
            <Text style={{fontSize: 19}}>You currently have no saved events</Text>
          </View>
        }
      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  titleContainer: {
    paddingLeft: '3%',
    marginVertical: '3%',
  },
  title: {
    fontSize: 33,
    fontWeight: "500",
  },
});

export default SavedEvents;
