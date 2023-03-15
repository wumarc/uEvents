import { BottomNavigation, Text } from "react-native-paper";
import { useState } from "react";
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Events from "./Events";
import Notification from "./Notification";
import Profile from "./Profile";
import Home from "./Home";

const MainPage = () => {

  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: "home", title: "Home", focusedIcon: "home", unfocusedIcon: "home-outline" },
    { key: "events", title: "Events", focusedIcon: "calendar-month", unfocusedIcon: "calendar-month-outline" },
    { key: "notification", title: "Notification", focusedIcon: "bell", unfocusedIcon: "bell-outline" },
    { key: "profile", title: "Profile", focusedIcon: "account", unfocusedIcon: "account-outline" },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    home: () => <Home/>,
    events: () => <Events/>,
    notification: () => <Notification/>,
    profile: () => <Profile/>
  });

  return (
      <SafeAreaProvider>
          <BottomNavigation
            navigationState={{index, routes}}
            onIndexChange={setIndex}
            renderScene={renderScene}
          />
      </SafeAreaProvider>
  );

};

export default MainPage;