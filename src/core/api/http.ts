import axios from "axios";
import { config } from "../config";

const http = axios.create({
  baseURL: config.SERVER_URL,
  withCredentials: true,
});

http.interceptors.request.use();

http.interceptors.response.use();

export { http };
