import { Text } from "react-native";
import { StyleSheet } from "react-native";

const TicketTitle = (prop) => {

    return (
        <Text styles={style.title}>
            {prop.title}
        </Text>
    )

}

const style = StyleSheet.create({
    title: {
        fontSize: 25,
        fontWeight: "bold",
    }
});

export default TicketTitle;