import { View, StyleSheet } from "react-native";
import { Icon } from '@rneui/themed';
import { Text } from "react-native-elements";

const EventDate = ({prop}) => {

    return (
        <View style={styles.container}>

            {/* Column 1: Icon */}
            <View style={styles.subcontainer}>
                <Icon
                    color="grey"
                    containerStyle={{}}
                    disabledStyle={{}}
                    iconStyle={{}}
                    name="calendar-blank-outline"
                    onLongPress={() => console.log("onLongPress()")}
                    onPress={() => console.log("onPress()")}
                    size={35}
                    type="material-community"
                />
            </View>

            {/* Column 2: Date */}
            <View style={styles.subcontainer}>
                <View>
                    <Text style={styles.date}>Thursday, June 1, 2023</Text>
                </View>
                <View>
                    <Text style={styles.time}>6:30 p.m. - 10:30 p.m. EST</Text>
                </View>
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        paddingVertical: 3,
        // backgroundColor: "red"
    },
    subcontainer: {
        // backgroundColor: "red",
        flexDirection: "column",
        justifyContent: "space-between",
        paddingVertical: 10,
        paddingHorizontal: 10,
    },
    date: {
        fontSize: 18,
        fontWeight: "700",
    },
    time: {
        fontSize: 15,
    }
})

export default EventDate;