import { API_HOST } from "../utils/constants";

export async function getSubCons(hqId, endpointUrl) {
  try {
    const url = `${API_HOST}/api/SubstandardConditions/${hqId}`;
    const response = await fetch(endpointUrl || url);
    const result = await response.json();
    // console.log(result);
    return result;
  } catch (error) {
    throw error;
  }
}

export async function getDetectedAndClosedCounters(hqId) {
  try {
    const url = `${API_HOST}/api/SubstandardConditions/Counters/${hqId}`;
    const response = await fetch(url);
    const result = await response.json();
    console.log(result);
    return result;
  } catch (error) {
    throw error;
  }
}

// export async function getConditionDetail(conditionId) {
//   try {
//     const url = `${API_HOST}/api/SubstandardConditions/condition/${conditionId}`;
//     const response = await fetch(url);
//     const result = await response.json();
//     console.log("sadas", result);
//     return result;
//   } catch (error) {
//     throw error;
//   }
// }
