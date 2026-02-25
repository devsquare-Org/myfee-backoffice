"use server";

import { challengeReviewParams } from "@/app/(private)/challenge-review/_action/schema";
import { actionClient } from "@/lib/safe-action";
import { myfeePut } from "@/lib/myfee-client";

export const challengeReviewAction = actionClient
  .inputSchema(challengeReviewParams)
  .action(async ({ parsedInput }) => {
    await myfeePut({
      endpoint: `/api/admin/challenges/verifications/${parsedInput.challengeId}/feeds/${parsedInput.feedId}`,
      body: {
        memberId: parsedInput.memberId,
        review: parsedInput.review,
        note: parsedInput.note,
      },
      requiresAuth: true,
    });

    return {
      message: `챌린지 인증 ${parsedInput.review === "APPROVED" ? "승인" : "반려"} 처리가 완료되었습니다.`,
    };
  });
