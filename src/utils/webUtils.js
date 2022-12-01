import axios from "axios";

export const doGet = async (url) => {
  let response = await axios.get(url);
  console.log(
    `GET api call - to url - ${url} \nRESPONSE ${JSON.stringify(response.data)}`
  );
  return response;
};

export const doPost = async (url, body) => {
  let response = await axios.post(url, body);
  console.log(
    `POST api call - to url - ${url} \nBODY - ${JSON.stringify(
      body
    )} \nRESPONSE ${JSON.stringify(response.data)}`
  );
  return response;
};

export const doPatch = async (url, body) => {
  let response = await axios.patch(url, body);
  console.log(
    `PATCH api call - to url - ${url} \nBODY - ${JSON.stringify(
      body
    )} \nRESPONSE ${JSON.stringify(response.data)}`
  );
  return response;
};

export const doPut = async (url, body) => {
  let response = await axios.put(url, body);
  console.log(
    `PUT api call - to url - ${url} \nBODY - ${JSON.stringify(
      body
    )} \nRESPONSE ${JSON.stringify(response.data)}`
  );
  return response;
};
