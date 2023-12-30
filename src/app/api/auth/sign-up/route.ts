import { hashPassword } from "@/lib/bcrypt";
import { SignUp, signUpSchema } from "@/lib/validations/auth";
import api from "@/services/api";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const body: SignUp = await req.json();
    try {
        signUpSchema.parse(body);

        const hashedPassword = hashPassword(body.password);

        const user = await api.auth.createUser({
            ...body,
            password: hashedPassword
        });

        if (!user) return NextResponse.json({ message: "Bu kullanıcı zaten kayıtlı" }, { status: 501 })
        return NextResponse.json({ message: "success" }, { status: 200 })
    } catch (err) {
        console.log('err', err)
        return NextResponse.json({ message: "validation error" }, { status: 500 })

    }
} 