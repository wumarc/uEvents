import { View, StyleSheet, ScrollView, Text, FlatList, Touchable, TouchableOpacity } from "react-native";
import { colours, fonts, spacing } from "../../subatoms/Theme";
import Organizer from "../../organisms/Organizer";
import { useStateWithFireStoreCollection, useStateWithFireStoreDocument } from "../../../utils/useStateWithFirebase";
import { Organizer as OrganizerType } from "../../../utils/model/Organizer";
import { Loading } from "../Common/Loading";
import { getFirebaseUserIDOrEmpty } from "../../../utils/util";
import { SearchBar } from "react-native-elements";
import { useState } from "react";

const BrowseOrganizers = ({navigation}: any) => {

  const [loading, users, add] =
  useStateWithFireStoreCollection<OrganizerType>("users");
  const [loading2, student, setStudent] = useStateWithFireStoreDocument(
    "users",
    getFirebaseUserIDOrEmpty()
  );

  const [search, setSearch] = useState("");

  if (loading || loading2) {
    return <Loading />;
  }

  let organizers = users?.filter((user) => user.type === "organizer" && user.approved) ?? [];

  let filteredOrganizers = organizers.filter((organizer) => {
    if ((student.blocked ??[]).includes(organizer.id)) {
      return false;
    }
    return true;
  });

    // Sort by name
    filteredOrganizers.sort((a, b) => {
      return a.name.localeCompare(b.name);
    });

    // Filter by search
    if (search !== "") {
      filteredOrganizers = filteredOrganizers.filter((organizer) => {
        return (
          organizer.name.toLowerCase().includes(search.toLowerCase())
        );
      });
    }

    return (
        <View style={styles.container}>
          <ScrollView showsVerticalScrollIndicator={true}>

          
          <View style={styles.pageTitle}>
            <Text style={fonts.title1}>Clubs</Text>
          </View>

          {/* Search Bar */}
          <View>
            <SearchBar
              platform="default"
              inputContainerStyle={{
                borderRadius: 6,
                height: 38,
                backgroundColor: "#ebebeb",
              }}
              containerStyle={{
                backgroundColor: "white",
                flex: 1,
                borderBottomColor: "transparent",
                borderTopColor: "transparent",
              }}
              onChangeText={(value) => setSearch(value)}
              placeholder="Search events by name or category"
              // placeholderTextColor="white"
              value={search}
              autoCapitalize="none"
              selectionColor={colours.purple}
            />
          </View>
              <FlatList
                data={filteredOrganizers}
                renderItem={({ item }) => (
                  <TouchableOpacity onPress={() => navigation.navigate("EventOrganizerView", {organizerID: item.id, imageID: item.image})}>
                    <Organizer name={item.name == "" || item.name == undefined ? "Undefined Name" : item.name} imageID={item.image}/>
                  </TouchableOpacity>
                )}
              />

            </ScrollView>
        </View>
    )

}

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