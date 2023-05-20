import { View, Text} from "react-native"
import { Button, Input } from '@rneui/themed';
import { StyleSheet } from "react-native";

const ProfileScreen = () => {

    return (
        <View style={styles.container}>
            {/* Header Section */}
            <View style={{ flexDirection: "row" }}>
                <Text>Your Profile</Text>
            </View>

            {/* Image Section */}
            <View style={{ flexDirection: "row" }}>
                <Text>Image</Text>
            </View>
            {/* <View style={{ flexDirection: "column" }}> */}

            {/* Student Info Section */}
            <View style={{ flexDirection: "row" }}>
                <View style={{ flexDirection: "column" }}>
                    <Input
                        placeholder='Student Name'
                        leftIcon={{ type: 'font-awesome', name: 'user' }}
                    />
                    <Input
                        placeholder='Student ID'
                        leftIcon={{ type: 'font-awesome', name: 'id-card' }}
                    />
                    <Input
                        placeholder='Student Email'
                        leftIcon={{ type: 'font-awesome', name: 'envelope' }}
                    />
                    <Input
                        placeholder='Password'
                        leftIcon={{ type: 'font-awesome', name: 'lock' }}
                    />
                    <Input
                        placeholder='Phone Number'
                        leftIcon={{ type: 'font-awesome', name: 'phone' }}
                    />
                </View>
            </View>

            {/* Save Changes Section */}
            <View style={{ flexDirection: "row" }}>
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
        marginTop: 15,
        marginHorizontal: 15,
      },
  })

export default ProfileScreen