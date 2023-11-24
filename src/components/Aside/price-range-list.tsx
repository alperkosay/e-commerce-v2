"use client";
import React from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Search } from "lucide-react";

export default function PriceRangeList() {
    return (
        <div>
            <p>Fiyat Aralığı</p>
            <div className="flex justify-between gap-2">
                <Input
                    placeholder="En az"
                    type="number"
                    name="minimum"
                    className="text-xs py-1.5 px-2"
                    min={0}
                />
                <Input
                    placeholder="En Çok"
                    type="number"
                    name="maximum"
                    className="text-xs py-1.5 px-2 "
                    min={0}
                />
                <div>
                    <Button size={"icon"}>
                        <Search size={16} />
                    </Button>
                </div>
            </div>
        </div>
    );
}
