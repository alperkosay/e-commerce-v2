"use client";
import { Button } from "@/components/ui/button";
import { Category } from "@/services/api/category/types";
import gsap from "gsap";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { BiMenu } from "react-icons/bi";

const MobileMenu = ({ navData }: { navData?: Category[] | null }) => {
  const [isActive, setIsActive] = useState<boolean>(false);
  const toggleActive = () => setIsActive((prev) => !prev);

  const navigationListRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const tl = gsap.timeline();

    if (navigationListRef.current) {
      if (isActive) {
        tl.from(navigationListRef.current.children, {
          opacity: 0,
          x: "-100%",
          stagger: 0.1,
        });
      }
    }
  }, [isActive]);

  return (
    <React.Fragment>
      <Button
        className="relative z-20 flex flex-col gap-2.5 text-4xl lg:hidden"
        onClick={toggleActive}
        size={"icon"}
      >
        <BiMenu />
      </Button>
      {isActive && (
        <div className="bg-background fixed inset-0 z-10 h-screen bg-opacity-90 pt-32 backdrop-blur-md">
          <div className="container h-full">
            <ul
              className="h-full space-y-2 overflow-y-auto pb-2"
              ref={navigationListRef}
            >
              {navData?.length &&
                navData.map((data, index) => (
                  <li onClick={toggleActive} key={index}>
                    <Link
                      href={`/${data.attributes.slug}`}
                      title={data.attributes.title}
                      className="inline-block py-4 text-3xl font-semibold"
                    >
                      {data.attributes.title}
                    </Link>
                  </li>
                ))}
            </ul>
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

export default MobileMenu;
