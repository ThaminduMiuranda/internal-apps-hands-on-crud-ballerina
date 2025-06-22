"use client";
import { useParams } from "next/navigation";
import CardWrapper from "@/components/CardComponents/CardWrapper/CardWrapper";
import Form from "@/components/Form/Form";
import { useEffect, useState } from "react";
import { getUserById } from "@/lib/api";
import { User } from "@/types/types";

export default function Edit() {
  const { id } = useParams();
  const [user, setUser] = useState<User>();

  useEffect(() => {
    (async () => {
      const res = await getUserById(Number(id));
      setUser(res.data);
    })();
  }, [id]);
  if (!user) {
    return <p>Loading...</p>;
  }
  return (
    <>
      <div className="">
        <h1 className="text-center text-[color:var(--text-1)] text-[1.325rem] font-medium pb-[3ch]">
          Learning Portal - Edit User
        </h1>
        <CardWrapper>
          <div className="">
            <Form mode="edit" initialData={user} />
          </div>
        </CardWrapper>
      </div>
    </>
  );
}
