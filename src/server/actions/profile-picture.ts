"use server";

import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import api from "@/services/api";
import { getServerSession } from "next-auth";

// Update the profile picture
export async function changeProfilePicture(prevState: any, formData: FormData) {
  const session = await getServerSession(authOptions);
  const profilePicture = formData.get("profilePicture");
  const res = await api.user.updateProfilePicture(
    session?.user.id.toString()!,
    profilePicture!
  );
  return res;
}
