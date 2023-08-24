import { Timestamp } from "firebase/firestore";
import React, { FC, useState } from "react";
import { Modal, View, Text } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Button, Input } from "react-native-elements";

export const DatePickerModal: FC<{
    setDate: (date: Timestamp) => void;
    dateValue: Timestamp;
}> = (props) => {
    const [date, setDate] = useState(props.dateValue.toDate());
    const [show, setShow] = useState(false);

    return (
        <View>
            <Input
               disabled
               value = {date.toDateString()} 
               onPressIn={() => setShow(true)}
            />
            <Modal
                visible={show}
                onDismiss={() => setShow(false)}
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
                        borderWidth: 1,
                    }}
                >
                    <Button
                    onPress={() => {
                       setShow(false);
                        props.setDate(Timestamp.fromDate(date));
                    }}
                    title="Done"
                    />
                    <DateTimePicker
                    value={date? props.dateValue.toDate() : new Date()}
                    mode={"datetime"}
                    display="spinner"
                    minimumDate={new Date()}
                    maximumDate={new Date(2023, 31, 31)}
                    onChange={(event, selectedDate) => {
                        const currentDate = selectedDate || date;
                        setDate(currentDate);
                    }}
                    />
                </View>
                
            </Modal>
        </View>
        
    )
}