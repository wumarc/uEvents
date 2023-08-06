import { View, Text, StyleSheet } from "react-native";
import { fonts } from "../../subatoms/Theme";

const BrowseOrganizers = () => {

    return (
        <View style={styles.pageTitle}>
          <Text style={fonts.title1}>
            Clubs
          </Text>
        </View>
    )

}

const styles = StyleSheet.create({
    pageTitle: {
        flexDirection: "row",
        padding: "3%",
    },
});

export default BrowseOrganizers;