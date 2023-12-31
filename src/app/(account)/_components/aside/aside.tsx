import React from "react";
import User from "./user";
import Navigation from "./navigation";
import { Separator } from "@/components/ui/separator";

export default function Aside() {
  return (
    <div className="w-64 px-4">
      <div className="sticky top-5">
        <User />
        <Separator className="my-4" />
        <Navigation />
      </div>
    </div>
  );
}
