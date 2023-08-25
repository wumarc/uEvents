import { View, Text, StyleSheet, ScrollView, ActivityIndicator, Linking } from "react-native";
import { EventObject } from "../../../utils/model/EventObject";
import { colours, fonts, spacing, windowHeight, windowWidth, buttons } from "../../subatoms/Theme";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "./main";
import { useStateWithFireStoreCollection, useStateWithFireStoreDocument } from "../../../utils/useStateWithFirebase";
import { Image, Icon, Button } from "@rneui/base";
import { ButtonGroup, Input } from "react-native-elements";
import { useEffect, useState } from "react";
import { Loading } from "../Common/Loading";
import { getOrderedCategories } from "../../../utils/categories";
import { Dropdown } from "react-native-element-dropdown";
import DateTimePicker from "@react-native-community/datetimepicker";
import { MultiSelect } from "react-native-element-dropdown";

type props = NativeStackScreenProps<RootStackParamList, "OrganizerEventDetails">;
// To access the type of user, use route.params.userType

const data = [
  { label: "Academic Hall (SMN)", address: "133-135 Séraphin Marion Street, Ottawa, Ontario"},
  { label: "Hagen (HGN)", address: "115 Séraphin Marion Street, Ottawa, Ontario"},
  { label: "William Commanda (WCA)", address: "52 University Street, Ottawa, Ontario"},
  { label: "Tabaret Hall (TBT)", address: "550 Cumberland Street, Ottawa, Ontario"},
  { label: "Department of Visual Arts (LRR)", address: "100 Laurier Street, Ottawa, Ontario"},
  { label: "Hamelin (MHN)", address: "70 Laurier Street East, Ottawa, Ontario"},
  { label: "Morisset (MRT)", address: "65 University Street, Ottawa, Ontario"},
  { label: "University Centre (UCU)", address: "85 University Street, Ottawa, Ontario"},
  { label: "University Square", address: "136 University Private, Ottawa, ON K1N 1H3"},
  { label: "141 Louis Pasteur (LPR)", address: "141 Louis Pasteur Street, Ottawa, Ontario"},
  { label: "Thompson Residence (THN)", address: "45 University Street, Ottawa, Ontario"},
  { label: "Montpetit (MNT)", address: "125 University Street, Ottawa, Ontario"},
  { label: "Pérez (PRZ)", address: "50 University Street, Ottawa, Ontario"},
  { label: "Residence (90U)", address: "90 University Street, Ottawa, Ontario"},
  { label: "Marchand Residence (MRD)", address: "110 University Street, Ottawa, Ontario"},
  { label: "Learning Crossroads (CRX)", address: "145 Jean-Jacques Lussier Street, Ottawa, Ontario"},
  { label: "Lamoureux (LMX)", address: "145 Jean-Jacques Lussier Street, Ottawa, Ontario"},
  { label: "Brooks (BRS)", address: "100 Thomas-More Street, Ottawa, Ontario"},
  { label: "Colonel By (CBY)", address: "161 Louis Pasteur Street, Ottawa, Ontario"},
  { label: "Leblanc Residence (LBC)", address: "45 Louis Pasteur Street, Ottawa, Ontario"},
  { label: "MCE", address: "100 Marie Curie Street, Ottawa, Ontario"},
  { label: "Bioscience-Ph I CAREG (CRG)", address: "20 Marie Curie Street, Ottawa, Ontario"},
  { label: "Fauteux (FTX)", address: "57 Louis Pasteur Street, Ottawa, Ontario"},
  { label: "Simard (SMD)", address: "60 University Street, Ottawa, Ontario"},
  { label: "Vanier (VNR)", address: "136 Jean-Jacques Lussier Street, Ottawa, Ontario"},
  { label: "Bioscience-Ph III, Gendron (GNN)", address: "30 Marie Curie Street, Ottawa, Ontario"},
  { label: "Marion (MRN)", address: "140 Louis Pasteur Street, Ottawa, Ontario"},
  { label: "Stanton Residence (STN)", address: "100 University Street, Ottawa, Ontario"},
  { label: "Hyman Soloway Residence (HSY)", address: "157 Laurier Street, Ottawa, Ontario"},
  { label: "Desmarais (DMS)", address: "55 Laurier Street, Ottawa, Ontario"},
  { label: "Social Sciences Building (FSS)", address: "120 University Street, Ottawa, Ontario"},
  { label: "Power Plant (CTE)", address: "720 King Edward Street, Ottawa, Ontario"},
  { label: "Matt Anthony Field", address: "801 King Edward, Ottawa, ON K1N 6N5"},
  { label: "Minto Sports Complex (MNO)", address: "801 King Edward Street, Ottawa, Ontario"},
  { label: "SITE (STE)", address: "800 King Edward Street, Ottawa, Ontario"},
  { label: "D'Iorio (DRO)", address: "10 Marie Curie Street, Ottawa, Ontario"},
  { label: "Bioscience-Ph II (BSC)", address: "30 Marie Curie Street, Ottawa, Ontario"},
  { label: "STEM Complex (STM)", address: "150 Louis Pasteur Street, Ottawa, Ontario"},
  { label: "Roger Guindon (RGN)", address: "451 Smyth Street, Ottawa, Ontario"},
  { label: "GSAED Grad House (GSD)", address: "601 Cumberland Street, Ottawa, Ontario"},
  { label: "HNN", address: "202 Henderson Street, Ottawa, Ontario"},
  { label: "Advanced Research Complex (ARC)", address: "25 Templeton Street, Ottawa, Ontario"},
  { label: "KED", address: "585 King Edward Street, Ottawa, Ontario"},
  { label: "STT", address: "1 Stewart Street, Ottawa, Ontario"},
  { label: "Alex Trebek Alumni Hall (ATK)", address: "157 Séraphin Marion Street, Ottawa, Ontario"},
  { label: "ANX", address: "Annex Residence, Ottawa, Ontario"},
  { label: "MNN", address: "Mann Residence, Ottawa, Ontario"},
  { label: "WBD", address: "200 Wilbrod Street, Ottawa, Ontario"},
  { label: "FRL", address: "Friel Residence, Ottawa, Ontario"},
  { label: "RDU", address: "Rideau Residence, Ottawa, Ontario"},
  { label: "Dome", address: "Lees 200 - Bloc F, Ottawa, Ontario"},
];

