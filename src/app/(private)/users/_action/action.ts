"use server";

import { updateUserPointParams } from "@/app/(private)/users/_action/req-schema";
import { actionClient } from "@/lib/safe-action";

export const updateUserPointAction = actionClient
  .inputSchema(updateUserPointParams)
  .action(async ({ parsedInput }) => {
    const typeText = parsedInput.type === "add" ? "지급" : "차감";
    console.log(">>>>>", parsedInput);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return { message: `포인트가 ${typeText} 되었습니다.` };
  });
