import { getStorage, ref } from "firebase/storage";
import { useUploadFile } from "react-firebase-hooks/storage";
import { storage } from "../../firebaseConfig";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../pages/Admin/main";
import { FC, useState } from "react";
import { useStateWithFireStoreDocument } from "../../utils/useStateWithFirebase";
import { EventObject } from "../../utils/model/EventObject";
import { uid } from "../../utils/util";
import { View, Text, Image } from "react-native";
import { Button, Input } from "react-native-elements";

const UploadFile: FC<{ setImage: (id: string) => void }> = (props) => {
  const [id, setId] = useState<string>(uid());
  const [done, setDone] = useState<boolean>(false);
  const [uploadFile, uploading, snapshot, error] = useUploadFile();
  const reference = ref(storage, "events/" + id);
  const [selectedFile, setSelectedFile] = useState<File>();

  const upload = async () => {
    if (selectedFile) {
      const result = await uploadFile(reference, selectedFile, {
        contentType: "image/jpeg",
      }).then(() => {
        props.setImage(id);
        setDone(true);
      });
    }
  };

  return (
    // <div>
    //   <p>
    //     {error && <strong>Error: {error.message}</strong>}
    //     {uploading && <span>Uploading file...</span>}
    //     {snapshot && <span>Snapshot: {JSON.stringify(snapshot)}</span>}
    //     {selectedFile && <span>Selected file: {selectedFile.name}</span>}
    //     <input
    //       type="file"
    //       onChange={(e) => {
    //         const file = e.target.files ? e.target.files[0] : undefined;
    //         setSelectedFile(file);
    //       }}
    //     />
    //     <button onClick={upload}>Upload file</button>
    //   </p>
    // </div>
    <View
      style={{
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <input
        type="file"
        onChange={(e) => {
          const file = e.target.files ? e.target.files[0] : undefined;
          setSelectedFile(file);
        }}
      />
      <Button
        title="Upload"
        onPress={() => {
          upload();
        }}
      />
      {done && (
        <Text
          style={{
            color: "green",
            fontSize: 20,
            marginLeft: 10,
          }}
        >
          Done
        </Text>
      )}
      {uploading && (
        <Text
          style={{
            color: "red",
            fontSize: 20,
            marginLeft: 10,
          }}
        >
          Uploading
          {(((snapshot?.bytesTransferred ?? 0) / (snapshot?.totalBytes ?? 1000000)) * 100).toPrecision(3)}%
        </Text>
      )}
    </View>
  );
};

export default UploadFile;
