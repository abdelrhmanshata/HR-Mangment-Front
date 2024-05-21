import axios from "axios";
const client = axios.create({
  baseURL: "http://127.0.0.1:9000/", // Replace this with your API's base URL
});
export default client;

