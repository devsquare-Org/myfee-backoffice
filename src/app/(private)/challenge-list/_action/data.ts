"use server";

import { ChallengeListResponse } from "@/app/(private)/challenge-list/_action/type";
import { myfeeFetch } from "@/lib/myfee-client";

type ListItem = Omit<
  ChallengeListResponse[number],
  "participationPoint" | "midPoint" | "completionPoint"
>;

export async function fetchChallengeList(): Promise<{
  data: ChallengeListResponse;
  message: string;
}> {
  const listRes = (await myfeeFetch({
    endpoint: "/api/admin/challenges",
    requiresAuth: true,
  })) as ListItem[];

  const challengeList: ChallengeListResponse = await Promise.all(
    listRes.map(async (item) => {
      const detailRes = (await myfeeFetch({
        endpoint: `/api/admin/challenges/${item.challengeId}`,
        requiresAuth: true,
      })) as {
        participationPoint: number;
        midPoint: number | null;
        completionPoint: number;
      };

      const data = {
        ...item,
        participationPoint: detailRes.participationPoint,
        midPoint: detailRes.midPoint,
        completionPoint: detailRes.completionPoint,
      };

      return data;
    })
  );

  return {
    data: challengeList,
    message: "챌린지 목록을 성공적으로 조회하였습니다.",
  };
}
