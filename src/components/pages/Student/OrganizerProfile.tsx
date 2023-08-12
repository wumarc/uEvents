import { View, Text, ScrollView } from "react-native";
import { StyleSheet } from "react-native";
import { fonts, spacing } from "../../subatoms/Theme";
import Event from "../../organisms/Event";

const OrganizerProfile = () => {

    return (
        <ScrollView style={{paddingHorizontal: spacing.page}}>

            <View>
                <Text>Image</Text>    
            </View>

            <View>
                <Text style={fonts.title2}>Description</Text>
                <Text style={fonts.regular}>The University of Ottawa Chess Club is a space where students of all strengths can get together and share their passion for chess. We hold bi-weekly meetings where players compete both casually and competitively. Once a year we compete in the annual Canadian University Chess Championship (CUCC) against other Canadian universities.</Text>
            </View>

            <View>
                <Text style={fonts.title2}>Upcoming Events</Text>
                <View>          
                </View>
            </View>

            <View>
                <Text style={fonts.title2}>Past Events</Text>
                <View>
                </View>
            </View>

        </ScrollView>
    );

}


const styles = StyleSheet.create({
});


export default OrganizerProfile;