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
  await new Promise((resolve) => setTimeout(resolve, 3000));

  const challengeHistory = [
    {
      id: "1",
      name: "10월 챌린지",
      reviewCount: 15,
      result: "성공",
      createdAt: "2023-10-05 12:00:00",
    },
    {
      id: "2",
      name: "9월 챌린지",
      reviewCount: 8,
      result: "실패",
      createdAt: "2023-09-30 12:00:00",
    },
    {
      id: "3",
      name: "8월 챌린지",
      reviewCount: 12,
      result: "성공",
      createdAt: "2023-10-03 12:00:00",
    },
  ];

  return {
    data: challengeHistory,
    message: "챌린지 내역을 성공적으로 조회하였습니다.",
  };
}
