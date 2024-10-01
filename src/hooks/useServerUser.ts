"use server";

import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";

export const useServerUser = async () => {
  const accessToken = cookies().get("accessToken")?.value;

  let decodedUser = null;

  if (accessToken) {
    decodedUser = jwtDecode(accessToken);
  }

  return decodedUser;
};
