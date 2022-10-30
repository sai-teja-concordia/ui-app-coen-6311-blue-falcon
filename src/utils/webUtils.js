import axios from "axios";

export const  doGet = async (url) =>  {
    return await axios.get(url)
}


export const  doPost = async (url, body) =>  {
    let response = await axios.post(url, body)
    console.log(response)
    return response;
    
}