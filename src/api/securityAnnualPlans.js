import { API_HOST } from "../utils/constants";

export async function getAnnualPlan(hqId) {
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
