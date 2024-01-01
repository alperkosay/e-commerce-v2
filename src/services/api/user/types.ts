import { Media } from "../types";

export enum Role {
    Admin = 'admin',
    User = 'user',
}

export interface User {
    id: number;
    attributes: {
        createdAt: Date; updatedAt: Date; publishedAt?: Date; username: string;
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