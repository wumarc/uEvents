import { Timestamp } from "firebase/firestore";
import React, { FC, useState } from "react";
import { Modal, View, Text } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Button, Input } from "react-native-elements";
import WheelPickerExpo from "react-native-wheel-picker-expo";
import CustomButton from "./CustomButton";

export const DatePickerModal: FC<{
    setDate: (date: Timestamp) => void;
    dateValue: Timestamp;
    inputStyle?: any;
}> = (props) => {
    

    const hours = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];
    const minutes = ['00', '05', '10', '15', '20', '25', '30', '35', '40', '45', '50', '55'];
    const ampm = ['AM', 'PM'];
    const days = [
      'Wed Aug 30',
      'Thu Aug 31',
      'Fri Sep 01',
      'Sat Sep 02',
      'Sun Sep 03',
      'Mon Sep 04',
      'Tue Sep 05',
      'Wed Sep 06',
      'Thu Sep 07',
      'Fri Sep 08',
      'Sat Sep 09',
      'Sun Sep 10',
      'Mon Sep 11',
      'Tue Sep 12',
      'Wed Sep 13',
      'Thu Sep 14',
      'Fri Sep 15',
      'Sat Sep 16',
      'Sun Sep 17',
      'Mon Sep 18',
      'Tue Sep 19',
      'Wed Sep 20',
      'Thu Sep 21',
      'Fri Sep 22',
      'Sat Sep 23',
      'Sun Sep 24',
      'Mon Sep 25',
      'Tue Sep 26',
      'Wed Sep 27',
      'Thu Sep 28',
      'Fri Sep 29',
      'Sat Sep 30',
      'Sun Oct 01',
      'Mon Oct 02',
      'Tue Oct 03',
      'Wed Oct 04',
      'Thu Oct 05',
      'Fri Oct 06',
      'Sat Oct 07',
      'Sun Oct 08',
      'Mon Oct 09',
      'Tue Oct 10',
      'Wed Oct 11',
      'Thu Oct 12',
      'Fri Oct 13',
      'Sat Oct 14',
      'Sun Oct 15',
      'Mon Oct 16',
      'Tue Oct 17',
      'Wed Oct 18',
      'Thu Oct 19',
      'Fri Oct 20',
      'Sat Oct 21',
      'Sun Oct 22',
      'Mon Oct 23',
      'Tue Oct 24',
      'Wed Oct 25',
      'Thu Oct 26',
      'Fri Oct 27',
      'Sat Oct 28',
      'Sun Oct 29',
      'Mon Oct 30',
      'Tue Oct 31',
      'Wed Nov 01',
      'Thu Nov 02',
      'Fri Nov 03',
      'Sat Nov 04',
      'Sun Nov 05',
      'Mon Nov 06',
      'Tue Nov 07',
      'Wed Nov 08',
      'Thu Nov 09',
      'Fri Nov 10',
      'Sat Nov 11',
      'Sun Nov 12',
      'Mon Nov 13',
      'Tue Nov 14',
      'Wed Nov 15',
      'Thu Nov 16',
      'Fri Nov 17',
      'Sat Nov 18',
      'Sun Nov 19',
      'Mon Nov 20',
      'Tue Nov 21',
      'Wed Nov 22',
      'Thu Nov 23',
      'Fri Nov 24',
      'Sat Nov 25',
      'Sun Nov 26',
      'Mon Nov 27',
      'Tue Nov 28',
      'Wed Nov 29',
      'Thu Nov 30',
      'Fri Dec 01',
      'Sat Dec 02',
      'Sun Dec 03',
      'Mon Dec 04',
      'Tue Dec 05',
      'Wed Dec 06',
      'Thu Dec 07',
      'Fri Dec 08',
      'Sat Dec 09',
      'Sun Dec 10',
      'Mon Dec 11',
      'Tue Dec 12',
      'Wed Dec 13',
      'Thu Dec 14',
      'Fri Dec 15',
      'Sat Dec 16',
      'Sun Dec 17',
      'Mon Dec 18',
      'Tue Dec 19',
      'Wed Dec 20',
      'Thu Dec 21',
      'Fri Dec 22',
      'Sat Dec 23',
      'Sun Dec 24',
      'Mon Dec 25',
      'Tue Dec 26',
      'Wed Dec 27',
      'Thu Dec 28',
      'Fri Dec 29',
      'Sat Dec 30',
      'Sun Dec 31'
    ];
    const [date, setDate] = useState({
      day: "",
      hour: "",
      minute: "",
      ampm: "",
    });
    const [show, setShow] = useState(false);
  
    const convert = () => {
      let value = new Date();
      value.setHours(parseInt(date.hour) + (date.ampm === "PM" ? 12 : 0));
      value.setMinutes(parseInt(date.minute));
      value.setSeconds(0);
      let split = date.day.split(" ");
      let month = split[1];
      let day = split[2];
      value.setDate(parseInt(day as string));
      let monthNum = 0;
        switch (month) {
            case "Jan":
            monthNum = 0;
            break;
            case "Feb":
            monthNum = 1;
            break;
            case "Mar":
            monthNum = 2;
            break;
            case "Apr":
            monthNum = 3;
            break;
            case "May":
            monthNum = 4;
            break;
            case "Jun":
            monthNum = 5;
            break;
            case "Jul":
            monthNum = 6;
            break;
            case "Aug":
            monthNum = 7;
            break;
            case "Sep":
            monthNum = 8;
            break;
            case "Oct":
            monthNum = 9;
            break;
            case "Nov":
            monthNum = 10;
            break;
            case "Dec":
            monthNum = 11;
            break;
        }
      value.setMonth(monthNum);
      value.setFullYear(2023);
      return value;
    }

    let dateMonth = "";
    switch (props.dateValue.toDate().getMonth()) {
        case 0:
        dateMonth = "Jan";
        break;
        case 1:
        dateMonth = "Feb";
        break;
        case 2:
        dateMonth = "Mar";
        break;
        case 3:
        dateMonth = "Apr";
        break;
        case 4:
        dateMonth = "May";
        break;
        case 5:
        dateMonth = "Jun";
        break;
        case 6:
        dateMonth = "Jul";
        break;
        case 7:
        dateMonth = "Aug";
        break;
        case 8:
        dateMonth = "Sep";
        break;
        case 9:
        dateMonth = "Oct";
        break;
        case 10:
        dateMonth = "Nov";
        break;
        case 11:
        dateMonth = "Dec";
        break;
    }

    let dateDay = props.dateValue.toDate().getDate().toString();
    if (dateDay.length === 1) {
        dateDay = "0" + dateDay;
    }
    let dayString = dateMonth + " " + dateDay;
    let dateIndex = days.findIndex((day) => day.includes(dayString));

    let initialDate = props.dateValue.toDate();

    return (
        <View>
            <Input
                style={props.inputStyle}
               disabled
               value = {`${dateMonth} ${dateDay} ${initialDate.getHours() % 12}:${initialDate.getMinutes() < 10 ? "0" + initialDate.getMinutes() : initialDate.getMinutes()} ${initialDate.getHours() > 11 ? "PM" : "AM"}`}
               onPressIn={() => setShow(true)}
            />
            <Modal
                visible={show}
                onRequestClose={() => setShow(false)}
                presentationStyle="overFullScreen"
                transparent={true}
            >   
                <View
                    style={{
                        backgroundColor: "white",
                        width: "100%",
                        height: "auto",
                        marginTop: "auto",
                        marginBottom: "auto",
                        padding: 10,
                    }}
                >
                    <View style={{borderWidth: 1, borderRadius: 10, margin: 3, padding: 3, flexDirection: 'row'}}>
                        {/* Days */}
                        <WheelPickerExpo
                        height={200}
                        width={130}
                        initialSelectedIndex={dateIndex}
                        items={days.map(name => ({ label: name, value: ''}))}
                        onChange={({ item }) => setDate({...date, day: item.label})}
                        selectedStyle={{borderColor: 'black', borderWidth: 1}}
                        />
                        {/* Hours */}
                        <WheelPickerExpo
                        height={200}
                        width={50}
                        initialSelectedIndex={(props.dateValue.toDate().getHours() % 12) - 1}
                        items={hours.map(name => ({ label: name, value: '' }))}
                        selectedStyle={{borderColor: 'black', borderWidth: 1}}
                        onChange={({ item }) => setDate({...date, hour: item.label})}
                        />
                        {/* Minutes */}
                        <WheelPickerExpo
                        height={200}
                        width={50}
                        initialSelectedIndex={props.dateValue.toDate().getMinutes() / 5}
                        items={minutes.map(name => ({ label: name, value: '' }))}
                        selectedStyle={{borderColor: 'black', borderWidth: 1}}
                        onChange={({ item }) => setDate({...date, minute: item.label})}
                        />
                        {/* PM */}
                        <WheelPickerExpo
                        height={200}
                        width={50}
                        initialSelectedIndex={props.dateValue.toDate().getHours() > 11 ? 1 : 0}
                        items={ampm.map(name => ({ label: name, value: '' }))}
                        selectedStyle={{borderColor: 'black', borderWidth: 1}}
                        onChange={({ item }) => setDate({...date, ampm: item.label})}
                        />
                        
                    </View>
                    <CustomButton
                        buttonName="Done"
                        onPressListener={() => {
                            setShow(false);
                            props.setDate(Timestamp.fromDate(convert()));
                        }}
                    />
                    </View>          
                </Modal>
            </View>
        
    )
}