import { doGet, doPatch, doPost, doPut } from "./webUtils";

const baseUrl = "https://unified-server.herokuapp.com";
// const baseUrl = "http://localhost:8080"

export const getUserDetails = async (email) => {
  return await doGet(baseUrl + "/unified/v1/users?emailId=" + email);
};

export const getNearByUsers = async (country) => {
  return await doGet(baseUrl + "/unified/v1/users/near-me?location=" + country);
};

export const actionFriendRequest = async (body) => {
  // console.log(body);
  return await doPatch(baseUrl + "/unified/v1/users/friends", body);
};

export const sendFriendRequest = async (body) => {
  // console.log(body);
  return await doPost(baseUrl + "/unified/v1/users/friends", body);
};

export const getUserByName = async (name) => {
  return await doGet(baseUrl + "/unified/v1/users/search?query=" + name);
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
export const saveUserNews = async (body) => {
  console.log(`saving user news. body - ${JSON.stringify(body)}`);
  return await doPut(baseUrl + "/unified/v1/users/news-list", body);
};

export const getUserMessages = async (userId) => {
  return await doGet(baseUrl + "/unified/v1/messages?userId=" + userId);
};

export const sendMessageToUser = async (body) => {
  return await doPost(baseUrl + "/unified/v1/messages/send", body);
};
