import { API_HOST } from "../utils/constants";

export async function getSubCons(hqId, endpointUrl) {
  try {
    const url = `${API_HOST}/api/SubstandardConditions/${hqId}`;
    // console.log(url);
    const response = await fetch(endpointUrl || url);
    const result = await response.json();
    return result;
  } catch (error) {
    throw error;
  }
}

export async function getSubConDetail(subConId) {
  try {
    const url = `${API_HOST}/api/SubstandardConditions/condition/${subConId}`;
    // console.log(url);
    const response = await fetch(url);
    const result = await response.json();
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
    return result;
  } catch (error) {
    throw error;
  }
}

export async function saveSubCondition(condition) {
  try {
    const url = `${API_HOST}/api/SubstandardConditions`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        Accept: "multipart/form-data",
        "Content-Type": "multipart/form-data",
      },
      body: condition,
    });
    const result = await response.json();
    // console.log(result);
    return result;
  } catch (error) {
    throw error;
  }
}

export async function editSubCondition(subConId, closing) {
  // console.log(closing);
  try {
    const url = `${API_HOST}/api/SubstandardConditions/Close/${subConId}`;
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        Accept: "multipart/form-data",
        "Content-Type": "multipart/form-data",
      },
      body: closing,
    });
    // console.log(response);
    const result = await response.json();
    console.log(result);
    return result;
  } catch (error) {
    throw error;
  }
}
