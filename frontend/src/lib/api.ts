import axios from "./axiosInstance";
import { NewUser } from "@/types/types";

export const getUsers = () => axios.get("/users");
export const getUserById = (id: number) => axios.get(`/users/${id}`);
export const createUser = (user: NewUser) => axios.post(`/users`, user);
export const updateUser = (id: number, user: NewUser) =>
  axios.put(`/users/${id}`, user);
export const deleteUser = (id: number) => axios.delete(`/users/${id}`);
export const search = (name: string, role: string) =>
  axios.get(`users/user?name=${name}&role=${role}`);
