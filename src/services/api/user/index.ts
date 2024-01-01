import { Payload, fetcher } from "@/lib/utils";
import { ApiService } from "../core";
import { User } from "./types";
import QueryString from "qs";
import { SignIn, SignUp } from "@/lib/validations/auth";
import { Media } from "../types";
import { UserInformation } from "@/lib/validations/user-informations";

class AuthService extends ApiService<User> {
  private bearerToken = process.env.AUTH_STRAPI_TOKEN;

  async findById(id: number | string): Promise<Payload<User>> {
    const qs = QueryString.stringify({
      populate: "*",
    });
    return await fetcher(`${this.endpoint.plural}/${id}?${qs}`, {
      method: "GET",
      headers: {
        Authorization: `bearer ${this.bearerToken}`,
      },
    });
  }

  async findByCredentials(credentials: SignIn) {
    const query = QueryString.stringify(
      {
        filters: {
          username: {
            $eq: credentials.username,
          },
          password: {
            $eq: credentials.password,
          },
        },
        populate: "*",
      },
      {
        encodeValuesOnly: true,
      }
    );

    const { data, error } = await fetcher<User[]>(
      `${this.endpoint.plural}?${query}`,
      {
        method: "GET",
        headers: {
          Authorization: `bearer ${this.bearerToken}`,
        },
      }
    );
    return data[0];
  }
  async createUser(credentials: SignUp) {
    const { data, error } = await fetcher<User>(`${this.endpoint.plural}`, {
      method: "POST",
      headers: {
        Authorization: `bearer ${this.bearerToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ data: credentials }),
    });

    if (error) return null;
    return data;
  }

  async updateUser(credentials: UserInformation, id: number | string) {
    const user = await this.findById(id);
    console.log("user", user);
    const body = {
      // ...user,
      data: {
        ...user.data.attributes,
        ...credentials,
      },
    };
    delete body.data.profilePicture;
    console.log("body", body);

    return await fetcher(`${this.endpoint.plural}/${id}`, {
      method: "PUT",
      headers: {
        Authorization: `bearer ${process.env.AUTH_STRAPI_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
  }

  async findUserByName(username: string) {
    const qs = QueryString.stringify(
      {
        filters: {
          username: {
            $eq: username,
          },
        },
        populate: "*",
      },
      {
        encodeValuesOnly: true,
      }
    );

    const { data, error } = await fetcher<User[]>(
      `${this.endpoint.plural}?${qs}`,
      {
        method: "GET",
        headers: {
          Authorization: `bearer ${process.env.AUTH_STRAPI_TOKEN}`,
          "Content-Type": "application/json",
        },
      }
    );
    return data[0];
  }

  async deleteProfilePicture(id: string | number) {
    return await fetcher<Media>(`/upload/files/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `bearer ${this.bearerToken}`,
      },
    });
  }

  async updateProfilePicture(
    userID: number | string,
    newPicture: string | Blob
  ) {
    const userData = await this.findById(userID);

    if (
      userData.data.attributes.profilePicture &&
      userData.data.attributes.profilePicture.data
    ) {
      const res = await this.deleteProfilePicture(
        userData.data.attributes.profilePicture.data.id
      );
    }

    const formData = new FormData();
    formData.append("files.profilePicture", newPicture);
    formData.append("data", JSON.stringify(userData.data.attributes));

    const qs = QueryString.stringify({
      populate: "*",
    });

    return fetcher<User>(`${this.endpoint.plural}/${userID}?${qs}`, {
      method: "PUT",
      headers: {
        Authorization: `bearer ${this.bearerToken}`,
      },
      body: formData,
    });
  }
}

const service = new AuthService({
  singular: "/commerce-user",
  plural: "/commerce-users",
});

export default service;
