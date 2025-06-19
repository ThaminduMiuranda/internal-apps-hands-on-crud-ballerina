import { getUsers, deleteUser } from "./api";

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
