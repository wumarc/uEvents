import { View, Text, TouchableOpacity, Platform } from "react-native";
import { fonts, spacing, windowHeight, windowWidth } from "../subatoms/Theme";
import { Icon } from "react-native-elements";
import { Image } from "@rneui/base";
import { useStateWithFireStoreImage } from "../../utils/useStateWithFirebase";
import { Loading } from "../pages/Common/Loading";

const Organizer = ({ name, imageID }: any) => {
  let url = "";

  let width = Platform.OS != "web" ? windowWidth * 0.11 : 50;
  let height = Platform.OS != "web" ? windowWidth * 0.11 : 50;
  let borderRadius = Platform.OS != "web" ? windowWidth * 0.05 : 20;

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
      <View style={{ width: width, height: height, borderRadius: borderRadius, overflow: "hidden", justifyContent: "center" }}>
        {url ? (
          Platform.OS != "web" ? (
            // Image for mobile
            <Image source={{ uri: url }} style={{ width: "100%", height: "100%", borderRadius: 50 }} />
          ) : (
            // Image for web
            <img
              src={url}
              style={{
                width: "100%",
                height: "100%",
                borderRadius: 50,
                objectFit: "cover",
              }}
            />
          )
        ) : (
          <Icon name="person" />
        )}
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
