"use client";

import { User } from "@/types/types";
import { FormEvent, useEffect, useState } from "react";
import Image from "next/image";
import UserCard from "../UserCard/UserCard";
import { fetchUsers, handleDelete } from "@/lib/apiService";
import Link from "next/link";
import CardWrapper from "../../CardComponents/CardWrapper/CardWrapper";
import { search } from "@/lib/api";

export default function UserGrid() {
  const [users, setUsers] = useState<User[]>([]);
  const [name, setName] = useState("");
  const [role, setRole] = useState("");

  const loadUsers = async () => {
    const response = await fetchUsers();
    setUsers(response);
  };

  const handleSearch = async (e: FormEvent) => {
    e.preventDefault();
    const response = await search(name, role);
    setUsers(response.data);
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
          <form onSubmit={handleSearch} className="flex gap-2">
            <input
              type="text"
              placeholder="Search by name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="p-1 border rounded-2xl"
            />
            <input
              type="text"
              placeholder="Search by role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="p-1 border rounded-2xl"
            />
            <button
              type="submit"
              className="bg-[color:var(--primary-800)] border-[color:var(--border-1)] text-[color:var(--text-1)] px-3 py-1 rounded-2xl cursor-pointer hover:bg-[color:var(--primary-900)]"
            >
              Search
            </button>
            <button
              type="button"
              onClick={loadUsers}
              className="bg-[color:var(--primary-600)] text-[color:var(--text-2)] px-3 py-1 border-[color:var(--border-2)] rounded-2xl cursor-pointer hover:bg-[color:var(--primary-500)]"
            >
              Reset
            </button>
          </form>
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
