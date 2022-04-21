import React, { useState, useEffect } from "react";
import { View } from "react-native";
// import SecAnnPlanYearPicker from "../components/SecAnnPlan/SecAnnPlanYearPicker";
import SecAnnPlanList from "../components/SecAnnPlan/SecAnnPlanList";
import SecAnnActualPlan from "../components/SecAnnPlan/SecAnnActualPlan";
import { themeColor } from "react-native-rapi-ui";
import { getAnnualPlan } from "../api/securityAnnualPlans";
import useAuth from "../hooks/useAuth";

export default function SecurityAnnualPlan() {
  const [annualPlans, setAnnualPlans] = useState([]);
  const [actualPlan, setActualPlan] = useState([]);
  const { auth } = useAuth();

  useEffect(() => {
    (async () => {
      await loadAnnualPLans();
    })();
  }, []);

  const loadAnnualPLans = async () => {
    try {
      const response = await getAnnualPlan(auth[0].headquarterId);
      setAnnualPlans(response);
      setActualPlan(response[0]);
      // console.log("lihlsdvjk", actualPlan["annualPlan"].name);
    } catch (error) {
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
      <SecAnnActualPlan
        secAnnPlanDetail={actualPlan}
        percentage={95}
        status="success600"
      />

      <SecAnnPlanList annualPlans={annualPlans} />
      <View
        style={{
          height: 1,
          backgroundColor: themeColor.gray100,
        }}
      />
    </>
  );
}
