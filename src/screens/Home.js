import React, { useEffect } from "react";
import { SafeAreaView } from "react-native";
import HomeMenuItemContainer from "../components/Home/HomeMenuItemContainer";
import HomePercentageCompleted from "../components/Home/HomePercentageCompleted";
import HomeSubConSection from "../components/Home/HomeSubConSection";
import HomeWeeklyActivties from "../components/Home/HomeWeeklyActivties";
import { getCompaniesAndHqName } from "../api/companiesAndHqs";
// import useAuth from "../hooks/useAuth";

export default function Home() {
  // const { auth } = useAuth();

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

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <HomePercentageCompleted percentage={59} />
      <HomeSubConSection />
      <HomeMenuItemContainer />
      <HomeWeeklyActivties activities={activities} numAct={23} />
    </SafeAreaView>
  );

  // import useAuth from "../hooks/useAuth";
  // const { auth, logout } = useAuth();
  //<Button text="Cerrar sesión"type="TouchableOpacity"onPress={() => {logout();}}/>
}