const OrganizerEventDetails = ({ route, navigation }: props) => {
  
  const [loading, event, set] = useStateWithFireStoreDocument<EventObject>(
    "events",
    route.params.eventID
  );

  const [loading2, events, add] =
  useStateWithFireStoreCollection<EventObject>("events");

  const [fixedCategories, setFixedCategories] = useState<string[]>([]);

  let categories: string[] = [];

  useEffect(() => {
    if (fixedCategories.length == 0) {
      setFixedCategories(categories);
    }
  }, [events]);

  const [newCategory, setNewCategory] = useState<string>("");
  
  if (loading || loading2) {
    return <Loading />;
  }

  const getSelectedCategories = () => {
    // Calculate the selected categories
    let set: string[] = [];
    for (let category of event.categories) {
      set.push(category);
    }
    return set;
  }

  categories = getOrderedCategories(events as EventObject[]);

  let categoryData = [];
  for (let category of fixedCategories) {
    categoryData.push({label: category, value: category});
  }

  if (loading) {
    return <Loading />;
  }

  if (loading) {
    return <ActivityIndicator />;
  }

  return (
    <View style={{flex: 1, backgroundColor: colours.white}}>

      <ScrollView style={{paddingHorizontal: spacing.horizontalMargin1, paddingBottom: 100}} showsVerticalScrollIndicator={false}>

        <View style={spacing.verticalMargin1}>

            {/* Name */}
            <Input
              label="Event Name"
              selectionColor={colours.purple}
              inputContainerStyle={{borderColor: colours.grey, borderWidth: 1, paddingVertical: 4, paddingHorizontal: 8, borderRadius: 6}}
              // leftIcon={<Icon name="event-note" type="material-icon" color={colours.grey} />}
              containerStyle={{ paddingHorizontal: 0}}
              onChange={(e) => set({...event, name: e.nativeEvent.text})}
              maxLength={35}
              defaultValue={event.name}
            />
            
            {/* Emoji */}
            <Input
              label="Emoji"
              selectionColor={colours.purple}
              inputContainerStyle={{borderColor: colours.grey,borderWidth: 1,paddingVertical: 4,paddingHorizontal: 8,borderRadius: 6}}
              // leftIcon={<Icon name="sticker-emoji" type="material-community" color={colours.grey} />}
              containerStyle={{ paddingHorizontal: 0}}
              onChange={(e) => set({...event, emoji: e.nativeEvent.text})}
              maxLength={8}
              defaultValue={event.emoji}
            />

            {/* Location */}
            <View style={{backgroundColor: '#F1F1F1', padding: '1%'}}>
              <Text style={{...fonts.title3, fontWeight: 'bold', color: 'grey', paddingLeft: '3%'}}>On-campus</Text>
              <ButtonGroup
                buttons={["Yes", "No"]}
                onPress={(index) => {
                  if (index == 0) {
                    set({ ...event, onCampus: true });
                  } else {
                    set({ ...event, onCampus: false });
                  }
                }}
                selectedIndex={event.onCampus == true ? 0 : 1}
                containerStyle={{ height: 50, paddingHorizontal: 0}}
                selectedButtonStyle={{ backgroundColor: colours.purple }}
              />

              <View>
                {event.onCampus ? (
                  <View>
                    <Text style={fonts.regular}>Select the building or place name</Text>
                    <Dropdown
                      search
                      searchPlaceholder="Search by name or acronym"
                      placeholderStyle={{ fontSize: 17, padding: 10}}
                      data={data}
                      labelField="label"
                      valueField="address"
                      placeholder={event.location == "" ?  "" :  event.location}
                      style={{borderWidth: 1, borderColor: colours.grey, borderRadius: 6, height: windowHeight*0.05}}
                      onChange={(item) => set({...event, location: item.label, address: item.address, onCampus: true})}
                    />
                    <Input
                      label="Room number (optional)"
                      selectTextOnFocus={true}
                      selectionColor={colours.purple}
                      labelStyle={{...fonts.regular}}
                      inputContainerStyle={{borderColor: colours.grey,borderWidth: 1, paddingVertical: 4, borderRadius: 6}}
                      containerStyle={{ paddingHorizontal: 0}}
                      onChange={(e) => set({...event, roomNumber: e.nativeEvent.text, onCampus: true})}
                      maxLength={10}
                      defaultValue={event.roomNumber}
                    />
                  </View>
                ) :
                  <View>
                    <Input
                      label="Street address"
                      selectionColor={colours.purple}
                      selectTextOnFocus={true}
                      multiline={true}
                      defaultValue={ event.address}
                      labelStyle={{...fonts.regular}}
                      inputContainerStyle={{borderColor: colours.grey,borderWidth: 1, paddingHorizontal: 8, borderRadius: 6}}
                      maxLength={60}
                      onChange={(e) => set({ ...event, address: e.nativeEvent.text, onCampus: false})}
                    />
                    <Input
                      label="Location or building name"
                      selectionColor={colours.purple}
                      selectTextOnFocus={true}
                      labelStyle={{...fonts.regular}}
                      inputContainerStyle={{borderColor: colours.grey,borderWidth: 1, paddingHorizontal: 8, borderRadius: 6}}
                      defaultValue={event.location}
                      maxLength={50}
                      onChange={(e) => set({ ...event, location: e.nativeEvent.text, onCampus: false})}
                    />
                    <Input
                      label="Room number (optional)"
                      selectionColor={colours.purple}
                      selectTextOnFocus={true}
                      labelStyle={{...fonts.regular}}
                      inputContainerStyle={{borderColor: colours.grey,borderWidth: 1, paddingVertical: 4, paddingHorizontal: 8, borderRadius: 6}}
                      defaultValue={event.roomNumber}
                      maxLength={10}
                      onChange={(e) => set({ ...event, roomNumber: e.nativeEvent.text, onCampus: false})}
                    />
                  </View>
                }
              </View>
              
            </View>

            {/* Date, time, recurrence */}
            <View style={{backgroundColor: '#F1F1F1', padding: '1%'}}>
              <Text style={fonts.title3}>Start Time</Text>
              <DateTimePicker
                value={event.startTime == null ? new Date() : event.startTime.toDate()}
                mode={"datetime"}
                display="spinner"
                minimumDate={new Date()}
                maximumDate={new Date(2023, 31, 31)}
                onChange={(e) => set({...event, startTime: Timestamp.fromMillis(e.nativeEvent.timestamp!)})}
              />
              <Text style={fonts.title3}>End Time</Text>
              <DateTimePicker
                value={event.endTime == null ? new Date() : event.endTime.toDate()}
                mode={"datetime"}
                display="spinner"
                minimumDate={event.startTime == null ? new Date() : event.startTime.toDate()}
                maximumDate={new Date(2023, 31, 31)}
                onChange={(e) => set({...event, endTime: Timestamp.fromMillis(e.nativeEvent.timestamp!)})}
              />
            </View>

            {/* Description */}
            <Input
              label="Description"
              selectionColor={colours.purple}
              multiline={true}
              maxLength={400}
              inputContainerStyle={{borderColor: colours.grey,borderWidth: 1,paddingVertical: 4,paddingHorizontal: 8,borderRadius: 6}}
              onChange={(e) => set({ ...event, description: e.nativeEvent.text })}
              defaultValue={event.description}
              containerStyle={{ paddingHorizontal: 0}}
            />

            {/* Price */}
            <View style={{flexDirection: "row"}}>
              <Input
                label="Price"
                defaultValue={event.priceMin.toString()}
                onChange={(e) => set({...event, priceMin: Number(e.nativeEvent.text)})}
                selectionColor={colours.purple}
                inputContainerStyle={{borderColor: colours.grey,borderWidth: 1,paddingVertical: 4,paddingHorizontal: 8,borderRadius: 6}}
                containerStyle={{paddingHorizontal: 0, flex:1}}
                maxLength={4}
              />
              <Text> </Text>
              <Input
                label="Max Price (Optional)"
                defaultValue={event.priceMax?.toString()}
                onChange={(e) => set({...event, priceMax: Number(e.nativeEvent.text)})}
                selectionColor={colours.purple}
                inputContainerStyle={{borderColor: colours.grey,borderWidth: 1,paddingVertical: 4,paddingHorizontal: 8,borderRadius: 6}}
                containerStyle={{paddingHorizontal: 0, flex:1}}
                maxLength={4}
              />
            </View>

            {/* Sign up link */}
            <Input
              label="Sign up link"
              multiline={true}
              defaultValue={event.signUpLink}
              onChange={(e) => set({ ...event, signUpLink: e.nativeEvent.text })}
              selectionColor={colours.purple}
              inputContainerStyle={{borderColor: colours.grey,borderWidth: 1,paddingVertical: 4,paddingHorizontal: 8,borderRadius: 6}}
              containerStyle={{paddingHorizontal: 0}}
              maxLength={300}
            />

            {/* Tags */}
            <View>
              <Text style={{...fonts.title3, fontWeight: 'bold', color: 'grey'}}>
                Tags
              </Text>
              <MultiSelect
                search
                searchPlaceholder="Search tags"
                placeholderStyle={{ fontSize: 17, padding: 7}}
                selectedStyle={{borderRadius: 10, padding: '2%', borderColor: colours.black}}
                selectedTextStyle={{color: colours.black, fontSize: 18}}
                data={categoryData}
                maxSelect={5}
                activeColor={colours.purple}
                value={getSelectedCategories()}
                labelField={"label"}
                valueField={"value"}
                placeholder={"Select up to 5 tags"}
                style={{borderWidth: 1, borderColor: colours.grey, borderRadius: 6, height: windowHeight*0.05}}
                onChange={(item) => {
                  set({...event, categories: item})
                }}
              />
              <Input
                label="New Tag (Note that it will not show above once created)"
                disabled={getSelectedCategories().length >= 5}
                selectTextOnFocus={true}
                selectionColor={colours.purple}
                labelStyle={{...fonts.regular}}
                inputContainerStyle={{borderColor: colours.grey,borderWidth: 1, paddingVertical: 4, borderRadius: 6}}
                containerStyle={{ paddingHorizontal: 0}}
                onChangeText={(text) => setNewCategory(text)}
                value={newCategory}
                maxLength={30}
                defaultValue={event.roomNumber}
              />
              <Button
                buttonStyle={{
                  backgroundColor: colours.purple,
                  padding: 10,
                  borderRadius: 10,
                  width: '30%',
                }}
                disabled={getSelectedCategories().length >= 5}
                title="Add tag"
                onPress={() =>{
                  if (newCategory == "") {
                    return;
                  }
                  set({...event, categories: [...event.categories, newCategory]})
                  categoryData.push({label: newCategory, value: newCategory});
                  setNewCategory("");
                }}
                titleStyle={{ ...fonts.title2, color: colours.white }}
              />

          
          </View>

        </View>

      </ScrollView>
      
      <View style={styles.footer}>
        <Text style={fonts.title2}>
          {event.priceMin ? event.priceMax
            ? "$" + event.priceMin + "- $" + event.priceMax : "$" + event.priceMin
            : "Free"
          }
        </Text>
        <Button
          buttonStyle={{backgroundColor: colours.purple, padding: '5%', paddingHorizontal: '4%', borderRadius: 10}}
          title={"Save Changes"}
          titleStyle={{ fontSize: 20, fontWeight: "600"}}
          onPress={() => navigation.pop()}
        />
      </View>

    </View>

  );
};

const styles = StyleSheet.create({
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
    paddingHorizontal: '5%',
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: colours.primaryGrey,
    backgroundColor: colours.white,
  },
});

export default OrganizerEventDetails;