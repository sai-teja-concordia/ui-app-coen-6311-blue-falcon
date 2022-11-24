import { doGet, doPatch, doPost } from "./webUtils";

const baseUrl = "https://unified-server.herokuapp.com";
// const baseUrl = "http://localhost:8080"

export const getUserDetails = async (email) => {
  return await doGet(baseUrl + "/unified/v1/users?emailId=" + email);
};

export const getUserById = async (id) => {
  return await doGet(baseUrl + "/unified/v1/users/" + id);
};

export const updateUserDetails = async (body) => {
  console.log(`updating user details. body - ${JSON.stringify(body)}`);
  return await doPatch(baseUrl + "/unified/v1/users", body);
};

export const saveUserDetails = async (body) => {
  console.log(`saving user details. body - ${JSON.stringify(body)}`);
  return await doPost(baseUrl + "/unified/v1/users", body);
};
export const getUsertrendingnews = async (country) => {
  return await doGet(
    baseUrl + "/unified/v1/news/trending?country={canada}" + country
  );
};
export const getUserSocial = async (userId) => {
  return await doGet(baseUrl + "/unified/v1/users/social?userId=" + userId);
};
