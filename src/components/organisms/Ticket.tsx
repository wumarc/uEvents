import { Text } from "react-native-elements";
import { View } from "react-native";
import { StyleSheet } from "react-native";
import QRCode from 'react-native-qrcode-svg';
import TicketDetail from "../atoms/TicketDetail";
import { colours } from "../subatoms/colours/colours";
import {Dimensions} from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Ticket = () => {
    return (
        <View style={styles.container}>
            
            <View style={styles.qr}>
                <QRCode 
                    value="http://awesome.link.qr"
                    size={160}
                />
            </View>

            <View style={{}}>
                <TicketDetail title="Ticket Number" info="# 123-456"/>
                <TicketDetail title="Name" info="Marc WU"/>
                <TicketDetail title="Event" info="Fika Painting Night"/>
                <View style={{flexDirection: "row"}}>
                    <TicketDetail style={{width: "50%", flexDirection: "column"}} title="Date" info="Wed, May 31 08:00 EDT"/>
                    <TicketDetail style={{width: "50%", flexDirection: "column"}} title="Location" info="Stockholm, Sweden"/>
                </View>
                <TicketDetail title="Event Summary" info="This is a very cool event because Adele will be present"/>
                <TicketDetail title="Organizer" info="eHub"/>
            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        borderRadius: 30,
        width: windowWidth * 0.9,
        height: "90%",
        borderWidth: 1,
        flexDirection: "column",
        paddingHorizontal: 20,
        paddingVertical: 25,
        backgroundColor: colours.primaryPurple,
        justifyContent: "space-evenly"
    },
    qr: {
        justifyContent: "center",
        flexDirection: "row",
    }
});

export default Ticket;