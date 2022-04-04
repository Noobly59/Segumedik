import React from "react";
import SecAnnPlanDetHeader from "../components/SecAnnPlanDetail/SecAnnPlanDetHeader";
import SecAnnPlanDetPercentage from "../components/SecAnnPlanDetail/SecAnnPlanDetPercentage";
import SecAnnPlanDetList from "../components/SecAnnPlanDetail/SecAnnPlanDetList";

export default function SecAnnPlanDetail() {
  return (
    <>
      <SecAnnPlanDetHeader />
      <SecAnnPlanDetPercentage percentage={74} />
      <SecAnnPlanDetList percentage={79} />
    </>
  );
}
