import { View, Text, StyleSheet } from "react-native";

const DateCard = ({line1, line2}: any) => {
    return (
        <View style={styles.container}>
            <Text style={styles.line1}>{line1}</Text>
            <Text style={styles.line2}>{line2}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    line1: {
        fontWeight: 'bold', 
        color: 'white',
        fontSize: 16
    },
    line2: {
        color: '#e3e3e3',
        fontWeight: '400',
    },
    container: {
        flexDirection: "column",
        borderRadius: 5,
        paddingVertical: 7,
    },
});

export default DateCard;