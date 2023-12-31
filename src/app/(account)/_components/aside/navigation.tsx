import Link from "next/link";
import React from "react";
import usernavigations from "@/mocks/usernavigations";
export default function Navigation() {
  return (
    <div>
      <ul className="space-y-2">
        {Object.entries(usernavigations).map((entry, index) => (
          <li key={index} className="hover:text-primary transition-colors">
            <Link href={entry[1].href} className="text-lg py-2 px-2 block">
              {entry[1].title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
