"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getFirstCharactersOfText } from "@/lib/utils";
import { useSession } from "next-auth/react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { changeProfilePicture } from "@/server/actions/profile-picture";
import { useFormState } from "react-dom";
import { X } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

export default function AccountImage() {
  const session = useSession();

  const [formState, formAction] = useFormState(changeProfilePicture, null);
  const [newProfilePic, setNewProfilePic] = useState<string | null>(null);
  const { toast } = useToast();
  useEffect(() => {
    if (formState?.data) {
      session.update({
        profilePicture:
          formState.data.attributes.profilePicture?.data.attributes.url,
      });
      toast({
        title: "Profil fotoğrafı başarıyla güncellendi!",
      });
    }
  }, [formState]);

  return (
    <>
      <div className="relative">
        <div className="w-48 h-48 border overflow-hidden rounded-full flex items-center justify-center bg-muted relative">
          {session.data?.user.profilePicture ? (
            <Image
              src={newProfilePic || session.data?.user.profilePicture}
              width={192}
              height={192}
              alt={`${session.data.user.name}' profile picture`}
            />
          ) : (
            <span className="text-4xl">
              {getFirstCharactersOfText(
                session.data?.user.name!
              )?.toUpperCase()}
            </span>
          )}
        </div>
        {newProfilePic ? (
          <Button
            variant={"destructive"}
            size={"icon"}
            className="absolute right-0 top-0"
            onClick={() => {
              setNewProfilePic(null);
            }}
          >
            <X />
          </Button>
        ) : null}
      </div>
      <div className="text-center">
        <form action={formAction} className="flex flex-col">
          <Button className="relative overflow-hidden" variant={"link"} asChild>
            <div>
              Profil fotoğrafı yükle
              <Input
                hidden
                className="inset-0 opacity-0 absolute"
                type="file"
                name="profilePicture"
                onChange={(e) => {
                  const { files } = e.target;

                  if (files && files[0]) {
                    const file: File = files[0];
                    const newPic = URL.createObjectURL(file);
                    setNewProfilePic(newPic);
                    console.log("newPic", newPic);
                  }
                }}
              />
            </div>
          </Button>
          <Button
            onClick={() => {
              if (!formState?.data) {
                toast({
                  title: "Önce profil fotoğrafı yükleyin!",
                  variant: "destructive",
                });
                return;
              }

              session.update();
              setNewProfilePic(null);
            }}
            className="w-max mx-auto"
          >
            Güncelle
          </Button>
        </form>
      </div>
    </>
  );
}
