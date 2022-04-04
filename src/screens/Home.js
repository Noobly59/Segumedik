import React from "react";
import { SafeAreaView } from "react-native";
import HomeMenuItemContainer from "../components/Home/HomeMenuItemContainer";
import HomePercentageCompleted from "../components/Home/HomePercentageCompleted";
import HomeWeeklyActivties from "../components/Home/HomeWeeklyActivties";

export default function Home() {
  const activities = [
    "Mapa de evacuacion elaboracion-publicacion. 01/01/2022",
    "Mapa de riesgos elaboracion-publicacion. 01/01/2022",
    "Charlas de seguridad y medio ambiente. 01/01/2022",
    "Simulacro de evacuacion. 01/01/2022",
    "Factores de riesgos (mecánico, físico, quimico, biologico, psicosocial, ergonomico). 01/01/2022",
    "Índice de Capacitaciones (Entrenamientos) 01/01/2022",
  ];
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <HomeMenuItemContainer numberOfActAndInc={[15, 7]} />
      <HomePercentageCompleted percentage={59} />
      <HomeWeeklyActivties activities={activities} />
    </SafeAreaView>
  );

  // import useAuth from "../hooks/useAuth";
  // const { auth, logout } = useAuth();
  //<Button text="Cerrar sesión"type="TouchableOpacity"onPress={() => {logout();}}/>
}
