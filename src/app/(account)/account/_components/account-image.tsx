import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getFirstCharactersOfText } from "@/lib/utils";
import { useSession } from "next-auth/react";
import Image from "next/image";
import React from "react";
import { changeProfilePicture } from "./update-profile-picture";

export default function AccountImage() {
  const session = useSession();
  return (
    <>
      <div className="w-48 h-48 border overflow-hidden rounded-full flex items-center justify-center bg-muted">
        {session.data?.user.image ? (
          <Image
            src={session.data?.user.image}
            width={192}
            height={192}
            alt={`${session.data.user.name}' profile picture`}
          />
        ) : (
          <span className="text-4xl">
            {getFirstCharactersOfText(session.data?.user.name!)?.toUpperCase()}
          </span>
        )}
      </div>
      <div className="text-center">
        <form action={changeProfilePicture}>
          <Button className="relative overflow-hidden" variant={"link"} asChild>
            <div>
              Profil fotoğrafı yükle
              <Input
                hidden
                className="inset-0 opacity-0 absolute"
                type="file"
                name="profilePicture"
              />
            </div>
          </Button>
          <Button>Güncelle</Button>
        </form>
      </div>
    </>
  );
}
