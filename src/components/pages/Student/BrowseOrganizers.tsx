import { View, StyleSheet, ScrollView, Text, FlatList, Touchable, TouchableOpacity } from "react-native";
import { colours, fonts, spacing } from "../../subatoms/Theme";
import Organizer from "../../organisms/Organizer";
import { useStateWithFireStoreCollection } from "../../../utils/useStateWithFirebase";
import { Organizer as OrganizerType } from "../../../utils/model/Organizer";
import { Loading } from "../Common/Loading";

const BrowseOrganizers = ({navigation}: any) => {

  const [loading, users, add] =
  useStateWithFireStoreCollection<OrganizerType>("users");

  if (loading) {
    return <Loading />;
  }

  let organizers = users?.filter((user) => user.type === "organizer") ?? [];



    return (
        <View style={styles.container}>
          
          <ScrollView showsVerticalScrollIndicator={true}>

            <View style={styles.pageTitle}>
              <Text style={fonts.title1}>Clubs</Text>
            </View>

              <FlatList
                data={organizers}
                renderItem={({ item }) => (
                  <TouchableOpacity onPress={() => navigation.navigate("EventOrganizerView", {organizerID: item.id})}>
                    <Organizer name={item.name == "" || item.name == undefined ? "Undefined Name" : item.name}/>
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