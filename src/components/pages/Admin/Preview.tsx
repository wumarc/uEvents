import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../../../main";
import Event from "../../organisms/Event";

type props = NativeStackScreenProps<RootStackParamList, "Preview">;

const Preview = ({ route, navigation }: props) => {
  return (
    <Event
      id={route.params.eventId}
      organizer={route.params.organizerId}
      navigation={navigation}
      onSaveEvent={() => {}}
      listView={false}
      fake={route.params.fake}
    />
  );
};

export default Preview;
