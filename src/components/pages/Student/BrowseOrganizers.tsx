import { View, StyleSheet, ScrollView, Text, FlatList } from "react-native";
import { colours, fonts, spacing } from "../../subatoms/Theme";
import Organizer from "../../organisms/Organizer";

const BrowseOrganizers = () => {

    return (
        <View style={styles.container}>
          
          <ScrollView showsVerticalScrollIndicator={true}>

            <View style={styles.pageTitle}>
              <Text style={fonts.title1}>Clubs</Text>
            </View>

            {/* Organizer */}
            <View>
              <Organizer name={"uOttawa Climate Crisis Coalition"}/>
              <Organizer name={"The uOttawa Rock Climbing Club"}/>
              <Organizer name={"uOttawa Anime Club"}/>
              <Organizer name={"uOttawa Rocketry"}/>
              <Organizer name={"uO Triathlon"}/>
              <Organizer name={"UOttawa Quadball Club"}/>
              <Organizer name={"uOttawa Bioethics Association"}/>
              <Organizer name={"University of Ottawa Squash Club"}/>
              <Organizer name={"Egyptian Student Association"}/>
              <Organizer name={"The University of Ottawa Glee Gees"}/>
            </View>

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