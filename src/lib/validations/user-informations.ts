import * as z from "zod";

import { userSchemaObj } from "./auth";
export const userInformationsSchema = z.object(userSchemaObj);
export type UserInformation = z.infer<typeof userInformationsSchema>;
