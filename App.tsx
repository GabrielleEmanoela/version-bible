import Router from "./src/routes";
import { ThemeProvider } from "styled-components";
import { PaperProvider } from "react-native-paper";

export default function App() {
  return (
    <PaperProvider>
      <Router />
    </PaperProvider>
  );
}
