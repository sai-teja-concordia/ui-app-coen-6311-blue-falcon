import { doGet, doPatch, doPost } from "./webUtils"

const baseUrl = "https://unified-server.herokuapp.com"
// const baseUrl = "http://localhost:8080"

export const getUserDetails = async (email) => {
    return await doGet(baseUrl + "/unified/v1/users?emailId="+ email)
}

export const updateUserDetails = async (body) => {
    console.log(`updating user details. body - ${JSON.stringify(body)}`);
    return await doPatch(baseUrl + "/unified/v1/users", body);
}

export const saveUserDetails = async (body) => {
    console.log(`saving user details. body - ${JSON.stringify(body)}`);
    return await doPost(baseUrl + "/unified/v1/users", body);
}
