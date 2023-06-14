import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebaseConfig";
import SignIn from "./components/pages/Common/SignIn";
import Main from "./components/pages/Student/main";
import { Loading } from "./components/pages/Common/Loading";
import { View, Text } from "react-native";
import { FC, useState } from "react";
import LottieView from "lottie-react-native";
import { StyleSheet } from "react-native";
import { useStateWithFireStoreDocument } from "./utils/useStateWithFirebase";
import { getFirebaseUserIDOrEmpty } from "./utils/util";
import { AccountSelectionPage } from "./components/pages/Common/AccountSelection";

export default function App() {
  const [user, loading, error] = useAuthState(auth);
  const [splashLoaded, setSplashLoaded] = useState(false);

  if (!splashLoaded) {
    return (
      <View style={styles.splash}>
        <LottieView
          source={require("./assets/splash.json")}
          autoPlay
          loop={false}
          onAnimationFinish={() => setSplashLoaded(true)}
        />
      </View>
    );
  }

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
    return <Text>Loading</Text>;
  }

  if (!userData) {
    return <AccountSelectionPage />;
  }

  return <Main userType={userData.type} />;
};
