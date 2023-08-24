import { View, Text, ScrollView } from "react-native";
import { StyleSheet } from "react-native";
import { colours, fonts, spacing, windowWidth } from "../../subatoms/Theme";
import Event from "../../organisms/Event";
import { Avatar, ButtonGroup, Icon } from "react-native-elements";


const OrganizerProfile = () => {

    return (
        <ScrollView style={{backgroundColor: colours.white, paddingHorizontal: spacing.page2}}>
            
            {/* Club logo */}
            <View style={{alignItems: 'center', ...spacing.verticalMargin1}}>
                <Avatar
                    size={150}
                    rounded
                    source={{uri: 'https://files.jotform.com/jufs/cvuo/91997878083278/5057107869824708883/logo.png?md5=6dY9Wg6_82qC1Q9bMfDynw&expires=1692906356'}}
                    containerStyle={{ backgroundColor: 'transparent'}}
                />
            </View>

            {/* Club title */}
            <View>
                <Text style={{...fonts.title2, textAlign: 'center'}}>University of Ottawa Astronomy Club</Text>
            </View>

            {/* Club description */}
            <View style={spacing.verticalMargin1}>
                <Text style={{...fonts.regular, textAlign: 'center'}}>The University of Ottawa Chess Club is a space where students of all strengths can get together and share their passion for chess. We hold bi-weekly meetings where players compete both casually and competitively. Once a year we compete in the annual Canadian University Chess Championship (CUCC) against other Canadian universities.</Text>
            </View>

            {/* Club socials */}
            <View style={{justifyContent: 'center', flexDirection: 'row'}}>
                <Icon
                    name='logo-instagram'
                    type='ionicon'
                    color={colours.black}
                    size={35}
                    containerStyle={{...spacing.verticalMargin1}}
                    onPress={() => console.log('hello')}
                />
                <Icon
                    name='at-outline'
                    type='ionicon'
                    color={colours.black}
                    size={35}
                    containerStyle={{...spacing.verticalMargin1}}
                    onPress={() => console.log('hello')}
                />
            </View>

            {/* Club events */}
            <View>
                <ButtonGroup
                    buttons={['Upcoming', 'Past']}
                    selectedIndex={0}
                    containerStyle={{height: 50}}
                    selectedButtonStyle={{backgroundColor: colours.purple}}
                    textStyle={{...fonts.regular}}
                />
            </View>

            {/* Club events */}


        </ScrollView>
    );

}


const styles = StyleSheet.create({
});


export default OrganizerProfile;