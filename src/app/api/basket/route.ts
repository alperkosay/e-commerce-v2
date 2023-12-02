import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

const basketKey = "basket";

export type ProductCartItem = {
    id: number;
    count: number;
};

export async function GET(req: NextRequest) {
    const value = cookies().get(basketKey)?.value;
    return NextResponse.json({
        data: value ? JSON.parse(value) : [],
    });
}

export async function POST(req: NextRequest) {
    const basket = cookies().get(basketKey);
    const oldBasketValue = basket ? basket.value : JSON.stringify([]);

    const newItem: ProductCartItem = await req.json();
    cookies().set({
        name: basketKey,
        value: JSON.stringify([...JSON.parse(oldBasketValue), newItem]),
        httpOnly: true,
        path: "/",
    });

    return NextResponse.json({ data: cookies().get(basketKey)?.value });
}
