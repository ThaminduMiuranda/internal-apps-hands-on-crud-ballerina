import axios from "./axiosInstance";

export const getUsers = () => axios.get("/users");
