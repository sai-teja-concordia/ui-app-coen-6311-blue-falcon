// {baseUrl}/unified/v1/news/trending?country={canada}
import { doGet, doPatch, doPost } from "./webUtils";

const baseUrl = "https://unified-server.herokuapp.com";
// const baseUrl = "http://localhost:8080"

export const getTrendingnews = async (country) => {
  return await doGet(baseUrl + "/unified/v1/news/trending?country=" + country);
};
