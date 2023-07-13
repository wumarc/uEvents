import { getStorage, ref } from "firebase/storage";
import { useUploadFile } from "react-firebase-hooks/storage";
import { storage } from "../../../firebaseConfig";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "./main";
import { useState } from "react";
import { useStateWithFireStoreDocument } from "../../../utils/useStateWithFirebase";
import { EventObject } from "../../../utils/model/EventObject";
import { uid } from "../../../utils/util";
import { View, Text, Image } from "react-native";

type props = NativeStackScreenProps<RootStackParamList, "UploadFile">;

const UploadFile = ({ route, navigation }: props) => {
  const [loading, event, set] = useStateWithFireStoreDocument<EventObject>(
    "events",
    route.params.eventId
  );
  const [id, setId] = useState<string>(uid());
  const [uploadFile, uploading, snapshot, error] = useUploadFile();
  const reference = ref(storage, "events/" + id);
  const [selectedFile, setSelectedFile] = useState<File>();

  if (loading) {
    return <Text>Loading</Text>;
  }

  const upload = async () => {
    if (selectedFile) {
      const result = await uploadFile(reference, selectedFile, {
        contentType: "image/jpeg",
      }).then(() => {
        if (!event.images) {
          event.images = [];
        }
        event.images.push(id);
        set(event);
        navigation.goBack();
      });
    }
  };

  return (
    <div>
      <p>
        {error && <strong>Error: {error.message}</strong>}
        {uploading && <span>Uploading file...</span>}
        {snapshot && <span>Snapshot: {JSON.stringify(snapshot)}</span>}
        {selectedFile && <span>Selected file: {selectedFile.name}</span>}
        <input
          type="file"
          onChange={(e) => {
            const file = e.target.files ? e.target.files[0] : undefined;
            setSelectedFile(file);
          }}
        />
        <button onClick={upload}>Upload file</button>
      </p>
    </div>
  );
};

export default UploadFile;
