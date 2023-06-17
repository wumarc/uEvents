import { View, Text } from "react-native";
import { StyleSheet } from "react-native";

const DateCard = ({month, day}: any) => {

    return (
        <View style={styles.container}>
            <Text style={styles.text}>{month}</Text>
            <Text style={styles.text}>{day}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: "white",
        borderRadius: 5,
        padding: 6,
        margin: 6
    },
    text: {
        fontWeight: "bold",
    }
});


export default DateCard;