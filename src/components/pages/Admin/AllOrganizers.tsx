import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "./main";
import { useStateWithFireStoreCollection } from "../../../utils/useStateWithFirebase";
import { Organizer as OrganizerType } from "../../../utils/model/Organizer";
import { Loading } from "../Common/Loading";
import { FlatList, View, Text, Clipboard  } from "react-native";
import Organizer from "../../organisms/Organizer";
import { Button, Icon, Image } from "@rneui/themed";
import { doc, setDoc } from "firebase/firestore";
import { fireStore } from "../../../firebaseConfig";


type props = NativeStackScreenProps<RootStackParamList, "AllOrganizers">;
export const AllOrganizers = ({route, navigation}: props) => {

    const [loading, users, add] = useStateWithFireStoreCollection<OrganizerType>("users");

    if (loading) {
        return <Loading/>;
    }

    let organizers = users?.filter((user) => user.type === "organizer") ?? [];
    let organizer = organizers.sort((a, b) => {
        // undefined first
        if (a.approved == undefined) {
            return -1;
        }
        // not approved next
        if (!a.approved) {
            return -1;
        }
        // approved last
        return 1; 
    });  

    return (
        <FlatList
            data={organizers}
            renderItem={({ item }) => (
                <View style={{margin: 2, borderWidth: 2, borderRadius: 5}}>
                    <Organizer name={item.name == "" || item.name == undefined ? "Undefined Name" : item.name} imageID={item.image}/>
                    <View style={{display: 'flex', flexDirection: "row"}}>
                        <Text> {item.approved != undefined ? (item.approved? "Approved": "Created"): "Undefined"} </Text>
                        <Button size="sm" style={{marginLeft: 2}}
                            onPress={() => {
                                if (item.id == undefined) {
                                    console.log("Undefined id")
                                    return;
                                }
                                let nextValue = item.approved != undefined ? !item.approved : true;
                                setDoc(doc(fireStore, "users/" + item.id), {...item, approved: nextValue})
                            }}
                        >Toggle</Button>
                        <Button size="sm" style={{marginLeft: 2}}
                            onPress={() => {
                                Clipboard.setString(item.id);
                            }}
                        >Copy Id</Button>
                        <Button size="sm" style={{marginLeft: 2}}
                            onPress={() => {
                                navigation.navigate("EventOrganizerView", {organizerID: item.id, imageID: item.image})
                            }}
                        >Details</Button>
                    </View>
                </View>
            )}
        />
    )

}