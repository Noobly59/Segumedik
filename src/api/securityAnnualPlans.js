import { API_HOST } from "../utils/constants";

export async function getAnnualPlans(hqId) {
  try {
    const url = `${API_HOST}/api/AnnualPlans/${hqId}`;
    const response = await fetch(url);
    const result = await response.json();
    // console.log(result);
    return result;
  } catch (error) {
    throw error;
  }
}

export async function getReports(username, hqId, annualPlanId, year) {
  try {
    const url = `${API_HOST}/api/AnnualPlans/${username}/${hqId}/Plan/${annualPlanId}/PlanYear/${year}`;
    const response = await fetch(url);
    // console.log(response);
    const result = await response.json();
    // console.log(result);
    return result;
  } catch (error) {
    throw error;
  }
}

export async function getPendingActivities(annualPlanId, month, reportId) {
  try {
    const url = `${API_HOST}/api/AnnualPlans/PendingActivities/${annualPlanId}/Month/${month}/Id/${reportId}`;
    const response = await fetch(url);
    const result = await response.json();
    return result;
  } catch (error) {
    throw error;
  }
}

export async function getProcessedActivities(reportId) {
  try {
    const url = `${API_HOST}/api/AnnualPlans/ProcessedActivities/${reportId}`;
    const response = await fetch(url);
    const result = await response.json();
    return result;
  } catch (error) {
    throw error;
  }
}

export async function getCompliancePercentage(hqId) {
  try {
    const url = `${API_HOST}/api/AnnualPlans/Compliance/${hqId}`;
    const response = await fetch(url);
    const result = await response.json();
    return result;
  } catch (error) {
    throw error;
  }
}

export async function getMonthActivities(hqId) {
  try {
    const url = `${API_HOST}/api/AnnualPlans/MonthActivities/${hqId}`;
    const response = await fetch(url);
    const result = await response.json();
    return result;
  } catch (error) {
    throw error;
  }
}

export async function getPlanCompliance(planId) {
  try {
    const url = `${API_HOST}/api/AnnualPlans/Plan/Compliance/${planId}`;
    const response = await fetch(url);
    const result = await response.json();
    return result;
  } catch (error) {
    throw error;
  }
}
