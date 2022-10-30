import { doGet, doPost } from "./webUtils"

const baseUrl = "https://unified-server.herokuapp.com"

export const getUserDetails = async (email) => {
    return await doGet(baseUrl + "/unified/v1/users?emailId="+ email)
}

export const saveUserDetails = async (body) => {
    console.log(`saving user details body - ${JSON.stringify(body)}`);
    return await doPost(baseUrl + "/unified/v1/users", body);
}
