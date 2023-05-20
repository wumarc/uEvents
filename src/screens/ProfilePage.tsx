import { View} from "react-native"
import { useState } from "react";
import { Button, Input, Image, Text } from '@rneui/themed';
import { StyleSheet } from "react-native";
import { Student } from "../utils/model/Student";

const ProfileScreen = (props: any) => {

    const [profile, setProfile] = useState<Student>(props.profile);

    return (
        <View style={styles.container}>
            {/* Header Section */}
            <View style={styles.profileHeader}>
                <Text h4>Your Profile</Text>
            </View>

            {/* Image Section */}
            <View style={styles.profileImage}>
                <Image 
                    source={{ uri: 'https://images.squarespace-cdn.com/content/v1/592738c58419c2fe84fbdb81/1515457803870-4HA5BU3QQY2DXLR0LFVB/DBS_StudentLinkedInAlex.jpg?format=1000w' }}
                    style={{ 
                        width: 200,
                        height: 200,
                        borderRadius: 200/2,
                    }}
                />
            </View>

            {/* Student Info Section */}
            <View style={styles.studentInfo}>
                <View style={{ flexDirection: "column", flex: 1 }}>
                    <Input
                        placeholder='Student Name'
                        leftIcon={{ 
                            type: 'material', 
                            name: 'person'
                        }}
                    />
                    <Input
                        placeholder='Student ID'
                        leftIcon={{ 
                            type: 'material',
                            name: 'credit-card' 
                        }}
                    />
                    <Input
                        placeholder='Student Email'
                        leftIcon={{ 
                            type: 'material', 
                            name: 'email'
                        }}
                        
                    />
                </View>
            </View>

            {/* Save Changes Section */}
            <View style={styles.saveButton}>
                <Button
                    color="primary"
                    radius="lg"
                    size="md"
                >
                    Save Changes
                </Button>
            </View>

        </View>
    )

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 0,
        marginHorizontal: 0,
        paddingHorizontal: 8,
        // backgroundColor: "red",
        alignItems: "center",
        justifyContent: "space-between"
    },
    profileHeader: {
        flexDirection: "row",
        justifyContent: "center",
        paddingTop: 15
    },
    profileImage: {
        flexDirection: "row", 
        justifyContent: "center",
        marginBottom: 10
    },
    studentInfo: {
        flexDirection: "row",
        // backgroundColor: "green"
    },
    saveButton: {
        flexDirection: "row",
        marginBottom: 10,
    }
  })

export default ProfileScreen