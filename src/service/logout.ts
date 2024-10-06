"use server";

import { cookies } from "next/headers";

export const Logout = async () => {
  await cookies().delete("accessToken");
};
