import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Text, Icon } from "@rneui/base";
import { getFirebaseUserIDOrEmpty } from "../../utils/util";
import { colours } from "../subatoms/Theme";
import { useStateWithFireStoreDocument } from "../../utils/useStateWithFirebase";
import { Loading } from "../pages/Common/Loading";
import {
  extractMonth,
  extractDay,
  nextStartTime,
  nextEndTime,
} from "../../utils/model/EventObject";
import { Student } from "../../utils/model/Student";
import { Image } from "@rneui/base";

// Event component props
interface EventProps {
  id: string;
  navigation: any;
  userType: string;
  onSaveEvent: any;
  listView: boolean;
}

const Event: React.FC<EventProps> = (props) => {
  const [loading, event, setEvent] = useStateWithFireStoreDocument(
    "events",
    props.id
  );

  const [loading2, student, setStudent] =
    useStateWithFireStoreDocument<Student>("users", getFirebaseUserIDOrEmpty());

  if (loading || loading2 || !event) {
    return <Loading />;
  }

  const isSaved = (student.saved ?? []).includes(props.id);

  let image = {
    uri:
      "https://storage.googleapis.com/uevents-a9365.appspot.com/events/" +
      event.images[0],
  };

  const saveEvent = () => {
    if (isSaved) {
      setStudent({
        ...student,
        saved: student.saved.filter((id) => id != props.id),
      });

      props.onSaveEvent(false);
    }
    if (!isSaved) {
      setStudent({
        ...student,
        saved: [...student.saved, props.id],
      });
      props.onSaveEvent(true);
    }
  };

  // True start time and end time
  let startTime = nextStartTime(event.startTime, event.recurrence);
  let endTime = undefined;
  if (startTime != undefined) {
    endTime = nextEndTime(event.startTime, startTime, event.endTime);
  }

  return (
    <TouchableOpacity
      onPress={() => {
        props.navigation.navigate("EventDetailsView", {
        userType: props.userType,
        eventID: props.id,
        organizerID: event.organizer,
        imageID: "",
      });
      }}
    >
      <View style={{flexDirection: 'row', borderColor: 'black', borderWidth: 1, borderRadius: 13, backgroundColor: colours.white}}>
        
        <View style={{justifyContent: 'center', alignItems: 'center', width: '30%'}}>
           {/* <Image
             source={require('./1F604_color.png')}
             style={{width: "100%", height: "100%"}}
             resizeMode="contain"
           /> */}
        </View>

        <View style={{width: '70%'}}>

          <View>
            <Text style={{fontWeight: '500', fontSize: 20}}>{event.name}</Text>
          </View>

          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            {/* <View style={{width: '10%', height: '20%', backgroundColor: 'green'}}>
              <Image
                source={{uri:'https://engineering.fb.com/wp-content/uploads/2016/04/yearinreview.jpg'}}
                style={{width: "100%", height: "100%"}}
              />
            </View> */}
            <Text style={{color: colours.black}}>{event.organizer}</Text>
          </View>
          
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Icon
              name='time-outline'
              type='ionicon'
              color='black'
            />
            <Text>{startTime?.toDate().getHours() + ":" + startTime?.toDate().getMinutes()}</Text>
            <Text> - </Text>
            <Text>{startTime?.toDate().getDay().toString()}</Text>
          </View>

          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Icon
              name='location-outline'
              type='ionicon'
              color='black'
            />
            <Text>{event.onCampus == true ? "On-campus" : "Off-campus"}</Text>
          </View>

        </View>

      </View>
    </TouchableOpacity>
  );
  
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 15,
    borderWidth: 1,
    maxWidth: "100%",
  },
});

export default Event;
