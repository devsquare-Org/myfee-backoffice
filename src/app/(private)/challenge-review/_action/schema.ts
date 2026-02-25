import * as z from "zod";

export const challengeReviewListParams = z.object({
  status: z.string().optional(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  page: z.string().optional(),
});

export const challengeReviewParams = z.object({
  challengeId: z.string(),
  feedId: z.string(),
  memberId: z.number(),
  review: z.enum(["APPROVED", "REJECTED"]),
  note: z.string(),
});
