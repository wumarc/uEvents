import { View, Text, SafeAreaView, StyleSheet, ScrollView, StatusBar } from "react-native";
import { colours, spacing, fonts } from "../../subatoms/Theme";
import { FlatList } from "react-native";
import OrganizerEvent from "./OrganizerEvent";
import { FAB } from "react-native-elements";

const Home = ({ navigation }: any) => {

    return (
        <View style={styles.container}>
            <StatusBar translucent  />
            <ScrollView showsHorizontalScrollIndicator={false}>

                <View style={styles.pageTitle}>
                    <Text style={fonts.title1}>Upcoming Events</Text>
                </View>
                
                {/* Should have name, date, time, number of views, image? */}
                <OrganizerEvent/>
                <OrganizerEvent/>
                <OrganizerEvent/>

                {/* <FlatList
                    style={{}}
                    showsVerticalScrollIndicator={false}
                    data={filteredEvents}
                    renderItem={({ item, index }) => (
                        <View style={styles.event}>
                        <Event
                            id={item.id}
                            navigation={navigation}
                            userType={route.params.userType}
                            listView={listView}
                        />
                        </View>
                    )}
                /> */}

                <View style={{position: 'absolute', bottom: 0, right: 0}}>
                    <FAB
                        icon={{ name: "add", color: 'white' }}
                        placement="right"
                        color={colours.purple}
                        size="large"
                        onPress={() => navigation.navigate("Step0")}
                    />
                </View>

            </ScrollView>

        </View>
    );

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colours.white,
        paddingHorizontal: spacing.page,
    },
    pageTitle: {
        flexDirection: "row",
        padding: "3%",
    },
});

export default Home;