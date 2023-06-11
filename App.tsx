import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./src/firebaseConfig";
import SignIn from "./src/components/pages/SignIn";
import Main from "./src/main";
import { Loading } from "./src/components/pages/LoadingPage";
import { View, Text } from "react-native";
import { useState } from "react";
import LottieView from 'lottie-react-native';
import { StyleSheet } from "react-native";

export default function App() {
  const [user, loading, error] = useAuthState(auth);
  const [splashLoaded, setSplashLoaded] = useState(false);

  if(!splashLoaded) {
    return (
      <View style={styles.splash}>
        <LottieView
          source={require('./assets/splash.json')}
          autoPlay
          loop={false}
          onAnimationFinish={() => setSplashLoaded(true)}
        />
      </View>
    )
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
    return <Main />;
  } else {
    return <SignIn />;
  }
}

const styles = StyleSheet.create({
  splash: {
    flex: 1,
    alighItems: 'center',
    margin: 0
  }
})