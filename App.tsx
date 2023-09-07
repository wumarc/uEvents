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
import { Button } from "react-native-elements";
import { Provider as PaperProvider } from 'react-native-paper';

export default function App() {
  
  const [user, loading, error] = useAuthState(auth);
  
  // Ignore all log messages
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
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>{"Oops! There is a problem. Check your internet connexion! If the error persists, please contact us at uevents.dev@uottawa.ca"}</Text>
      </View>
    );
  } else if (user) {
    return (
      // <PaperProvider>
        <AppInner />
      // {/* </PaperProvider> */}
    ); 
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
  
  // const [loading, userData, setUserData] = useStateWithFireStoreDocument(
  //   "users",
  //   getFirebaseUserIDOrEmpty()
  // );

  const loading = false;
  const userData = undefined

  if (loading) {
    return <Loading />;
  }

  if (!userData) {
    // TODO: why is this giving an error?
    return (
    <View>
      <Text style={{marginTop: "40%", textAlign: "center", margin: 20}}>Make sure that you have a stable internet connection.</Text>
      <Text style={{marginTop: "10%", textAlign: "center", margin: 20}}>It is also possible that your account is corrupted. In that case, please reach out to us at uevents.dev@uottawa.ca to recover your account.</Text>
      <Button style={{marginTop: "20%", margin: 20}} title="Sign Out" onPress={() => auth.signOut()} />
    </View>
    )
    
  }

  if (userData.type === "student") {
    return <MainStudent userType={userData.type} />;
  } else if (userData.type === "organizer") {
    return <MainOrganizer userType={userData.type} />;
  } else if (userData.type === "admin") {
    return <MainAdmin userType={userData.type} />;
  } else {
    return <Error message="A problem has occured. please reach us at uevents.dev@uottawa.ca to recover your account."/>;
  }
};
