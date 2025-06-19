import { getUsers } from "@/lib/api";
import { User } from "@/types/types";
import { use } from "react";
import Image from "next/image";
import UserCard from "../Card/UserCard";

const fetchUsers = async () => {
  const res = await getUsers();
  if (res.status != 200) {
    // add error no users
  }
  return res.data;
};

export default function UserGrid() {
  const users = use<User[]>(fetchUsers());

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
            <UserCard key={user.id} user={user} />
          ))}
        </div>
      </div>
    </>
  );
}
