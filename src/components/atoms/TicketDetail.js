import { Text } from "@rneui/base";
import { StyleSheet } from "react-native";
import { colours } from "../subatoms/colours/colours";
import { View } from "react-native";

const TicketDetail = (prop) => {

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{prop.title}</Text>
            <Text style={styles.info}>{prop.info}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingVertical: 2,
        marginVertical: 4,
    },
    title: {
        fontSize: 16,
        color: colours.whiteText,
        fontWeight: "500",
        marginBottom: 4
    },
    info: {
        fontSize: 18,
        color: colours.blackText,
        fontWeight: "400",
    }
});

export default TicketDetail;