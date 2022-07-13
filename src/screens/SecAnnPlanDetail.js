import React, { useState, useEffect } from "react";
import { ActivityIndicator, StyleSheet } from "react-native";
import SecAnnPlanDetHeader from "../components/SecAnnPlanDetail/SecAnnPlanDetHeader";
import SecAnnPlanDetPercentage from "../components/SecAnnPlanDetail/SecAnnPlanDetPercentage";
import SecAnnPlanDetList from "../components/SecAnnPlanDetail/SecAnnPlanDetList";
import { getReports } from "../api/securityAnnualPlans";
import { COLORS } from "../utils/constants";

export default function SecAnnPlanDetail(props) {
  const {
    route: { params },
  } = props;
  const [loading, setLoading] = useState(true);
  const [reports, setReports] = useState([]);
  const [compliancePercentage, setCompliancePercentage] = useState(0);

  useEffect(() => {
    (async () => {
      await loadMonthlyReports();
    })();
  }, []);

  const loadMonthlyReports = async () => {
    try {
      // "21ace843-f020-4bb5-9b11-42a9e63307fb",
      const response = await getReports(params["annualPlan"]?.id);
      // console.log("asdasdasdasdasdf.,khjlcasnb", response.reports[0]);
      const reportsArray = [];
      for await (const report of response.reports) {
        reportsArray.push(report);
      }
      setReports(reportsArray);
      // console.log(reportsArray);
      setCompliancePercentage(response.compliancePercentage);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <SecAnnPlanDetHeader
        title={
          params["annualPlan"]?.name != ""
            ? params["annualPlan"]?.name
            : `Cronograma de actividades ${params["annualPlan"]?.year}`
        }
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
          planYear={params["annualPlan"]?.year}
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
