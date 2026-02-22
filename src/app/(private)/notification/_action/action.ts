"use server";

import { sendNotificationParams } from "@/app/(private)/notification/_action/schema";
import { myfeePost } from "@/lib/myfee-client";
import { actionClient } from "@/lib/safe-action";

export const sendNotificationAction = actionClient
  .inputSchema(sendNotificationParams)
  .action(async ({ parsedInput }) => {
    console.log({
      title: parsedInput.title,
      body: parsedInput.content,
      marketingYn: parsedInput.isAd ? "Y" : "N",
    });

    const res = await myfeePost({
      endpoint: "/api/admin/notices",
      body: {
        title: parsedInput.title,
        body: parsedInput.content,
        marketingYn: parsedInput.isAd ? "Y" : "N",
      },
      requiresAuth: true,
    });

    return { message: "알림을 발송했습니다." };
  });
