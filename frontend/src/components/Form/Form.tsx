"use client";

import { createUser, updateUser } from "@/lib/api";
import { NewUser, User } from "@/types/types";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";

export default function Form({
  role,
  initialData,
  mode = "add",
}: {
  role?: string;
  initialData?: User;
  mode?: "add" | "edit";
}) {
  const [formData, setFormData] = useState<NewUser>({
    name: "",
    email: "",
    role: role || "",
    phone: "",
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name,
        email: initialData.email,
        role: initialData.role,
        phone: initialData.phone,
      });
    }
  }, [initialData]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const isFormValid =
    formData.name.trim() !== "" &&
    formData.email.trim() !== "" &&
    formData.phone.trim() !== "" &&
    formData.role.trim() !== "";

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      if (mode === "edit" && initialData?.id) {
        await updateUser(initialData.id, formData);
        alert("User updated!");
      } else {
        await createUser(formData);
        alert("User created!");
      }
    } catch (error) {
      console.error(error);
      alert("Failed to submit form");
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Name"
        />
        <input
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
        />
        <input
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="Phone"
        />
        <input name="role" value={formData.role} disabled />
        <button
          type="submit"
          className="bg-[color:var(--surface-3)] border-[color:var(--border-1)] text-[color:var(--text-1)] px-3 py-1 rounded-2xl"
          disabled={!isFormValid}
        >
          {mode === "edit" ? "Update User" : "Create User"}
        </button>
      </form>
    </>
  );
}
