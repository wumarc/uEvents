import { View, Text, SafeAreaView } from "react-native";
import { FAB } from 'react-native-elements';
import { colours } from "../../subatoms/colours";
import { FlatList } from "react-native";
import Event from "./Event";

const Home = ({ navigation }: any) => {

    return (
        <>
        
        <View>
            <Text>Your Events</Text>
            <FlatList
                data={[{key: 'a'}, {key: 'b'}]}
                renderItem={({ item, index }) => (
                    <View>
                        <Event/>
                    </View>
                )}
            />
        </View>

        {/* <View style={{position: 'absolute', bottom: 0, right: 0}}>
            <FAB
                icon={{ name: "add", color: 'white' }}
                placement="right"
                color={colours.primaryPurple}
                size="large"
                onPress={() => navigation.navigate("CreateEventView")}
            />
        </View> */}

        </>
    );

}




export default Home;