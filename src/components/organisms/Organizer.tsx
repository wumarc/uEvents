import { View, Text, TouchableOpacity } from "react-native";
import { fonts, spacing, windowHeight, windowWidth } from "../subatoms/Theme";
import { Icon } from "@rneui/base";
import { Image } from "@rneui/base";
import { useStateWithFireStoreImage } from "../../utils/useStateWithFirebase";
import { Loading } from "../pages/Common/Loading";

const Organizer = ({name, imageID}: any) => {

    let url = "";

    if (imageID != undefined) {
        const [loading, url2, found] = useStateWithFireStoreImage("organizers/" + imageID);
        if (loading) {
            return <Loading />;
        }
        url = url2 as string;
    }

    
    
    return (
        <View style={{
            flexDirection: 'row', 
            ...spacing.verticalMargin1, 
            ...spacing.verticalPadding2,    
        }}
        >
            {/* Organizer Icon */}
            <View style={{width: windowWidth*0.1, height: windowHeight*0.05, justifyContent: 'center'}}>
            {url? <Image
                source={{uri: url}}
                style={{width: "100%", height: "100%"}}
            />: <Icon name="person" />}
            </View>

            {/* Organizer name */}
            <View style={{justifyContent: 'center'}}>
                <Text style={fonts.title3}>  {name}</Text>
            </View> 
        </View>
    )
}

export default Organizer;