import { FC } from "react";
import { useStateWithFireStoreImage } from "../../utils/useStateWithFirebase";
import { Platform, Text } from "react-native";
import { Loading } from "../pages/Common/Loading";
import { Image } from "@rneui/themed";

const FirebaseImage = ({ id, style }: { id: string; style: any }) => {
  const [loading, image] = useStateWithFireStoreImage("organizers/" + id);

  if (loading) {
    return <Loading />;
  }

  if (image == undefined || image == "") {
    if (Platform.OS == "web") {
      return <img src={require("../pages/EventOrganizer/blank_profile.jpg")} style={style} />;
    }
    return <Image source={require("../pages/EventOrganizer/blank_profile.jpg")} style={style} />;
  }

  if (Platform.OS == "web") {
    return <img src={image} style={style} />;
  }
  return <Image source={{ uri: image }} style={style} />;
};

export default FirebaseImage;
