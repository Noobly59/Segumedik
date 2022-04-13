import React, { useState } from "react";
import { View } from "react-native";
import { Button, themeColor, Picker } from "react-native-rapi-ui";
import ProccesActivitiesHeader from "../components/ProcessActivities/ProccesActivitiesHeader";
import ProcessActPendingList from "../components/ProcessActivities/ProcessActPendingList";
import ProcessActProcessedList from "../components/ProcessActivities/ProcessActProcessedList";

export default function SecAnnPlanProcessActivities() {
  const [pickerValue, setPickerValue] = useState("1");
  const items = [
    { label: "Actividades pendientes", value: "1" },
    { label: "Actividades procesadas", value: "2" },
  ];

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
      <View style={{ marginHorizontal: 7, marginVertical: 12, flex: 1 }}>
        <Picker
          items={items}
          value={pickerValue}
          placeholder="Actividades"
          onValueChange={(val) => setPickerValue(val)}
        />
      </View>

      <View style={{ flex: 20 }}>
        {pickerValue === "1" ? (
          <View style={{ flex: 1 }}>
            <ProccesActivitiesHeader />
            <ProcessActPendingList pendingActivities={pendingActivities} />
          </View>
        ) : (
          <View style={{ flex: 1 }}>
            <ProcessActProcessedList
              processedActivities={processedActivities}
            />
          </View>
        )}
      </View>

      <View
        style={{
          flex: 1,
          padding: 4,
          marginBottom: 50,
        }}
      >
        <View style={{ marginVertical: 3 }}>
          <Button
            text="Ver Reporte"
            type="TouchableOpacity"
            color={themeColor.gray300}
          />
        </View>
        <View style={{ marginVertical: 3 }}>
          <Button
            text="Enviar Reporte"
            type="TouchableOpacity"
            color={themeColor.success600}
          />
        </View>
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
