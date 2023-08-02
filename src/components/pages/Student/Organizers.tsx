import { View, Text, StyleSheet } from "react-native";

const Organizers = () => {

    return (
        <View style={styles.pageTitle}>
          <Text style={{ fontSize: 33, fontWeight: "600"}}>
            Browse Clubs
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

export default Organizers;