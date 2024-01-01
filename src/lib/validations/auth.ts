import * as z from "zod";

export const userSchemaObj = {
  username: z.string().min(3, { message: "Minimum 3 karakter olması gerek." }),
  email: z.string().min(3).email(),
};
export type UserSchema = typeof userSchemaObj;

export const userPasswordSchemaObj = {
  password: z.string().min(3, { message: "Yetersiz karakter." }),
  passwordRepeat: z.string().optional(),
};

export const signInSchema = z.object({
  username: userSchemaObj.username,
  password: userPasswordSchemaObj.password,
});
export type SignIn = z.infer<typeof signInSchema>;

export const signUpSchema = z.object({
  ...userSchemaObj,
  ...userPasswordSchemaObj,
});
export type SignUp = z.infer<typeof signUpSchema>;
