"use server";

import { dashboardDataParams } from "@/app/(private)/dashboard/_action/req-schema";
import { dashboardDataResponse } from "@/app/(private)/dashboard/_action/res-schema";
import { z } from "zod";

export async function fetchDashboardData(
  params: z.infer<typeof dashboardDataParams>,
): Promise<{
  data: z.infer<typeof dashboardDataResponse>;
  message: string;
}> {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const data = {
    startDate: params.startDate,
    endDate: params.endDate,
    postCount: 210,
    challengeReviewCount: 3750,
    userCount: 375,
    pointCount: 2137000,
    userList: [
      {
        id: "1",
        name: "홍길동",
        nickname: "hong123",
        email: "hong@gmail.com",
        image: "https://via.placeholder.com/150",
        createdAt: "2025-01-01 12:00:00",
        phone: "010-1234-5678",
      },
      {
        id: "2",
        name: "김철수",
        nickname: "kim123",
        email: "kim@gmail.com",
        image: "https://via.placeholder.com/150",
        createdAt: "2025-01-01 12:00:00",
        phone: "010-2345-6789",
      },
      {
        id: "3",
        name: "박영희",
        nickname: "park123",
        email: "park@gmail.com",
        image: "https://via.placeholder.com/150",
        createdAt: "2025-01-01 12:00:00",
        phone: "010-3456-7890",
      },
      {
        id: "4",
        name: "이영수",
        nickname: "lee123",
        email: "lee@gmail.com",
        image: "https://via.placeholder.com/150",
        createdAt: "2025-01-01 12:00:00",
        phone: "010-4567-8901",
      },
      {
        id: "5",
        name: "김민수",
        nickname: "kim456",
        email: "kimminsu@gmail.com",
        image: "https://via.placeholder.com/150",
        createdAt: "2025-01-01 12:00:00",
        phone: "010-5678-9012",
      },
      {
        id: "6",
        name: "최지훈",
        nickname: "choi123",
        email: "choi@gmail.com",
        image: "https://via.placeholder.com/150",
        createdAt: "2025-01-01 12:00:00",
        phone: "010-6789-0123",
      },
      {
        id: "7",
        name: "김지현",
        nickname: "kim789",
        email: "kimjihyun@gmail.com",
        image: "https://via.placeholder.com/150",
        createdAt: "2025-01-01 12:00:00",
        phone: "010-7890-1234",
      },
      {
        id: "8",
        name: "이지현",
        nickname: "lee456",
        email: "leejihyun@gmail.com",
        image: "https://via.placeholder.com/150",
        createdAt: "2025-01-01 12:00:00",
        phone: "010-8901-2345",
      },
    ],
  } as z.infer<typeof dashboardDataResponse>;

  return {
    data,
    message: "대시보드 데이터를 성공적으로 조회하였습니다.",
  };
}
