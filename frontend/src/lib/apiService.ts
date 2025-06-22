import { stringify } from "querystring";
import { getUsers, deleteUser, createUser } from "./api";

export const fetchUsers = async () => {
  const res = await getUsers();
  if (res.status != 200) {
    // add error no users
  }
  return res.data;
};

export const handleDelete = async (id: number) => {
  await deleteUser(id);
  fetchUsers();
};

export const handleCreate = async (
  name: string,
  email: string,
  role: string,
  phone: string
) => {
  await createUser({
    name,
    email,
    role,
    phone,
  });
};
