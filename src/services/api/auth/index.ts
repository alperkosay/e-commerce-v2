import { Payload, fetcher } from "@/lib/utils";
import { ApiService } from "../core";
import { User } from "./types";
import QueryString from "qs";
import { SignIn, SignUp } from "@/lib/validations/auth";

class AuthService extends ApiService<User>{
    private bearerToken = process.env.AUTH_STRAPI_TOKEN!
    async findById(id: number | string): Promise<Payload<User>> {
        const qs = QueryString.stringify({
            // populate: "*",

        })
        return await fetcher(`${this.endpoint.plural}/${id}?${qs}`, {
            method: "GET",
            headers: {
                'Authorization': `bearer ${this.bearerToken}`
            }
        })
    }
    async findByCredentials(credentials: SignIn) {
        const query = QueryString.stringify({
            filters: {
                username: {
                    $eq: credentials.username
                },
                password: {
                    $eq: credentials.password
                }
            },
            populate: "*"
        }, {
            encodeValuesOnly: true,
        })

        const { data, error } = await fetcher<User[]>(`${this.endpoint.plural}?${query}`, {
            method: "GET",
            headers: {
                'Authorization': `bearer ${this.bearerToken}`
            },
        })
        return data[0]
    }
    async createUser(credentials: SignUp) {
        const { data, error } = await fetcher<User>(`${this.endpoint.plural}`, {
            method: "POST",
            headers: {
                'Authorization': `bearer ${this.bearerToken}`,
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
            },
            populate: "*"
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

    async updateProfilePicture(userID: number | string, newPicture: string | Blob) {
        const userData = await this.findById(userID)

        const formData = new FormData();
        formData.append('files.profilePicture', newPicture)
        formData.append('data', JSON.stringify(userData.data.attributes))

        const qs = QueryString.stringify({
            populate: "*"
        })

        return fetcher<User>(`${this.endpoint.plural}/${userID}?${qs}`, {
            method: "PUT",
            headers: {
                'Authorization': `bearer ${this.bearerToken}`,
            },
            body: formData
        })
    }
}

const service = new AuthService({
    singular: "/commerce-user",
    plural: "/commerce-users"
})

export default service