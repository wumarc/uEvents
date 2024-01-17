import { View, StyleSheet, ScrollView, Text, FlatList, Touchable, TouchableOpacity } from "react-native";
import { colours, fonts, spacing } from "../../subatoms/Theme";
import Organizer from "../../organisms/Organizer";
import { useStateWithFireStoreCollection, useStateWithFireStoreDocumentLogged } from "../../../utils/useStateWithFirebase";
import { Organizer as OrganizerType } from "../../../utils/model/Organizer";
import { Loading } from "./Loading";
import { getFirebaseUserIDOrEmpty, isLogged } from "../../../utils/util";
import { SearchBar } from "react-native-elements";
import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../../firebaseConfig";
import { CustomSearchBar } from "../../atoms/CustomSearchBar";
import { customLogEvent } from "../../../utils/analytics";
import { useUser } from "../../../utils/model/User";

const BrowseOrganizers = ({ navigation }: any) => {
  // States
  const [loading, users, add] = useStateWithFireStoreCollection<OrganizerType>("users");
  const [search, setSearch] = useState("");
  const [loading3, userData, setUserData, isLogged, isStudent, isOrganizer, isAdmin, isBeta] = useUser();

  // Loading
  if (loading || loading3) {
    return <Loading />;
  }

  let filteredOrganizers = users?.filter((user) => user.type === "organizer" && user.approved) ?? [];

  if (isLogged && userData) {
    filteredOrganizers = filteredOrganizers.filter((organizer) => {
      if ((userData.blocked ?? []).includes(organizer.id)) {
        return false;
      }
      return true;
    });
  }

  // Sort by name
  filteredOrganizers.sort((a, b) => {
    return a.name.localeCompare(b.name);
  });

  // Filter by search
  if (search !== "") {
    filteredOrganizers = filteredOrganizers.filter((organizer) => {
      return organizer.name.toLowerCase().includes(search.toLowerCase());
    });
  }

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={true}>
        <View style={styles.pageTitle}>
          <Text style={fonts.title1}>Clubs</Text>
        </View>

        {/* Search Bar */}
        <CustomSearchBar placeholder="Search organizer by name" search={search} setSearch={setSearch} />
        <FlatList
          data={filteredOrganizers}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => {
                customLogEvent("Clicked_on_organizer_browsing", { organizer: item.id });
                navigation.navigate("EventOrganizerView", { organizerID: item.id });
              }}
            >
              <Organizer name={item.name == "" || item.name == undefined ? "Undefined Name" : item.name} imageID={item.id} />
            </TouchableOpacity>
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

export default BrowseOrganizers;
