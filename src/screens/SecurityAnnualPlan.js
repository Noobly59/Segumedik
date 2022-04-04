import SecAnnPlanYearPicker from "../components/SecAnnPlan/SecAnnPlanYearPicker";
import SecAnnPlanList from "../components/SecAnnPlan/SecAnnPlanList";

export default function SecurityAnnualPlan() {
  const annualPlans = [
    "Cronograma de Actividades del Año 2022",
    "Cronograma de Actividades del Año 2022",
    "Cronograma de Actividades del Año 2022",
    "Cronograma de Actividades del Año 2022",
    "Cronograma de Actividades del Año 2022",
    "Cronograma de Actividades del Año 2022",
    "Cronograma de Actividades del Año 2022",
    "Cronograma de Actividades del Año 2022",
    "Cronograma de Actividades del Año 2022",
  ];
  return (
    <>
      <SecAnnPlanYearPicker />
      <SecAnnPlanList style={{ flex: 1 }} annualPlans={annualPlans} />
    </>
  );
}
