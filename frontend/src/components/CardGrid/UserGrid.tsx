"use client";

import { User } from "@/types/types";
import { useEffect, useState } from "react";
import Image from "next/image";
import UserCard from "../Card/UserCard";
import { fetchUsers, handleDelete } from "@/lib/apiService";

export default function UserGrid() {
  const [users, setUsers] = useState<User[]>([]);

  const loadUsers = async () => {
    const response = await fetchUsers();
    setUsers(response);
  };

  const onDelete = async (id: number) => {
    await handleDelete(id);
    await loadUsers();
  };

  useEffect(() => {
    loadUsers();
  }, []);

  useEffect(() => {
    console.log("Users updated:", users);
  }, [users]);

  return (
    <>
      <div className="userGrid rounded-2xl relative backdrop-blur-md p-[3ch] flex flex-col gap-[3ch] ">
        <div className="flex justify-between">
          <h1 className="text-[color:var(--text-1)] text-[1.325rem] font-medium">
            All Users
          </h1>
          <Image
            src={"assets/images/addUser.svg"}
            alt="Add User"
            width={24}
            height={24}
          />
        </div>
        <div className="grid grid-cols-2 gap-[3ch]">
          {users.map((user) => (
            <UserCard key={user.id} user={user} onDelete={onDelete} />
          ))}
        </div>
      </div>
    </>
  );
}
