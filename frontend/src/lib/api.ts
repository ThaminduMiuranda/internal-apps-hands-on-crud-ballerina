import axios from "./axiosInstance";
import { User } from "@/types/types";

export const getUsers = () => axios.get("/users");
export const getUserById = (id: number) => axios.get(`/users/${id}`);
export const createUser = (user: User) => axios.post(`/users`, user);
export const updateUser = (id: number) => axios.put(`/users/${id}`);
export const deleteUser = (id: number) => axios.delete(`/users/${id}`);
