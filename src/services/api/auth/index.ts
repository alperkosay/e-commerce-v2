import { fetcher } from "@/lib/utils";
import { ApiService } from "../core";
import { User } from "./types";
import QueryString from "qs";
import { SignIn, SignUp } from "@/lib/validations/auth";

class AuthService extends ApiService<User>{

    async findByCredentials(credentials: SignIn) {
        const query = QueryString.stringify({
            filters: {
                username: {
                    $eq: credentials.username
                },
                password: {
                    $eq: credentials.password
                }
            }
        }, {
            encodeValuesOnly: true,
        })

        const { data, error } = await fetcher<User[]>(`${this.endpoint.plural}?${query}`, {
            method: "GET",
            headers: {
                'Authorization': `bearer ${process.env.AUTH_STRAPI_TOKEN}`
            },
        })
        return data[0]
    }
    async createUser(credentials: SignUp) {
        const { data, error } = await fetcher<User>(`${this.endpoint.plural}`, {
            method: "POST",
            headers: {
                'Authorization': `bearer ${process.env.AUTH_STRAPI_TOKEN}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ data: credentials })
        });

        if (error) return null
        return data;
    }

    async findUserByName(username: string) {
        const qs = QueryString.stringify({
            filters: {
                username: {
                    $eq: username
                }
            }
        }, {
            encodeValuesOnly: true
        })

        const { data, error } = await fetcher<User[]>(`${this.endpoint.plural}?${qs}`, {
            method: "GET",
            headers: {
                'Authorization': `bearer ${process.env.AUTH_STRAPI_TOKEN}`,
                'Content-Type': 'application/json',
            },
        });
        return data[0];
    }
}

const service = new AuthService({
    singular: "/commerce-user",
    plural: "/commerce-users"
})

export default service