import { View, Text } from "react-native";
import { StyleSheet } from "react-native";

const OrganizerProfile = () => {

    return (
        <View style={styles.container}>

            <View>
                <Text>Image</Text>    
            </View>

            <View>
                
                <Text>Description</Text>

                <Text>The University of Ottawa Chess Club is a space where students of all strengths can get together and share their passion for chess. We hold bi-weekly meetings where players compete both casually and competitively. Once a year we compete in the annual Canadian University Chess Championship (CUCC) against other Canadian universities.</Text>

            </View>

            <View>
                <Text>Upcoming Events</Text>
                <View>

                </View>
            </View>

            <View>
                <Text>Past Events</Text>
                <View>
                    
                </View>
            </View>

        </View>
    );

}


const styles = StyleSheet.create({
    container: {
        paddingHorizontal: '2.3%'
    }
});


export default OrganizerProfile;