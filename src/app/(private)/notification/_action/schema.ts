import * as z from "zod";

export const sendNotificationParams = z.object({
  title: z
    .string()
    .min(3, "3글자 이상 입력해주세요.")
    .max(20, "20글자 이하로 입력해주세요."),
  content: z
    .string()
    .min(5, "5글자 이상 입력해주세요.")
    .max(40, "40글자 이하로 입력해주세요."),
  isAd: z.boolean(),
});

export const notificationHistoryParams = z.object({
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  page: z.string().optional(),
});
