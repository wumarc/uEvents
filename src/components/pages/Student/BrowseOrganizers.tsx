import { View, StyleSheet, ScrollView, Text } from "react-native";
import { colours, fonts, spacing } from "../../subatoms/Theme";

const BrowseOrganizers = () => {

    return (
        <View style={styles.container}>
          
          <ScrollView>

            <View style={styles.pageTitle}>
              <Text style={fonts.title1}>Clubs</Text>
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