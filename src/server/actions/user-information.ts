"use server";

import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { UserInformation } from "@/lib/validations/user-informations";
import api from "@/services/api";
import { getServerSession } from "next-auth";

export async function updateUserInformation(values: UserInformation) {
  const session = await getServerSession(authOptions);
  if (!session) return null;
  const res = await api.user.updateUser(values, session.user.id);
  return res;
}
