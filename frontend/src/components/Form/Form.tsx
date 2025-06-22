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
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex gap-4">
          <label htmlFor="name" className="w-24 p-1">
            Full Name:
          </label>
          <input
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Name"
            className="p-1  w-full border rounded-2xl"
          />
        </div>
        <div className="flex gap-4">
          <label htmlFor="email" className="w-24 p-1">
            Email:
          </label>
          <input
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            className="p-1 w-full  border rounded-2xl"
          />
        </div>
        <div className="flex gap-4">
          <label htmlFor="phone" className="w-24 p-1">
            Phone No:
          </label>
          <input
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Phone"
            className="p-1  w-full border rounded-2xl"
          />
        </div>
        <div className="flex gap-4">
          <label htmlFor="role" className="w-24 p-1">
            Role:
          </label>
          <input
            id="role"
            name="role"
            placeholder="admin, student, instructor"
            value={formData.role}
            onChange={handleChange}
            disabled={mode === "edit"}
            className="p-1 border rounded-2xl w-full"
          />
        </div>
        <button
          type="submit"
          className="bg-[color:var(--primary-800)] border-[color:var(--border-1)] text-[color:var(--text-1)] p-2 rounded-lg hover:bg-[color:var(--primary-900)] cursor-pointer"
          disabled={!isFormValid}
        >
          {mode === "edit" ? "Update User" : "Create User"}
        </button>
      </form>
    </>
  );
}
