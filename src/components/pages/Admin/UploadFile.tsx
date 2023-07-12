import { getStorage, ref } from "firebase/storage";
import { useUploadFile } from "react-firebase-hooks/storage";
import { storage } from "../../../firebaseConfig";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "./main";
import { useState } from "react";

type props = NativeStackScreenProps<RootStackParamList, "UploadFile">;

const UploadFile = ({ route, navigation }: props) => {
  const [uploadFile, uploading, snapshot, error] = useUploadFile();
  const reference = ref(storage, "events/" + route.params.eventId);
  const [selectedFile, setSelectedFile] = useState<File>();

  const upload = async () => {
    if (selectedFile) {
      const result = await uploadFile(reference, selectedFile, {
        contentType: "image/jpeg",
      }).then(() => {
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
