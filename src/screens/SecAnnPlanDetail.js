import React, { useState, useEffect } from "react";
import { ActivityIndicator, StyleSheet } from "react-native";
import SecAnnPlanDetHeader from "../components/SecAnnPlanDetail/SecAnnPlanDetHeader";
import SecAnnPlanDetPercentage from "../components/SecAnnPlanDetail/SecAnnPlanDetPercentage";
import SecAnnPlanDetList from "../components/SecAnnPlanDetail/SecAnnPlanDetList";
import useAuth from "../hooks/useAuth";
import { getReports } from "../api/securityAnnualPlans";
import { COLORS } from "../utils/constants";

export default function SecAnnPlanDetail(props) {
  const {
    route: { params },
  } = props;
  const { auth } = useAuth();
  // console.log(params);
  const [loading, setLoading] = useState(true);
  const [reports, setReports] = useState([]);
  const [compliancePercentage, setCompliancePercentage] = useState(0);
  // console.log(params["annualPlan"]?.id);

  useEffect(() => {
    (async () => {
      await loadMonthlyReports();
    })();
  }, []);

  const loadMonthlyReports = async () => {
    try {
      const response = await getReports(
        auth[0].userName,
        auth[0].headquarterId,
        // "21ace843-f020-4bb5-9b11-42a9e63307fb",
        params["annualPlan"]?.id,
        // "2021"
        params["annualPlan"]?.year
      );
      // console.log("asdasdasdasdasdf.,khjlcasnb", response.reports[0]);
      const reportsArray = [];
      for await (const report of response.reports) {
        reportsArray.push(report);
      }
      // console.log(response);
      setReports(reportsArray);
      setCompliancePercentage(response.compliancePercentage);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <SecAnnPlanDetHeader
        title={params["annualPlan"]?.name}
        responsible={`${params["collaborator"]?.firstName} ${params["collaborator"]?.lastName}`}
        startDate={params["annualPlan"].startDate}
      />
      <SecAnnPlanDetPercentage percentage={compliancePercentage} />
      {loading ? (
        <ActivityIndicator
          size="large"
          style={styles.spinner}
          color={COLORS.primary}
        />
      ) : (
        <SecAnnPlanDetList
          planId={params["annualPlan"]?.id}
          monthlyReports={reports}
        />
        // <></>
      )}
    </>
  );
}
const styles = StyleSheet.create({
  spinner: {
    marginVertical: 10,
  },
});
