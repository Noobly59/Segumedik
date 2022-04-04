import { ThemeProvider } from "react-native-rapi-ui";
import { NavigationContainer } from "@react-navigation/native";
import IsLogged from "./src/auth/isLogged";
import { AuthProvider } from "./src/context/AuthContext";

export default function App() {
  return (
    <ThemeProvider theme="light">
      <NavigationContainer>
        <AuthProvider>
          <IsLogged />
        </AuthProvider>
      </NavigationContainer>
    </ThemeProvider>
  );
}
