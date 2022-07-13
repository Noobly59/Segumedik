import React, { useState, useEffect } from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";
import { Button, themeColor, Picker } from "react-native-rapi-ui";
import {
  getMonthAccidents,
  getPendingActivities,
  getProcessedActivities,
} from "../api/securityAnnualPlans";
import ProccesActivitiesHeader from "../components/ProcessActivities/ProccesActivitiesHeader";
import ProcessActPendingList from "../components/ProcessActivities/ProcessActPendingList";
import ProcessActProcessedList from "../components/ProcessActivities/ProcessActProcessedList";
import { COLORS } from "../utils/constants";
import useAuth from "../hooks/useAuth";
import AccidentActivity from "../components/ProcessActivities/AccidentActivity";

export default function SecAnnPlanProcessActivities(props) {
  const [pickerValue, setPickerValue] = useState("1");
  const [pendingActivities, setPendingActivities] = useState([]);
  const [processedActivities, setProcessedActivities] = useState([]);
  const [accidentsList, setAccidentsList] = useState([]);
  const [accidentsLostDays, setAccidentsLostDays] = useState(0);
  const [loading, setLoading] = useState(true);
  // const [refresh, setRefresh] = useState(0);

  const items = [
    { label: "Actividades pendientes", value: "1" },
    { label: "Actividades procesadas", value: "2" },
  ];

  const { auth } = useAuth();

  const {
    route: { params },
  } = props;
  useEffect(() => {
    setLoading(true);
    (async () => {
      await loadPendingAndProcessedActivities();
    })();
  }, [params.refresh]);

  const loadPendingAndProcessedActivities = async () => {
    try {
      const pending = await getPendingActivities(params.planId, params.month);
      const processed = await getProcessedActivities(params.reportId);
      const accidents = await getMonthAccidents(
        auth[0].headquarterId,
        params.planYear,
        params.month
      );
      setPendingActivities(pending.activities);
      setProcessedActivities(processed[0] ? processed : []);
      setAccidentsList(accidents.accidents);
      setAccidentsLostDays(accidents.lostDays);
      // console.log("accidentsList: ", accidentsList);
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
      <View style={{ marginHorizontal: 7, marginVertical: 12 }}>
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
                <ProccesActivitiesHeader
                  planId={params.planId}
                  // refresh={setRefresh}
                />
                {Array.isArray(accidentsList) && accidentsList.length > 0 ? (
                  <AccidentActivity
                    accidentsLength={accidentsList.length}
                    lostDays={accidentsLostDays}
                    accidents={accidentsList}
                    // refresh={setRefresh}
                  />
                ) : (
                  <></>
                )}
                <ProcessActPendingList
                  pendingActivities={pendingActivities}
                  reportId={params}
                  // refresh={setRefresh}
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

      {/* <View
        style={{
          padding: 4,
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
      </View> */}
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
