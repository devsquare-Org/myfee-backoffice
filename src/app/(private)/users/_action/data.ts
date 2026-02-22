"use server";

import {
  userChallengeHistoryParams,
  userDetailParams,
  userListParams,
  userPointHistoryParams,
} from "@/app/(private)/users/_action/schema";
import {
  UserChallengeHistoryResponse,
  UserDetailResponse,
  UserListResponse,
  UserPointHistoryResponse,
} from "@/app/(private)/users/_action/type";
import { myfeeFetch } from "@/lib/myfee-client";

import { z } from "zod";

export async function fetchUserList(
  params: z.infer<typeof userListParams>
): Promise<{
  data: UserListResponse;
  message: string;
}> {
  const searchParams = new URLSearchParams();
  searchParams.set("page", params.page);
  searchParams.set("size", "10");

  if (params.search && params.search.length > 0)
    searchParams.set("keyword", params.search);

  const membersRes = await myfeeFetch({
    endpoint: `/api/admin/members?${searchParams.toString()}`,
    requiresAuth: true,
  });

  return { data: membersRes, message: "" };
}

export async function fetchUserDetail(
  params: z.infer<typeof userDetailParams>
): Promise<{
  data: UserDetailResponse;
  message: string;
}> {
  const membersRes = await myfeeFetch({
    endpoint: `/api/admin/members?page=0&size=1&keyword=${params.userAlias}`,
    requiresAuth: true,
  });
  return {
    data: membersRes.contents[0],
    message: "유저 상세 정보를 성공적으로 조회하였습니다.",
  };
}

export async function fetchUserPointHistory(
  params: z.infer<typeof userPointHistoryParams>
): Promise<{
  data: UserPointHistoryResponse;
  message: string;
}> {
  const res = await myfeeFetch({
    endpoint: `/api/admin/members/${params.userId}/points`,
    requiresAuth: true,
  });

  return {
    data: res,
    message: "포인트 내역을 성공적으로 조회하였습니다.",
  };
}

export async function fetchUserChallengeHistory(
  params: z.infer<typeof userChallengeHistoryParams>
): Promise<{
  data: UserChallengeHistoryResponse;
  message: string;
}> {
  const res = await myfeeFetch({
    endpoint: `/api/admin/members/${params.userId}/challenges`,
    requiresAuth: true,
  });

  const data = res.map((item: Record<string, string | number>) => ({
    challengeId: item.challengeId,
    title: item.title,
    cycle: item.cycle,
    joinDt: item.joinDt,
    endDate: item.endDate,
    currentCount: item.currentCount,
    joinStatus: item.joinStatus,
  }));

  return {
    data,
    message: "챌린지 내역을 성공적으로 조회하였습니다.",
  };
}
