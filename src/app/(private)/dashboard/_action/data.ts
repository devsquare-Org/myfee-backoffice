"use server";

import { dashboardDataParams } from "@/app/(private)/dashboard/_action/req-schema";
import { DashboardDataResponse } from "@/app/(private)/dashboard/_action/type";

import { myfeeFetch } from "@/lib/myfee-client";
import { z } from "zod";

export async function fetchDashboardData(
  params: z.infer<typeof dashboardDataParams>,
): Promise<{
  data: DashboardDataResponse;
  message: string;
}> {
  const statisticsRes = await myfeeFetch({
    endpoint: `/api/admin/statistics?startDate=${params.startDate}&endDate=${params.endDate}`,
    requiresAuth: true,
  });

  const membersRes = await myfeeFetch({
    endpoint: `/api/admin/members?page=0&size=10&startJoinDate=${params.startDate}&endJoinDate=${params.endDate}`,
    requiresAuth: true,
  });

  const data = {
    startDate: params.startDate,
    endDate: params.endDate,
    postCount: statisticsRes.feedCount,
    challengeReviewCount: statisticsRes.challengeRecordCount,
    userCount: statisticsRes.memberCount,
    pointCount: statisticsRes.pointCount,
    userList: membersRes.contents ?? [],
  } as DashboardDataResponse;

  return {
    data,
    message: "대시보드 데이터를 성공적으로 조회하였습니다.",
  };
}
