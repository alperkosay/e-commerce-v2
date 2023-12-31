"use server";

import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import api from "@/services/api";
import { getServerSession } from "next-auth";
import { useSession } from "next-auth/react";

export async function changeProfilePicture(formData: FormData) {
    const session = await getServerSession(authOptions);
    const profilePicture = formData.get("profilePicture");
    const res = await api.auth.updateProfilePicture(session?.user.id.toString()!, profilePicture!);
    // await update({ image: res.data.attributes.profilePicture?.data.attributes.url })
}