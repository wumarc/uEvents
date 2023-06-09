import { Text } from "react-native-elements";
import { View } from "react-native";
import { StyleSheet } from "react-native";
import QRCode from 'react-native-qrcode-svg';
import TicketTitle from "../atoms/TicketTitle";

const Ticket = () => {
    return (
        <View style={style.container}>
            
            <QRCode 
                value="http://awesome.link.qr"
                size={160}
            />

            <View>
                <TicketTitle title="Order Number"/>
                <Text>8888888888</Text>
            </View>

            <View>
                <TicketTitle title="Name"/>
                <Text>Marc WU</Text>
            </View>
            
            <View>
                <TicketTitle title="Event"/>
                <Text>Fika Painting Night</Text>
            </View>

            <View>
                <TicketTitle title="Date"/>
                <Text>Wed, May 31 08:00 EDT</Text>
            </View>

            <View>
                <TicketTitle title="Location"/>
                <Text>Stockholm, Sweden</Text>
            </View>

            <View>
                <Text>Event Summary</Text>
                <Text>Event Details</Text>
            </View>

            <View>
                <Text>Organizer</Text>
                <Text>eHub</Text>
            </View>
            
        </View>
    );
}

const style = StyleSheet.create({
    container: {
        borderColor: "black",
        borderStyle: "solid",
        width: "80%",
        height: "90%",
        borderWidth: 1,
        flexDirection: "column",
        // alignItems: "center",
    }
});

export default Ticket;