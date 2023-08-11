import { View, StyleSheet, ScrollView, Text, FlatList, Touchable, TouchableOpacity } from "react-native";
import { colours, fonts, spacing } from "../../subatoms/Theme";
import Organizer from "../../organisms/Organizer";

const BrowseOrganizers = ({navigation}: any) => {

    const names = ["uOttawa Climate Crisis Coalition", "uOttawa Rock Climbing Club", "uOttawa Anime Club", "uOttawa Rocketry", "uO Triathlon", "UOttawa Quadball Club", "uOttawa Bioethics Association", "University of Ottawa Squash Club", "Egyptian Student Association", "University of Ottawa Glee Gees"]

    return (
        <View style={styles.container}>
          
          <ScrollView showsVerticalScrollIndicator={true}>

            <View style={styles.pageTitle}>
              <Text style={fonts.title1}>Clubs</Text>
            </View>

            {/* Organizer */}
            <ScrollView/>
              {names.map((name, index) => (
                <View key={index}>
                  <TouchableOpacity onPress={() => navigation.navigate("EventOrganizerView")}>
                    <Organizer name={name}/>
                  </TouchableOpacity>
                </View>
              ))}
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