import React from "react";
import MainPage from "./src/screens/MainScreen";
import { Provider as PaperProvider } from "react-native-paper";

export default function App() {
  return (
      <React.StrictMode>
        <PaperProvider>
          <MainPage />
        </PaperProvider>
      </React.StrictMode>
  );
}