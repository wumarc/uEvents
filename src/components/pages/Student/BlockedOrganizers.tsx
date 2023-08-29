import { View, StyleSheet, ScrollView, Text, FlatList, Touchable, TouchableOpacity } from "react-native";
import { colours, fonts, spacing } from "../../subatoms/Theme";
import Organizer from "../../organisms/Organizer";
import { useStateWithFireStoreCollection, useStateWithFireStoreDocument } from "../../../utils/useStateWithFirebase";
import { Organizer as OrganizerType } from "../../../utils/model/Organizer";
import { Loading } from "../Common/Loading";
import { getFirebaseUserIDOrEmpty } from "../../../utils/util";
import { Button } from "react-native-elements";

const BlockedOrganizers = ({navigation}: any) => {

  const [loading, users, add] =
  useStateWithFireStoreCollection<OrganizerType>("users");
  const [loading2, student, setStudent] = useStateWithFireStoreDocument(
    "users",
    getFirebaseUserIDOrEmpty()
  );

  if (loading || loading2) {
    return <Loading />;
  }

  let organizers = users?.filter((user) => user.type === "organizer" && user.approved) ?? [];

  let filteredOrganizers = organizers.filter((organizer) => {(student.blocked ??[]).includes(organizer.id)});

    return (
        <View style={styles.container}>
          
          <ScrollView showsVerticalScrollIndicator={true}>

              {filteredOrganizers.length == 0 && <Text style={{}}>You have no blocked clubs.</Text>}
              <FlatList
                data={filteredOrganizers}
                renderItem={({ item }) => (
                <View>
                   <TouchableOpacity onPress={() => navigation.navigate("EventOrganizerView", {organizerID: item.id, imageID: item.image})}>
                    <Organizer name={item.name == "" || item.name == undefined ? "Undefined Name" : item.name} imageID={item.image}/>
                  </TouchableOpacity>
                  <Button
                    title={"Unblock"}
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

export default BlockedOrganizers;