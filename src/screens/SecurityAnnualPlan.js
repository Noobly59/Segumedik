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
  const [plansIsEmpty, setPlansIsEmpty] = useState(false);

  const { auth } = useAuth();

  useEffect(() => {
    (async () => {
      await loadAnnualPlans();
    })();
  }, []);

  const loadAnnualPlans = async () => {
    try {
      const response = await getAnnualPlans(auth[0].headquarterId);
      response[0]
        ? (setActualPlan(response[0]),
          response.splice(0, 1),
          setAnnualPlans(response),
          setPlansIsEmpty(false))
        : setPlansIsEmpty(true);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

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
          {plansIsEmpty ? (
            <></>
          ) : (
            <SecAnnActualPlan
              secAnnPlanDetail={actualPlan}
              isLoading={loading}
            />
          )}
          <SecAnnPlanList annualPlans={annualPlans} isLoading={loading} />
          <View
            style={{
              height: 1,
              backgroundColor: COLORS.neutral,
            }}
          />
        </>
      ) : (
        <Text></Text>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  spinner: {
    marginVertical: 10,
  },
});
