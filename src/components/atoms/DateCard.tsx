import { View, Text, StyleSheet } from "react-native";

const DateCard = ({month, day}: any) => {
    return (
        <View style={styles.container}>
            <Text style={{fontWeight: 'bold'}}>{month}</Text>
            <Text>{day}</Text>
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
    },
});

export default DateCard;