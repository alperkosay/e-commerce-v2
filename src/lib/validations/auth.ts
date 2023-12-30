import * as z from "zod";


export const signInSchema = z.object({
    username: z.string().min(3, { message: "Minimum 3 karakter olması gerek." }),
    password: z.string().min(3, { message: "Yetersiz karakter." })
});
export type SignIn = z.infer<typeof signInSchema>



export const signUpSchema = z.object({
    username: z.string().min(3, { message: "Minimum 3 karakter olması gerek." }),
    email: z.string().min(3).email(),
    password: z.string().min(3, { message: "Yetersiz karakter." }),
    passwordRepeat: z.string().optional()
});
export type SignUp = z.infer<typeof signUpSchema>