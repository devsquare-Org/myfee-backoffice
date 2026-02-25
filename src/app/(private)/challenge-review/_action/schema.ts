import * as z from "zod";

export const challengeReviewListParams = z.object({
  status: z.string().optional(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  page: z.string().optional(),
});

export const challengeReviewDetailParams = z.object({
  id: z.string(),
});

export const approveChallengeReviewParams = z.object({
  id: z.string(),
});

export const rejectChallengeReviewParams = z.object({
  id: z.string(),
  reason: z
    .string()
    .nonempty({ message: "1글자 이상 직접 입력 또는 사유를 선택해주세요." })
    .min(1, { message: "1글자 이상 직접 입력 또는 사유를 선택해주세요." })
    .max(100, {
      message: "100글자 이하로 직접 입력 또는 사유를 선택해주세요.",
    }),
});

export const deleteWipItemsParams = z.object({
  reviewItemId: z.number(),
});
