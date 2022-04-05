import React from "react";
import { View } from "react-native";
import { Button, themeColor } from "react-native-rapi-ui";
import ProccesActivitiesHeader from "../components/ProcessActivities/ProccesActivitiesHeader";
import ProcessActPendingList from "../components/ProcessActivities/ProcessActPendingList";
import ProcessActProcessedList from "../components/ProcessActivities/ProcessActProcessedList";

export default function SecAnnPlanProcessActivities() {
  const pendingActivities = [
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
  const processedActivities = [
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
    <View
      style={{
        flex: 1,
        flexDirection: "column",
      }}
    >
      <View style={{ flex: 4 }}>
        <ProccesActivitiesHeader />
        <ProcessActPendingList pendingActivities={pendingActivities} />
      </View>
      <View style={{ flex: 4 }}>
        <ProcessActProcessedList processedActivities={processedActivities} />
      </View>
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          justifyContent: "space-between",
          padding: 4,
        }}
      >
        <Button
          text="Ver Reporte"
          type="TouchableOpacity"
          color={themeColor.primary600}
        />
        <Button
          text="Enviar Reporte"
          type="TouchableOpacity"
          color={themeColor.primary600}
        />
      </View>
      {/* <ProccesActivitiesHeader style={{ height: "10%" }} />
      <ProcessActPendingList
        style={{ height: "45%" }}
        pendingActivities={pendingActivities}
      />
      <ProcessActProcessedList
        style={{ height: "45%" }}
        processedActivities={processedActivities}
      /> */}
    </View>
  );
}
