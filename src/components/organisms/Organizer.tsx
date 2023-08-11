import { View, Text, TouchableOpacity } from "react-native";
import { fonts, spacing, windowHeight, windowWidth } from "../subatoms/Theme";
import { Icon } from "@rneui/base";
import { Image } from "@rneui/base";

const Organizer = ({name}: any) => {
    
    return (
        <View style={{
            flexDirection: 'row', 
            ...spacing.verticalMargin1, 
            ...spacing.verticalPadding2,    
        }}
        >
            {/* Organizer Icon */}
            <View style={{width: windowWidth*0.1, height: windowHeight*0.05, justifyContent: 'center'}}>
            <Image
                source={require('./1.png')}
                style={{width: "100%", height: "100%"}}
            />
            </View>

            {/* Organizer name */}
            <View style={{justifyContent: 'center'}}>
                <Text style={fonts.title3}>  {name}</Text>
            </View> 
        </View>
    )
}

export default Organizer;