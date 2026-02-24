"use server";

import { ChallengeListResponse } from "@/app/(private)/challenge-list/_action/type";
import { myfeeFetch } from "@/lib/myfee-client";

export async function fetchChallengeList(): Promise<{
  data: ChallengeListResponse;
  message: string;
}> {
  const res = await myfeeFetch({
    endpoint: "/api/admin/challenges",
    requiresAuth: true,
  });

  return {
    data: res,
    message: "배너 목록을 성공적으로 조회하였습니다.",
  };
}
