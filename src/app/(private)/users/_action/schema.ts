import * as z from "zod";

export const userListParams = z.object({
  page: z.string(),
  search: z.string().optional(),
});

export const userDetailParams = z.object({
  userAlias: z.string(),
});

export const updateUserPointParams = z.object({
  userId: z.string(),
  points: z.number().positive({ message: "1 이상의 숫자를 입력해주세요." }),
  type: z.enum(["add", "subtract"], { message: "유형을 선택해주세요." }),
  reason: z
    .string()
    .min(3, { message: "3글자 이상 입력해주세요." })
    .max(50, { message: "50글자 이하로 입력해주세요." }),
});

export const userPointHistoryParams = z.object({
  userId: z.string(),
});

export const userChallengeHistoryParams = z.object({
  userId: z.string(),
});
