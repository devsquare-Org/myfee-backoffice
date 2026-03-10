import { createSafeActionClient } from "next-safe-action";
import { AppError, errorParser } from "@/lib/errors";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const actionClient = createSafeActionClient({
  async handleServerError(error) {
    const appError = error as AppError;

    console.log(">>>>>>>>> ERROR <<<<<<<< ", appError);

    const isTokenMissing =
      appError.code === "myfee_access_token_not_found" ||
      appError.code === "myfee_refresh_token_not_found";
    const isAuthError = appError.status === 401 || isTokenMissing;

    if (isAuthError) {
      const cookieStore = await cookies();
      cookieStore.delete("__myfee_admin_accessToken");
      cookieStore.delete("__myfee_admin_refreshToken");
      redirect("/signin");
    }

    return {
      message: errorParser(appError),
      code: appError.code,
    };
  },
});
