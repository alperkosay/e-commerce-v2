import { fetcher } from "@/lib/utils";
import { ApiService } from "../core";
import { User } from "./types";
import QueryString from "qs";

class AuthService extends ApiService<User>{

    async findByCredentials(credentials: { username: string, password: string }) {
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
}

const service = new AuthService({
    singular: "/commerce-user",
    plural: "/commerce-users"
})

export default service