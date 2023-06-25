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
                    <View style={{
                        flexDirection: 'row',
                        backgroundColor: 'blue',
                    }}>
                        <View style={{margin: 7}}>
                            <CustomDropdown/>
                        </View>
                        <View style={{margin: 7}}>
                            <CustomDropdown/>
                        </View>
                    </View>

                </ScrollView>
            </View>
        </View>
    )
}

export default Forum;