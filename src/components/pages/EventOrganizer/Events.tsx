import { View, Text, SafeAreaView, StyleSheet, ScrollView, StatusBar } from "react-native";
import { colours, spacing, fonts } from "../../subatoms/Theme";
import { FlatList } from "react-native";
import OrganizerEvent from "./OrganizerEvent";

const Events = ({ navigation }: any) => {

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

export default Events;