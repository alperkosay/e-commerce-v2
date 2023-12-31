import { Role } from '@/services/api/auth/types';
import NextAuth, { DefaultSession } from 'next-auth';
import { DefaultJWT } from 'next-auth/jwt';

declare module 'next-auth' {
    interface Session {
        user: {
            role: Role;
            id: string | number
        } & DefaultSession['user'];
    }
    export interface User extends DefaultUser {
        role: Role
        id: string | number
    }

}

declare module 'next-auth/jwt' {
    export interface JWT extends DefaultJWT {
        role: Role
        id: string | number
    }
}