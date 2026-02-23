"use server";

import { loginFormSchema, returnSchema } from "@/app/signin/_action/schema";
import { myfeeFetch } from "@/lib/myfee-client";
import { actionClient } from "@/lib/safe-action";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const loginAction = actionClient
  .inputSchema(loginFormSchema)
  .outputSchema(returnSchema)
  .action(async ({ parsedInput }) => {
    const res = await myfeeFetch({
      endpoint: `/api/admin/auth/login?email=${parsedInput.email}&password=${parsedInput.password}`,
    });

    const cookieStore = await cookies();
    cookieStore.set("__myfee_admin_accessToken", res.accessToken);
    cookieStore.set("__myfee_admin_refreshToken", res.refreshToken);

    return {
      data: res,
      status: "SUCCESS",
      message: "",
    };
  });

export const logoutAction = actionClient.action(async () => {
  const cookieStore = await cookies();
  cookieStore.delete("__myfee_admin_accessToken");
  cookieStore.delete("__myfee_admin_refreshToken");
  redirect("/signin");
});
