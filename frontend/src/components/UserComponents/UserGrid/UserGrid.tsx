"use client";

import { User } from "@/types/types";
import { useEffect, useState } from "react";
import Image from "next/image";
import UserCard from "../UserCard/UserCard";
import { fetchUsers, handleDelete } from "@/lib/apiService";
import Link from "next/link";
import CardWrapper from "../../CardComponents/CardWrapper/CardWrapper";

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
      <CardWrapper>
        <div className="flex justify-between">
          <h1 className="text-[color:var(--text-1)] text-[1.325rem] font-medium">
            All Users
          </h1>
          <Link href={"/add/"}>
            <Image
              src={"assets/images/addUser.svg"}
              alt="Add User"
              width={24}
              height={24}
            />
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-[3ch]">
          {users.map((user) => (
            <UserCard key={user.id} user={user} onDelete={onDelete} />
          ))}
        </div>
      </CardWrapper>
    </>
  );
}
