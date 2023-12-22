import { View, Text, TouchableOpacity } from "react-native";
import { fonts, spacing, windowHeight, windowWidth } from "../subatoms/Theme";
import { Icon } from "@rneui/base";
import { Image } from "@rneui/base";
import { useStateWithFireStoreImage } from "../../utils/useStateWithFirebase";
import { Loading } from "../pages/Common/Loading";

const Organizer = ({ name, imageID }: any) => {
  let url = "";

  if (imageID != undefined) {
    const [loading, url2, found] = useStateWithFireStoreImage("organizers/" + imageID);
    if (loading) {
      return <Loading />;
    }
    url = url2 as string;
  }

  return (
    <View
      style={{
        flexDirection: "row",
        ...spacing.verticalMargin1,
        ...spacing.verticalPadding2,
      }}
    >
      {/* Organizer Icon */}
      <View style={{ width: windowWidth * 0.11, height: windowWidth * 0.11, borderRadius: windowWidth * 0.05, overflow: "hidden", justifyContent: "center" }}>
        {url ? <Image source={{ uri: url }} style={{ width: "100%", height: "100%", borderRadius: 50 }} /> : <Icon name="person" />}
      </View>

      {/* Organizer name */}
      <View style={{ justifyContent: "center" }}>
        <Text style={fonts.title3}> {name}</Text>
      </View>
    </View>
  );
};

export default Organizer;

{
  /* <View style={{width: windowWidth*0.04, height: windowHeight*0.02}}>
<FirebaseImage
  style={{width: "100%", height: "100%", borderRadius: windowWidth*0.02, overflow: 'hidden'}}
  id={event.organizer}
/>
</View> */
}
