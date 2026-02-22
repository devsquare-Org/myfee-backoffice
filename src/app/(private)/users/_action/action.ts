"use server";

import { updateUserPointParams } from "@/app/(private)/users/_action/schema";
import { myfeePut } from "@/lib/myfee-client";
import { actionClient } from "@/lib/safe-action";
import { revalidatePath } from "next/cache";

export const updateUserPointAction = actionClient
  .inputSchema(updateUserPointParams)
  .action(async ({ parsedInput }) => {
    const typeText = parsedInput.type === "add" ? "지급" : "차감";

    await myfeePut({
      endpoint: `/api/admin/members/${parsedInput.userId}/points`,
      body: {
        action: parsedInput.type === "add" ? "EARN" : "SPEND",
        amount: parsedInput.points,
        reason: parsedInput.reason,
      },
      requiresAuth: true,
    });

    revalidatePath(`/users/[userAlias]`);

    return { message: `포인트가 ${typeText} 되었습니다.` };
  });
