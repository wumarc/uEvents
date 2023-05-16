import { useState } from "react";
import { SafeAreaProvider } from 'react-native-safe-area-context';
import EventsPage from "../components/pages/EventsPage";
import HomePage from "../components/pages/HomePage";

const MainScreen = ({navigation}: any) => {

  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: "home", title: "Home", focusedIcon: "home", unfocusedIcon: "home-outline" },
    { key: "events", title: "Events", focusedIcon: "calendar-month", unfocusedIcon: "calendar-month-outline" },
    { key: "notification", title: "Notifications", focusedIcon: "bell", unfocusedIcon: "bell-outline" },
    { key: "message", title: "Messages", focusedIcon: "message", unfocusedIcon: "message-outline" },
  ]);

  // const renderScene = BottomNavigation.SceneMap({
  //   home: () => <HomePage navigation={navigation}/>,
  //   events: () => <EventsPage/>,
  // });
  
  return (
      <SafeAreaProvider>
        {/* <BottomNavigation
          navigationState={{index, routes}}
          onIndexChange={setIndex}
          renderScene={renderScene}
        /> */}
      </SafeAreaProvider>
  );

};

export default MainScreen;