import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { View, Text, FlatList, StyleSheet, ScrollView } from "react-native";
import { RootStackParamList } from "./main";
import { getFirebaseUserIDOrEmpty } from "../../../utils/util";
import Event from "../../organisms/Event";
import { Loading } from "../Common/Loading";
import { useStateWithFireStoreDocument } from "../../../utils/useStateWithFirebase";
import { colours, fonts, spacing } from "../../subatoms/Theme";

type props = NativeStackScreenProps<RootStackParamList, "Saved">;
// To access the type of user, use route.params.userType

const SavedEvents = ({ route, navigation }: props) => {
  const [loading, student, setStudent] = useStateWithFireStoreDocument(
    "users",
    getFirebaseUserIDOrEmpty()
  );

  if (loading) {
    return <Loading />;
  }

  return (
    <View
      style={styles.container}
    >
      <ScrollView>

        <View style={styles.pageTitle}>
          <Text style={fonts.title1}>Saved Events</Text>
        </View>

        <View style={{ flex: 1, justifyContent: "center", alignItems: "center"}}>
          {(student.saved ?? []).length != 0 ? (
            <FlatList
              data={(student ?? []).saved}
              renderItem={({ item }) => (
                <Event
                  id={item}
                  userType={route.params.userType}
                  navigation={navigation}
                  onSaveEvent={() => {}}
                />
              )}
            />
          ) : (
            <View style={{ paddingHorizontal: "10%" }}>
              <Text style={{ fontSize: 19 }}>
                You currently have no saved events
              </Text>
            </View>
          )}
        </View>

      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: spacing.page,
    flex: 1,
    backgroundColor: colours.white,
  },
  pageTitle: {
    flexDirection: "row",
    padding: "3%",
  }
});

export default SavedEvents;
