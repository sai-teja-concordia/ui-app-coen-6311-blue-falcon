import { doGet, doPost } from "./webUtils"

const baseUrl = "http://3.83.104.158:8080"


export const getUserDetails = async (email) => {
    return await doGet(baseUrl + "/unified/v1/users?emailId="+ email)
}

export const saveUserDetails = async (body) => {
    console.log("saveing details");
    console.log("body",body)
    return await doPost(baseUrl + "/unified/v1/users", body);
}
