import { ReactNode } from "react";

export type CardWrapperProps = {
  children: ReactNode;
};
export interface User {
  readonly id: number;
  name: string;
  email: string;
  role: string;
  phone: string;
}

export interface NewUser {
  name: string;
  email: string;
  role: string;
  phone: string;
}

export interface UpdatedUser {
  name?: string;
  email?: string;
  role?: string;
  phone?: string;
}
