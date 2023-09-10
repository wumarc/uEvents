import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "./main";
import { useStateWithFireStoreCollection } from "../../../utils/useStateWithFirebase";
import { Organizer as OrganizerType } from "../../../utils/model/Organizer";
import { Loading } from "../Common/Loading";
import { FlatList, View, Text, Clipboard, TouchableOpacity  } from "react-native";
import Organizer from "../../organisms/Organizer";
import { Button, FAB, Icon, Image } from "@rneui/themed";
import { deleteDoc, doc, setDoc } from "firebase/firestore";
import { fireStore } from "../../../firebaseConfig";
import { uid } from "../../../utils/util";


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
        <View>
           <FlatList
            data={organizers}
            renderItem={({ item }) => (
                <TouchableOpacity style={{margin: 2}} onPress={() => navigation.navigate("EventOrganizerView", {organizerID: item.id, imageID: item.image})}>
                    <Organizer name={item.name == "" || item.name == undefined ? "Undefined Name" : item.name} imageID={item.image}/>
                    <View style={{display: 'flex', flexDirection: "row"}}>
                        <Text style={{color: item.authentic? "red": "black"}}> {item.approved != undefined ? (item.approved? "Approved": "Created"): "Undefined"} </Text>
                        <Button size="sm" style={{marginLeft: 5}} titleStyle={{fontSize: 12}}
                            onPress={() => {
                                if (item.id == undefined) {
                                    console.log("Undefined id")
                                    return;
                                }
                                let nextValue = item.approved != undefined ? !item.approved : true;
                                setDoc(doc(fireStore, "users/" + item.id), {...item, approved: nextValue})
                            }}
                        >Toggle</Button>
                        <Button size="sm" style={{marginLeft: 5}} titleStyle={{fontSize: 12}}
                            onPress={() => {
                                Clipboard.setString(item.id);
                            }}
                        >Copy Id</Button>
                        <Button size="sm" style={{marginLeft: 5}} titleStyle={{fontSize: 12}}
                            onPress={() => {
                                navigation.navigate("OrganizerProfile", {userType: "", id: item.id})
                            }}
                        >Edit</Button>
                        <Button size="sm" style={{marginLeft: 5}} titleStyle={{fontSize: 12}} color="red"
                            onPress={() => {
                                deleteDoc(doc(fireStore, "users/" + item.id));
                            }}
                        >Delete</Button>
                    </View>
                </TouchableOpacity>
            )}
        /> 
        <View style={{ position: "absolute", bottom: 0, right: 0 }}>
        <FAB
            icon={{ name: "add", color: "white" }}
            placement="right"
            color={"#FD6262"}
            size="large"
            onPress={() => {
                let id: string = uid();
                setDoc(doc(fireStore, "users/" + id), {
                    type: "organizer",
                    saved: [],
                    id: id,
                    approved: false,
                    authentic: false,
                  });
                navigation.navigate("OrganizerProfile", {userType: "", id: id})
            }}
            />
        </View>
        </View>
        
    )

}