"use server";

import { challengeReviewListParams } from "@/app/(private)/challenge-review/_action/schema";
import { ReviewList } from "@/app/(private)/challenge-review/_action/type";
import { myfeeFetch } from "@/lib/myfee-client";
import z from "zod";

export async function fetchChallengeReviewList(
  params: z.infer<typeof challengeReviewListParams>
): Promise<{
  data: ReviewList;
  message: string;
}> {
  const res = await myfeeFetch({
    endpoint: `/api/admin/challenges/verifications?review=${params.status}&startDate=${params.startDate}&endDate=${params.endDate}&page=${params.page}&size=20`,
    requiresAuth: true,
  });

  const data = {
    ...res,
    contents: res.contents.map((item: Record<string, unknown>) => ({
      ...item,
      mainMediaUrl: `${process.env.MYFEE_CDN_BASE_URL}/${item.mainMediaUrl}`,
    })),
  };

  return {
    data: data,
    message: "챌린지 인증 목록을 성공적으로 조회하였습니다.",
  };
}
