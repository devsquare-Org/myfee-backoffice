"use server";

import {
  approveChallengeReviewParams,
  deleteWipItemsParams,
  rejectChallengeReviewParams,
} from "@/app/(private)/challenge-review/_action/req-schema";
import { getUserIdServer } from "@/lib/server-utils";
import { actionClient } from "@/lib/safe-action";
import wipManager from "@/module/wip-manager";

export const approveChallengeReviewAction = actionClient
  .inputSchema(approveChallengeReviewParams)
  .action(async ({ parsedInput }) => {
    const userId = await getUserIdServer();
    if (!userId) throw new Error("userId가 없습니다.");

    // myfee server 요청 전 세션 상태 업데이트
    await wipManager.updateItem({
      reviewItemId: Number(parsedInput.id),
      adminId: userId,
      status: "reviewed",
      completedAt: new Date().toISOString(),
    });

    try {
      // TODO: myfee server 요청
      await new Promise((resolve) => setTimeout(resolve, 6000));
    } catch (error) {
      console.log(error);
      // switch (error.code) {
      //   case "이미 처리된 인증":
      //     // 이미 처리된 인증인 경우 wip-indicator에서도 처리된 것으로 간주하여 추가 처리 안함
      //     return { message: "이미 처리된 인증입니다." };
      //   case "서버 에러":
      //     // 서버 에러인 경우 wip-indicator에서 삭제 처리
      //     await wipManager.removeItem({
      //       reviewItemId: Number(parsedInput.id),
      //     });
      //     return { message: "서버 에러가 발생했습니다." };
      //   default:
      //     return { message: "알 수 없는 에러가 발생했습니다." };
      // }
    }

    return { message: "인증 요청을 승인했습니다." };
  });

export const rejectChallengeReviewAction = actionClient
  .inputSchema(rejectChallengeReviewParams)
  .action(async ({ parsedInput }) => {
    const userId = await getUserIdServer();
    if (!userId) throw new Error("userId가 없습니다.");

    // myfee server 요청 전 세션 상태 업데이트
    await wipManager.updateItem({
      reviewItemId: Number(parsedInput.id),
      adminId: userId,
      status: "reviewed",
      completedAt: new Date().toISOString(),
    });

    try {
      // TODO: myfee server 요청
      await new Promise((resolve) => setTimeout(resolve, 600));
    } catch (error) {
      console.log(error);
      // switch (error.code) {
      //   case "이미 처리된 인증":
      //     // 이미 처리된 인증인 경우 wip-indicator에서도 처리된 것으로 간주하여 추가 처리 안함
      //     return { message: "이미 처리된 인증입니다." };
      //   case "서버 에러":
      //     // 서버 에러인 경우 wip-indicator에서 삭제 처리
      //     await wipManager.removeItem({
      //       reviewItemId: Number(parsedInput.id),
      //     });
      //     return { message: "서버 에러가 발생했습니다." };
      //   default:
      //     return { message: "알 수 없는 에러가 발생했습니다." };
      // }
    }

    return { message: "인증 요청을 반려했습니다." };
  });

export const deleteWipItemsAction = actionClient
  .inputSchema(deleteWipItemsParams)
  .action(async ({ parsedInput }) => {
    await wipManager.removeItem(parsedInput);
  });
