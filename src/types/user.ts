import { Media } from "./media";

export enum Role {
  Admin = "admin",
  User = "user",
}

export interface CommerceUser {
  id: number;
  attributes: {
    createdAt: Date;
    updatedAt: Date;
    publishedAt?: Date;
    username: string;
    blocked?: boolean;
    email: string;
    Role?: Role;
    password: string;
    name?: string;
    surname?: string;
    profilePicture?: { data: Media };
    phone?: string;
  };
}
