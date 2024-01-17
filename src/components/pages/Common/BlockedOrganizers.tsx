import { View, StyleSheet, ScrollView, Text, FlatList, Touchable, TouchableOpacity, Button } from "react-native";
import { colours, fonts, spacing } from "../../subatoms/Theme";
import Organizer from "../../organisms/Organizer";
import { useStateWithFireStoreCollection } from "../../../utils/useStateWithFirebase";
import { Organizer as OrganizerType } from "../../../utils/model/Organizer";
import { Loading } from "./Loading";
import { useUser } from "../../../utils/model/User";

const BlockedOrganizers = ({ navigation }: any) => {
  // States
  const [loading, users, add] = useStateWithFireStoreCollection<OrganizerType>("users");
  const [loading3, userData, setUserData, isLogged, isStudent, isOrganizer, isAdmin, isBeta] = useUser();

  // Loading
  if (loading || loading3) {
    return <Loading />;
  }

  // Assuming user is logged in
  // This page should only be accessible if the user is logged in
  if (!isLogged || !userData || !setUserData) {
    navigation.navigate("Home", {});
    return <Loading />;
  }

  // Filtered organizers
  let organizers = users?.filter((user) => user.type === "organizer") ?? [];
  let blockedOrganizers = userData.blocked ?? [];

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
              <TouchableOpacity onPress={() => navigation.navigate("EventOrganizerView", { organizerID: item.id })}>
                <Organizer name={item.name == "" || item.name == undefined ? "Undefined Name" : item.name} imageID={item.id} />
              </TouchableOpacity>
              <Button
                title={"Unblock"}
                color={colours.purple}
                onPress={() => {
                  let blockedOrganizers = userData.blocked ?? [];
                  blockedOrganizers = blockedOrganizers.filter((organizerID: string) => organizerID != item.id);
                  setUserData({ ...userData, blocked: blockedOrganizers });
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
