import { auth } from "./src/firebaseConfig";
import Main from "./main";
import { Loading } from "./src/components/pages/Common/Loading";
import { View, Text } from "react-native";
import { FC } from "react";
// import LottieView from "lottie-react-native";
import { StyleSheet } from "react-native";
import { useStateWithFireStoreCollection, useStateWithFireStoreDocument, useStateWithFireStoreDocumentLogged } from "./src/utils/useStateWithFirebase";
import { getFirebaseUserIDOrEmpty, isLogged, versionPath } from "./src/utils/util";
import { Error } from "./src/components/pages/Common/Error";
// import { LogBox } from "react-native";
import { Button } from "react-native-elements";
import { Version, compareVersion, currentVersion, latestVersion, versionToString } from "./src/utils/model/Version";

export default function App() {
  // const [user, loading, error] = useAuthState(auth);

  // Ignore all log messages
  // LogBox.ignoreAllLogs();

  // const [splashLoaded, setSplashLoaded] = useState(false);
  // TODO Fix splash screen so it doesn't break the web version anymore

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

  // if (loading) {
  //   return <Loading />;
  // } else if (error) {
  //   console.error(error);
  //   return (
  //     <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
  //       <Text>{"Oops! There is a problem. Check your internet connection! If the error persists, please contact us at uevents.dev@uottawa.ca"}</Text>
  //     </View>
  //   );
  // }
  return (
    // <PaperProvider>
    <AppInner />
    // {/* </PaperProvider> */}
  );
}

const styles = StyleSheet.create({
  splash: {
    flex: 1,
    alighItems: "center",
    margin: 0,
  },
});

// This is an inner component to have access to the user type
const AppInner: FC = () => {
  // States
  // const [user, loading, error] = useAuthState(auth);
  const [loading2, userData, setUserData] = useStateWithFireStoreDocument("users", getFirebaseUserIDOrEmpty() == "" ? "Dummy" : getFirebaseUserIDOrEmpty());
  const [loading, versions, setVersions] = useStateWithFireStoreCollection(versionPath());

  if (loading || loading2) {
    return <Loading />;
  }

  let versionsData = versions as Version[];
  let lstVersion = latestVersion(versionsData);
  if (compareVersion(lstVersion, currentVersion) != 0 && lstVersion.major != currentVersion.major) {
    // The versions don't match. The app needs an update
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>{"Please update the app to the latest version to continue using the app."}</Text>
        <Text>{"The current version of the app you are using is no longer supported and may contain bugs."}</Text>
        <Text>{"Current version: " + versionToString(currentVersion) + " Latest version: " + versionToString(lstVersion)}</Text>
      </View>
    );
  }

  // if (error) {
  //   console.error(error);
  //   return <Error message="Oops! There is a problem. Check your internet connection! If the error persists, please contact us at uevents.dev@uottawa.ca" />;
  // }

  if (!isLogged()) {
    return <Main />;
  }

  if (!userData) {
    // TODO: why is this giving an error?
    return (
      <View>
        <Text style={{ marginTop: "40%", textAlign: "center", margin: 20 }}>Make sure that you have a stable internet connection.</Text>
        <Text style={{ marginTop: "10%", textAlign: "center", margin: 20 }}>
          It is also possible that your account is corrupted. In that case, please reach out to us at uevents.dev@uottawa.ca to recover your account.
        </Text>
        <Button style={{ marginTop: "20%", margin: 20 }} title="Sign Out" onPress={() => auth.signOut()} />
      </View>
    );
  }

  return <Main />;

  // if (userData.type === "student") {
  //   return <MainStudent userType={userData.type} />;
  // } else if (userData.type === "organizer") {
  //   return <MainOrganizer userType={userData.type} />;
  // } else if (userData.type === "admin") {
  //   return <MainAdmin userType={userData.type} />;
  // } else {
  //   return <Error message="A problem has occured. please reach us at uevents.dev@uottawa.ca to recover your account." />;
  // }
};
