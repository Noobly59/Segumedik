import { API_HOST } from "../utils/constants";

export async function getUser(username) {
  try {
    const url = `${API_HOST}/api/AuthUsers/${username}`;
    const response = await fetch(url);
    const result = await response.json();
    return result;
  } catch (error) {
    throw error;
  }
}

// export async function sendUserCredentials() {
//   try {
//     const url = `${API_HOST}/api/values`;
//     const response = await fetch(url, {
//       method: "POST",
//       headers: {},
//       body: JSON.stringify({
//         a: "",
//         b: "",
//         c: "",
//       }),
//     });
//   } catch (error) {
//     throw error;
//   }
// }

// export async function requestToken() {
//   try {
//     const url = `https://dev-0dqb9jxu.us.auth0.com/oauth/token`;
//     const response = await fetch(url, {
//       method: "POST",
//       header: {
//         Accept: "application/json",
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         grant_type: "authorization_code",
//         client_id: "nCCfw8vlXRf7l5xeWXk2t0BJKtwMaJMy",
//         code_verifier: "Jg7u3kD6SzWGN_1x8X2KlEfNE2Rq7-sUI_PAN01k-TQ",
//         code: "Pwh0QXxV5MCFP5zWtVDalTvDpQuPsxKMSXZyKf2Fmv7W8",
//         redirect_uri: "https://auth.expo.io/@diego599521/login",
//       }),
//     });
//     const result = await response.json();
//     return result;
//   } catch (error) {
//     throw error;
//   }
// }
