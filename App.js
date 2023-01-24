import { ThemeProvider } from "react-native-rapi-ui";
import { NavigationContainer } from "@react-navigation/native";
import IsLogged from "./src/auth/isLogged";
import { AuthProvider } from "./src/context/AuthContext";
import * as Sentry from "sentry-expo";

export default function App() {
  Sentry.init({
    dsn: "https://a52483e71c404362aea664fac17e63b4@o1320533.ingest.sentry.io/6576782",
    enableInExpoDevelopment: true,
    debug: true, // If `true`, Sentry will try to print out useful debugging information if something goes wrong with sending the event. Set it to `false` in production
  });
  // Sentry.nativeCrash();
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
