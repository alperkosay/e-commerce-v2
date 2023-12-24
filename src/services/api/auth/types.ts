
export enum Role {
    Admin = 'admin',
    User = 'user',
}

export interface User {
    id: number;
    attributes: {
        createdAt: Date; updatedAt: Date; publishedAt?: Date; username: string;
        password: string;
        blocked?: boolean;
        email: string;
        Role?: Role;
    };
}