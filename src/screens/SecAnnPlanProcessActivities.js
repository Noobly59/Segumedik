import React from "react";
import { View } from "react-native";
import { Button, themeColor } from "react-native-rapi-ui";
import ProccesActivitiesHeader from "../components/ProcessActivities/ProccesActivitiesHeader";
import ProcessActPendingList from "../components/ProcessActivities/ProcessActPendingList";
import ProcessActProcessedList from "../components/ProcessActivities/ProcessActProcessedList";

export default function SecAnnPlanProcessActivities() {
  const pendingActivities = [
    "Mapa de evacuacion elaboracion-publicacion. 01/01/2022",
    "Mapa de riesgos elaboracion-publicacion. 01/01/2022",
    "Charlas de seguridad y medio ambiente. 01/01/2022",
    "Simulacro de evacuacion. 01/01/2022",
    "Factores de riesgos (mecánico, físico, quimico, biologico, psicosocial, ergonomico). 01/01/2022",
    "Índice de Capacitaciones (Entrenamientos) 01/01/2022",
  ];
  const processedActivities = [
    "Mapa de evacuacion elaboracion-publicacion. 01/01/2022",
    "Mapa de riesgos elaboracion-publicacion. 01/01/2022",
    "Charlas de seguridad y medio ambiente. 01/01/2022",
    "Simulacro de evacuacion. 01/01/2022",
    "Factores de riesgos (mecánico, físico, quimico, biologico, psicosocial, ergonomico). 01/01/2022",
    "Índice de Capacitaciones (Entrenamientos) 01/01/2022",
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
