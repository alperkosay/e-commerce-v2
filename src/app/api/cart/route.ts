import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt, { JwtPayload } from "jsonwebtoken";
import * as uuid from "uuid";

const anonymSessionKey = "anySession";

export async function POST(req: NextRequest) {
  const cookieStore = cookies();
  const anonymSessionToken = cookieStore.get(anonymSessionKey);

  if (!anonymSessionToken) {
    const token = jwt.sign(
      { id: uuid.v4() },
      process.env.ANONYM_SESSION_SECRET,
      { expiresIn: "1h" }
    );
    cookieStore.set(anonymSessionKey, token);
    return NextResponse.json(
      {
        message: "success",
      },
      {
        headers: {
          "Set-Cookie": `${anonymSessionKey}=${token}`,
        },
      }
    );
  }

  const verifiedToken = jwt.verify(
    anonymSessionToken.value,
    process.env.ANONYM_SESSION_SECRET
  ) as { id: number };
    
  
}
