import React, { useState, useEffect } from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";
import { Button, themeColor, Picker } from "react-native-rapi-ui";
import {
  getPendingActivities,
  getProcessedActivities,
} from "../api/securityAnnualPlans";
import ProccesActivitiesHeader from "../components/ProcessActivities/ProccesActivitiesHeader";
import ProcessActPendingList from "../components/ProcessActivities/ProcessActPendingList";
import ProcessActProcessedList from "../components/ProcessActivities/ProcessActProcessedList";
import { COLORS } from "../utils/constants";

export default function SecAnnPlanProcessActivities(props) {
  const [pickerValue, setPickerValue] = useState("1");
  const [pendingActivities, setPendingActivities] = useState([]);
  const [processedActivities, setProcessedActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const items = [
    { label: "Actividades pendientes", value: "1" },
    { label: "Actividades procesadas", value: "2" },
  ];
  const {
    route: { params },
  } = props;
  useEffect(() => {
    (async () => {
      await loadPendingAndProcessedActivities();
    })();
  }, []);
  const loadPendingAndProcessedActivities = async () => {
    try {
      const pending = await getPendingActivities(
        params.planId,
        params.month,
        params.reportId
      );
      const processed = await getProcessedActivities(params.reportId);
      setPendingActivities(pending[0] ? pending : []);
      setProcessedActivities(processed[0] ? processed : []);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
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
            {loading ? (
              <ActivityIndicator
                size="large"
                style={styles.spinner}
                color={COLORS.primary}
              />
            ) : (
              <>
                <ProccesActivitiesHeader />
                <ProcessActPendingList
                  pendingActivities={pendingActivities}
                  reportId={params.reportId}
                />
              </>
            )}
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
            color={COLORS.neutral}
          />
        </View>
        <View style={{ marginVertical: 3 }}>
          <Button
            text="Enviar Reporte"
            type="TouchableOpacity"
            color={COLORS.success}
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

const styles = StyleSheet.create({
  spinner: {
    marginVertical: 10,
  },
});
