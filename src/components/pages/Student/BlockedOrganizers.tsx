import { View, StyleSheet, ScrollView, Text, FlatList, Touchable, TouchableOpacity, Button } from "react-native";
import { colours, fonts, spacing } from "../../subatoms/Theme";
import Organizer from "../../organisms/Organizer";
import { useStateWithFireStoreCollection, useStateWithFireStoreDocument, useStateWithFireStoreDocumentLogged } from "../../../utils/useStateWithFirebase";
import { Organizer as OrganizerType } from "../../../utils/model/Organizer";
import { Loading } from "../Common/Loading";
import { getFirebaseUserIDOrEmpty } from "../../../utils/util";

const BlockedOrganizers = ({ navigation }: any) => {
  const [loading, users, add] = useStateWithFireStoreCollection<OrganizerType>("users");
  const [loading2, student, setStudent] = useStateWithFireStoreDocumentLogged("users", getFirebaseUserIDOrEmpty());

  if (loading || loading2) {
    return <Loading />;
  }

  let organizers = users?.filter((user) => user.type === "organizer") ?? [];
  let blockedOrganizers = student.blocked ?? [];

  let filteredOrganizers = organizers.filter((organizer) => {
    for (let i = 0; i < blockedOrganizers.length; i++) {
      if (blockedOrganizers[i] === organizer.id) {
        return true;
      }
    }
    return false;
  });

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={true}>
        {filteredOrganizers.length == 0 && (
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <Text style={fonts.title2}>You have no blocked clubs.</Text>
          </View>
        )}
        <FlatList
          data={filteredOrganizers}
          renderItem={({ item }) => (
            <View>
              <TouchableOpacity onPress={() => navigation.navigate("EventOrganizerView", { organizerID: item.id, imageID: item.image })}>
                <Organizer name={item.name == "" || item.name == undefined ? "Undefined Name" : item.name} imageID={item.image} />
              </TouchableOpacity>
              <Button
                title={"Unblock"}
                color={colours.purple}
                onPress={() => {
                  let blockedOrganizers = student.blocked ?? [];
                  blockedOrganizers = blockedOrganizers.filter((organizerID: string) => organizerID != item.id);
                  setStudent({ ...student, blocked: blockedOrganizers });
                }}
              />
            </View>
          )}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colours.white,
    paddingHorizontal: spacing.page,
  },
  pageTitle: {
    flexDirection: "row",
    padding: "3%",
  },
});

export default BlockedOrganizers;
