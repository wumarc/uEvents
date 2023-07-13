import { FC } from "react";
import { useStateWithFireStoreImage } from "../../utils/useStateWithFirebase";
import { Text } from "react-native";

const FirebaseImage: FC<{ id: string }> = ({ id }) => {
  const [loading, url, found] = useStateWithFireStoreImage(id);
  if (loading) {
    return <Text>Loading</Text>;
  }
  if (!found) {
    return <Text>No image found</Text>;
  }
  return <img style={{ maxWidth: 300, height: "auto" }} src={url} />;
};

export default FirebaseImage;
