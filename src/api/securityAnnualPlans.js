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

export async function getReports(annualPlanId) {
  try {
    const url = `${API_HOST}/api/AnnualPlans/Plan/${annualPlanId}`;
    const response = await fetch(url);
    // console.log(response);
    const result = await response.json();
    // console.log(result);
    return result;
  } catch (error) {
    throw error;
  }
}

export async function getPendingActivities(annualPlanId, month) {
  try {
    const url = `${API_HOST}/api/AnnualPlans/PendingActivities/${annualPlanId}/Month/${month}`;
    // console.log(url);
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

export async function completeActivity(activity, username) {
  try {
    const url = `${API_HOST}/api/AnnualPlans/${username}/Activity/`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        Accept: "multipart/form-data",
        "Content-Type": "multipart/form-data",
      },
      body: activity,
    });
    const result = await response.json();
    console.log(result);
    return result;
  } catch (error) {
    throw error;
  }
}

export async function getActivities(endpointUrl) {
  try {
    const url = `${API_HOST}/api/AnnualPlans/Activities/`;
    const response = await fetch(endpointUrl || url);
    const result = await response.json();
    return result;
  } catch (error) {
    throw error;
  }
}

export async function getMonthAccidents(hqId, year, month) {
  try {
    const url = `${API_HOST}/api/AnnualPLans/${hqId}/Accidents/${year}/${month}`;
    const response = await fetch(url);
    const result = await response.json();
    return result;
  } catch (error) {
    throw error;
  }
}

export async function addAccidents(processAccidentActivity) {
  try {
    const url = `${API_HOST}/api/AnnualPLans/CreateSecurityReportAccidents`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(processAccidentActivity),
    });
    console.log(processAccidentActivity);
    const result = await response.json();
    return result;
  } catch (error) {
    throw error;
  }
}

export async function addUnplannedPlanActivity(activity) {
  try {
    console.log(activity);
    const url = `${API_HOST}/api/AnnualPlans/ScheduleActivity/`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(activity),
    });
    const result = await response.json();
    // console.log(result);
    return result;
  } catch (error) {
    throw error;
  }
}

export async function createReport(report) {
  try {
    const url = `${API_HOST}/api/AnnualPlans/CreateReport/`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(report),
    });
    const result = await response.json();
    return result;
  } catch (error) {
    throw error;
  }
}

export async function cancelReportActivity(planActivityId, securityReportId) {
  try {
    const url = `${API_HOST}/api/AnnualPlans/${planActivityId}/CancelActivity/${securityReportId}`;
    const response = await fetch(url, {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },
      body: {},
    });
    const result = await response.json();
    return result;
  } catch (error) {
    throw error;
  }
}

export async function reschedulePlanActivity(
  planActivityId,
  securityReportId,
  rescheduleActivity
) {
  try {
    const url = `${API_HOST}/api/AnnualPlans/${planActivityId}/RescheduleActivity/${securityReportId}`;
    console.log(url);
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(rescheduleActivity),
    });
    const result = await response.json();
    return result;
  } catch (error) {
    throw error;
  }
}
