"use server";

import {
  BannerDetailResponse,
  BannerListResponse,
} from "@/app/(private)/banner/_action/type";
import { getBannerDetailParams } from "@/app/(private)/banner/_action/schema";
import z from "zod";
import { myfeeFetch } from "@/lib/myfee-client";

export async function fetchBannerList(): Promise<{
  data: BannerListResponse;
  message: string;
}> {
  const res = await myfeeFetch({
    endpoint: "/api/admin/banners",
    requiresAuth: true,
  });

  return {
    data: res,
    message: "배너 목록을 성공적으로 조회하였습니다.",
  };
}

export async function getBannerDetail(
  params: z.infer<typeof getBannerDetailParams>
): Promise<{
  data: BannerDetailResponse;
  message: string;
}> {
  const res = await myfeeFetch({
    endpoint: `/api/admin/banners/${params.id}`,
    requiresAuth: true,
  });

  return {
    data: res,
    message: "배너 상세 정보를 성공적으로 조회하였습니다.",
  };
}
