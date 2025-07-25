"use client";

import Image from "next/image";
import Link from "next/link";

export default function UserCard(props: any) {
  const user = props.user;
  return (
    <>
      <div className="userCard text-[color:var(--text-1)] p-[3ch] rounded-xl w-full relative">
        <div className="flex justify-between">
          <h1 className="text-center text-[color:var(--text-3)] pb-[1ch]">
            <span className="font-bold">User </span>
            <span className="font-bold">{user.id}</span>
          </h1>
          <div className="flex gap-2">
            <Link href={`/edit/${user.id}`}>
              <Image
                src={"assets/images/editUser.svg"}
                alt="Edit User"
                width={24}
                height={24}
                className="w-6 h-6"
              />
            </Link>
            <Link href={"#"} onClick={() => props.onDelete(user.id)}>
              <Image
                src={"/assets/images/deleteUser.svg"}
                alt="Delete User"
                width={24}
                height={24}
                className="mouse-pointer"
              />
            </Link>
          </div>
        </div>
        <div className="">
          <p className="">
            <span className="text-[color:var(--accent-400)]">name: </span>
            {user.name}
          </p>
          <p className="">
            <span className="text-[color:var(--accent-400)]">email: </span>
            {user.email}
          </p>
          <p className="">
            <span className="text-[color:var(--accent-400)]">role: </span>
            {user.role}
          </p>
          <p className="">
            <span className="text-[color:var(--accent-400)]">phone: </span>
            {user.phone}
          </p>
        </div>
      </div>
    </>
  );
}
