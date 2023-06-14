import { FC } from "react";
import { Button, View, Text } from "react-native";
import { defaultOrganizer, Organizer } from "../../../utils/model/Organizer";
import { defaultStudent, Student } from "../../../utils/model/Student";
import { addDocumentToCollection } from "../../../utils/useStateWithFirebase";
import { getFirebaseUserIDOrEmpty } from "../../../utils/util";

export const AccountSelectionPage: FC = () => {
  return (
    <View>
      <Text>Select which account you would like to create</Text>
      <Button
        title="Student"
        onPress={() => {
          addDocumentToCollection<Student>(
            "users",
            getFirebaseUserIDOrEmpty(),
            defaultStudent
          );
        }}
      />
      <Button
        title="Event Organizer"
        onPress={() => {
          addDocumentToCollection<Organizer>(
            "users",
            getFirebaseUserIDOrEmpty(),
            defaultOrganizer
          );
        }}
      />
    </View>
  );
};
