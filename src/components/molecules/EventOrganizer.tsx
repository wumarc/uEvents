import { View, StyleSheet } from "react-native";
import { Icon } from '@rneui/themed';
import { Text } from "react-native-elements";

const EventOrganizer = ({prop}: any) => {

    return (
        <View style={styles.container}>

            {/* Column 1: Icon */}
            <View style={styles.subcontainer}>
                <Icon
                    color="grey"
                    name="home"
                    onPress={() => console.log("onPress()")}
                    size={35}
                />
            </View>

            {/* Column 2: Date */}
            <View style={styles.subcontainer2}>
                <Text style={styles.building}>{prop}</Text>
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        paddingVertical: 3,
    },
    subcontainer: {
        flexDirection: "column",
        justifyContent: "center",
        paddingVertical: 8,
        paddingHorizontal: 10,
    },
    subcontainer2: {
        flexDirection: "column",
        justifyContent: "space-between",
        paddingVertical: 8,
        paddingHorizontal: 10,
        width: "85%"
    },
    building: {
        fontSize: 18,
        fontWeight: "700",
    },
    address: {
        fontSize: 15,
    }
})

export default EventOrganizer;