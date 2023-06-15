import { View, StyleSheet } from "react-native";
import { Icon } from '@rneui/themed';
import { Text } from "react-native-elements";

const EventLocation = ({prop}: any) => {

    return (
        <View style={styles.container}>

            {/* Column 1: Icon */}
            <View style={styles.subcontainer}>
                <Icon
                    color="grey"
                    name="place"
                    onPress={() => console.log("onPress()")}
                    size={35}
                    type="map-marker"
                />
            </View>

            {/* Column 2: Date */}
            <View style={styles.subcontainer2}>
                <View>
                    <Text style={styles.building}>STEM Building Room 123</Text>
                </View>
                <View>
                    <Text style={styles.address}>150 Louis-Pasteur Private, Ottawa, ON, Canada</Text>
                </View>
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        paddingVertical: 3,
        // backgroundColor: "blue"
    },
    subcontainer: {
        flexDirection: "column",
        justifyContent: "space-between",
        paddingVertical: 8,
        paddingHorizontal: 10
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

export default EventLocation;