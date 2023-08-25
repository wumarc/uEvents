import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Text, Icon } from "@rneui/base";
import { getFirebaseUserIDOrEmpty } from "../../utils/util";
import { colours, fonts, windowHeight, windowWidth } from "../subatoms/Theme";
import { useStateWithFireStoreDocument } from "../../utils/useStateWithFirebase";
import { Loading } from "../pages/Common/Loading";
import {
  nextStartTime,
  nextEndTime,
  EventObject,
  getTimeInAMPM,
  relativeDate,
} from "../../utils/model/EventObject";
import { Student } from "../../utils/model/Student";
import { SvgUri } from 'react-native-svg';

// Event component props
interface EventProps {
  id: string;
  organizer: string;
  navigation: any;
  userType: string;
  onSaveEvent: any;
  listView: boolean;
}

const Event: React.FC<EventProps> = (props) => {
  
  const [loading, event, setEvent] = useStateWithFireStoreDocument<EventObject>(
    "events",
    props.id
  );

  const [loading2, student, setStudent] = useStateWithFireStoreDocument<Student>("users", getFirebaseUserIDOrEmpty());

  const [loading3, organizer, set2] = useStateWithFireStoreDocument<EventObject>(
    "users",
    props.organizer
  );

  if (loading || loading2 || loading3 || !event) {
    return <Loading />;
  }

  const isSaved = (student.saved ?? []).includes(props.id);

  let image = { uri: "https://storage.googleapis.com/uevents-a9365.appspot.com/events/" + event.images[0] };

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
      <View style={{
        flexDirection: 'row', 
        borderRadius: 13, 
        ...styles.shadowProp
      }}>
        
        <View style={{justifyContent: 'center', width: windowWidth*0.25, height: windowHeight*0.15}}>
        <SvgUri
          width="100%"
          height="100%"
          uri={"https://openmoji.org/data/color/svg/" + (event.emoji ?? "❓").codePointAt(0)?.toString(16).toUpperCase() + ".svg"}
          fill="black"
        />
        </View>

        <View style={{width: '70%', justifyContent: 'center'}}>

          <View>
            <Text style={{fontWeight: '700', fontSize: 19, color: colours.purple}}>{event.name}</Text>
          </View>

          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            {/* <View style={{width: windowWidth*0.05, height: windowHeight*0.02}}> */}
              {/* <Image
                source={{uri:'https://engineering.fb.com/wp-content/uploads/2016/04/yearinreview.jpg'}}
                style={{width: "100%", height: "100%"}}
              /> */}
            {/* <Icon
              name='font-awesome'
              type='building-o'
              color='black'
            /> */}
            {/* </View> */}
            <Text style={{...fonts.small, fontWeight: '500'}}>{event.organizerType == "Organizer Added" ? organizer.name: event.organizer}</Text>
          </View>

          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Icon
              name='time-outline'
              type='ionicon'
              color={colours.grey}
            />
            <Text style={{...fonts.small, fontWeight: '500'}}>{relativeDate(event.startTime)}</Text>
            <Text style={{...fonts.small, fontWeight: '500'}}> · </Text>
            <Text style={{...fonts.small, fontWeight: '500'}}>{getTimeInAMPM(startTime?.toDate())}</Text>
            {/* toLocaleString('en-US', { hour: 'numeric', hour12: true }) */}
          </View>

          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Icon
              name='location-outline'
              type='ionicon'
              color={colours.grey}
            />
            <Text style={{...fonts.small, fontWeight: '500'}}>{event.onCampus == true ? "On-campus" : "Off-campus"}</Text>
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
  // shadowProp: {
  //   shadowColor: '#171717',
  //   shadowOffset: {width: -2, height: 4},
  //   shadowOpacity: 0.2,
  //   shadowRadius: 3,
  // },
});

export default Event;
