import { API_HOST } from "../utils/constants";

export async function getCompaniesByUser(username) {
  try {
    const url = `${API_HOST}/api/usersinfo/${username}`;
    const response = await fetch(url);
    const result = await response.json();
    // console.log(result);
    return result;
  } catch (error) {
    throw error;
  }
}
export async function getHqByCompany(companyId) {
  try {
    const url = `${API_HOST}/api/usersinfo/hq/${companyId}`;
    const response = await fetch(url);
    // console.log(`${response.json()}`);
    const result = await response.json();
    return result;
  } catch (error) {
    throw error;
  }
}

export async function getCompaniesAndHqName(companyId, hqId) {
  try {
    const url = `${API_HOST}/api/usersinfo/companyName/${companyId}/hqName/${hqId}`;
    const response = await fetch(url);
    const result = await response.json();
    return result;
  } catch (error) {
    throw error;
  }
}
