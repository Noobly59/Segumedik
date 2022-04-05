import React from "react";
import { SafeAreaView } from "react-native";
import HomeMenuItemContainer from "../components/Home/HomeMenuItemContainer";
import HomePercentageCompleted from "../components/Home/HomePercentageCompleted";
import HomeSubConSection from "../components/Home/HomeSubConSection";
import HomeWeeklyActivties from "../components/Home/HomeWeeklyActivties";

export default function Home() {
  const activities = [
    {
      id: "1",
      actName: "Mapa de evacuacion elaboracion-publicacion.",
      date: " 01/01/2022",
      icon: "logo-tux",
    },
    {
      id: "2",
      actName: "Mapa de riesgos elaboracion-publicacion.",
      date: " 01/01/2022",
      icon: "logo-tux",
    },
    {
      id: "3",
      actName: "Charlas de seguridad y medio ambiente.",
      date: " 01/01/2022",
      icon: "logo-tux",
    },
    {
      id: "4",
      actName: "Simulacro de evacuacion.",
      date: " 01/01/2022",
      icon: "logo-tux",
    },
    {
      id: "5",
      actName:
        "Factores de riesgos (mecánico, físico, quimico, biologico, psicosocial, ergonomico).",
      date: " 01/01/2022",
      icon: "logo-tux",
    },
    {
      id: "6",
      actName: "Índice de Capacitaciones (Entrenamientos).",
      date: " 01/01/2022",
      icon: "logo-tux",
    },
  ];
  const items = [
    {
      number: "15",
      text: "Condiciones pendientes",
    },
    { number: "7", text: "Condiciones cerradas" },
  ];
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <HomePercentageCompleted percentage={95} />
      <HomeSubConSection numberOfActAndInc={items} />
      <HomeMenuItemContainer />
      <HomeWeeklyActivties activities={activities} numAct={23} />
    </SafeAreaView>
  );

  // import useAuth from "../hooks/useAuth";
  // const { auth, logout } = useAuth();
  //<Button text="Cerrar sesión"type="TouchableOpacity"onPress={() => {logout();}}/>
}
