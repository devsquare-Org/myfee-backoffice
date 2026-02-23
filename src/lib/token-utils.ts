"use server";

import { AppError } from "@/lib/errors";
import { cookies } from "next/headers";

export async function getMyfeeRefreshToken() {
  const cookieStore = await cookies();
  const token = cookieStore.get("__myfee_admin_refreshToken")?.value;

  if (!token) {
    throw new AppError({
      from: "next",
      code: "myfee_refresh_token_not_found",
    });
  }

  return token;
}

export async function getMyfeeAccessToken() {
  const cookieStore = await cookies();
  const token = cookieStore.get("__myfee_admin_accessToken")?.value;

  if (!token) {
    throw new AppError({
      from: "next",
      code: "myfee_access_token_not_found",
    });
  }

  return token;
}
