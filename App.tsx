import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./src/firebaseConfig";
import SignIn from "./src/components/pages/Common/SignIn";
import MainStudent from "./src/components/pages/Student/main";
import MainOrganizer from "./src/components/pages/EventOrganizer/main";
import MainAdmin from "./src/components/pages/Admin/main";
import { Loading } from "./src/components/pages/Common/Loading";
import { View, Text } from "react-native";
import { FC, useState } from "react";
// import LottieView from "lottie-react-native";
import { StyleSheet } from "react-native";
import { useStateWithFireStoreDocument } from "./src/utils/useStateWithFirebase";
import { getFirebaseUserIDOrEmpty } from "./src/utils/util";
import { Error } from "./src/components/pages/Common/Error";
import { LogBox } from "react-native";

export default function App() {
  const [user, loading, error] = useAuthState(auth);
  LogBox.ignoreAllLogs();
  // const [splashLoaded, setSplashLoaded] = useState(false); // TODO Fix splash screen so it doesn't break the web version anymore

  // if (!splashLoaded) {
  //   return (
  //     <View style={styles.splash}>
  //       <LottieView
  //         source={require("./assets/splash.json")}
  //         autoPlay
  //         loop={false}
  //         onAnimationFinish={() => setSplashLoaded(true)}
  //       />
  //     </View>
  //   );
  // }

  if (loading) {
    return <Loading />;
  } else if (error) {
    console.error(error);
    return (
      <View>
        <Text>{"Oops! There's been a problem"}</Text>
      </View>
    );
  } else if (user) {
    return <AppInner />;
  } else {
    return <SignIn />;
  }
}

const styles = StyleSheet.create({
  splash: {
    flex: 1,
    alighItems: "center",
    margin: 0,
  },
});

/// This is an inner component to have access to the user type
const AppInner: FC = () => {
  const [loading, userData, setUserData] = useStateWithFireStoreDocument(
    "users",
    getFirebaseUserIDOrEmpty()
  );

  if (loading) {
    return <Loading />;
  }

  if (!userData) {
    return <Error message="Could not get user type" />;
  }

  if (userData.type === "student") {
    return <MainStudent userType={userData.type} />;
  } else if (userData.type === "organizer") {
    return <MainOrganizer userType={userData.type} />;
  } else if (userData.type === "admin") {
    return <MainAdmin userType={userData.type} />;
  } else {
    return <Error message="Could not get user type" />;
  }
};
