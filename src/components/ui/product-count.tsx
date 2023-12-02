"use client";
import React, { useState } from "react";
import { Button } from "./button";
import { Minus, Plus } from "lucide-react";
import { Input } from "./input";

export default function ProductCount() {
    const [count, setCount] = useState<number>(1);

    const handleCount = (state: "inc" | "dec") => {
        setCount((prev) => {
            return state === "inc" ? prev + 1 : prev > 1 ? prev - 1 : prev;
        });
    };

    return (
        <div className="flex w-32">
            <Button
                size={"icon"}
                className="rounded-r-none"
                onClick={() => handleCount("dec")}
            >
                <Minus />
            </Button>
            <div className="flex-1">
                <Input
                    type="number"
                    value={count}
                    min={2}
                    minLength={1}
                    className="rounded-l-none rounded-r-none text-center"
                    onChange={(e) => {
                        setCount(Number(e.target.value));
                    }}
                />
                <p className="text-center text-sm mt-1">Adet</p>
            </div>
            <Button
                size={"icon"}
                className="rounded-l-none"
                onClick={() => handleCount("inc")}
            >
                <Plus />
            </Button>
        </div>
    );
}
