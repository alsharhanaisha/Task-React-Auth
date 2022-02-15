import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8003/api",
});

export default instance;
