import { View, Text, ScrollView, TouchableOpacity, StyleSheet} from "react-native";
import { useState } from "react";
import CustomDropdown from "../../atoms/CustomDropdown";

const Forum = () => {

    const [selectedValue, setSelectedValue] = useState('');

    return (
        <View>

            {/* Group Button */}
            <View style={{flexDirection: 'row', width: '100%', backgroundColor:'red'}}>
                <ScrollView
                    style={{}}
                    horizontal
                    pagingEnabled
                >
                    <View>
                        <Text>free ice cream on TBT lawn!</Text>
                        <Text>Come now! it will be here until 7 pm</Text>
                    </View>

                </ScrollView>
            </View>
        </View>
    )
}

export default Forum;