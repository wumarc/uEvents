import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./src/firebaseConfig";
import SignIn from "./src/components/pages/SignIn";
import Main from "./src/main";
import { Loading } from "./src/screens/LoadingPage";
import { View, Text } from "react-native";

export default function App() {
  const [user, loading, error] = useAuthState(auth);

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
