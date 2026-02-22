"use server";

import { notificationHistoryParams } from "@/app/(private)/notification/_action/schema";
import { NotificationHistoryResponse } from "@/app/(private)/notification/_action/type";
import { myfeeFetch } from "@/lib/myfee-client";
import { z } from "zod";

export async function fetchNotificationHistory(
  params: z.infer<typeof notificationHistoryParams>
): Promise<{
  data: NotificationHistoryResponse;
  message: string;
}> {
  const res = await myfeeFetch({
    endpoint: `/api/admin/notices?page=${params.page}&size=10&startDate=${params.startDate}&endDate=${params.endDate}`,
    requiresAuth: true,
  });

  return {
    data: res,
    message: "발송 내역을 성공적으로 조회하였습니다.",
  };
}
