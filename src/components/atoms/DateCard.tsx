import { View, Text } from "react-native";
import { StyleSheet } from "react-native";

const DateCard = ({line1, line2}: any) => {
    return (
        <View style={styles.container}>
            <Text style={{fontWeight: 'bold'}}>{line1}</Text>
            <Text>{line2}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        // alignItems: "center",
        // backgroundColor: "white",
        // borderRadius: 5,
        padding: 6,
    },
});

export default DateCard;