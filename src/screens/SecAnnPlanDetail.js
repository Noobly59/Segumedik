import React from "react";
import SecAnnPlanDetHeader from "../components/SecAnnPlanDetail/SecAnnPlanDetHeader";
import SecAnnPlanDetPercentage from "../components/SecAnnPlanDetail/SecAnnPlanDetPercentage";
import SecAnnPlanDetList from "../components/SecAnnPlanDetail/SecAnnPlanDetList";

export default function SecAnnPlanDetail(props) {
  const {
    route: { params },
  } = props;
  console.log(params);
  return (
    <>
      <SecAnnPlanDetHeader
        title={params["annualPlan"]?.name}
        responsible={`${params["collaborator"]?.firstName} ${params["collaborator"]?.lastName}`}
        startDate={params["annualPlan"].startDate}
      />
      <SecAnnPlanDetPercentage percentage={59} />
      <SecAnnPlanDetList percentage={59} />
    </>
  );
}
