import React, { useState, useEffect } from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";
// import SecAnnPlanYearPicker from "../components/SecAnnPlan/SecAnnPlanYearPicker";
import SecAnnPlanList from "../components/SecAnnPlan/SecAnnPlanList";
import SecAnnActualPlan from "../components/SecAnnPlan/SecAnnActualPlan";
import { themeColor, Text } from "react-native-rapi-ui";
import { getAnnualPlans } from "../api/securityAnnualPlans";
import useAuth from "../hooks/useAuth";
import { COLORS } from "../utils/constants";

export default function SecurityAnnualPlan() {
  const [annualPlans, setAnnualPlans] = useState([]);
  const [actualPlan, setActualPlan] = useState([]);
  const [loading, setLoading] = useState(true);

  const { auth } = useAuth();

  useEffect(() => {
    (async () => {
      await loadAnnualPlans();
    })();
  }, []);

  const loadAnnualPlans = async () => {
    try {
      const response = await getAnnualPlans(auth[0].headquarterId);
      setAnnualPlans(response);
      setActualPlan(response[0]);
      setLoading(false);
      // console.log("lihlsdvjk", actualPlan["annualPlan"].name);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  // const annualPlans = [
  //   {
  //     title: "Cronograma de Actividades del Año 2021",
  //     id: "0",
  //   },
  //   {
  //     title: "Cronograma de Actividades del Año 2020",
  //     id: "1",
  //   },
  //   {
  //     title: "Cronograma de Actividades del Año 2019",
  //     id: "2",
  //   },
  //   {
  //     title: "Cronograma de Actividades del Año 2018",
  //     id: "3",
  //   },
  //   {
  //     title: "Cronograma de Actividades del Año 2017",
  //     id: "4",
  //   },
  // ];
  // const actualPlan = ["Cronograma de Actividades del Año 2022"];
  return (
    <>
      {/* <SecAnnPlanYearPicker /> */}
      {loading ? (
        <ActivityIndicator
          size="large"
          style={styles.spinner}
          color={COLORS.primary}
        />
      ) : typeof actualPlan !== "undefined" ? (
        <>
          <SecAnnActualPlan
            secAnnPlanDetail={actualPlan}
            percentage={95}
            status="success"
            isLoading={loading}
          />
          <SecAnnPlanList annualPlans={annualPlans} isLoading={loading} />
          <View
            style={{
              height: 1,
              backgroundColor: COLORS.neutral,
            }}
          />
        </>
      ) : (
        <Text>asdasdasd</Text>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  spinner: {
    marginVertical: 10,
  },
});
