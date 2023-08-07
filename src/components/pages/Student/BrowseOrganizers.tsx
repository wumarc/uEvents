import { View, Text, StyleSheet } from "react-native";
import { colours, fonts, spacing } from "../../subatoms/Theme";

const BrowseOrganizers = () => {

    return (
        <View style={styles.container}>
          <Text style={{...fonts.title1, paddingHorizontal: '3%'}}>
            Clubs
          </Text>
        </View>
    )

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colours.white,
        paddingHorizontal: spacing.page,
    },
});

export default BrowseOrganizers;