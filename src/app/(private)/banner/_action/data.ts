"use server";

import {
  bannerDetailResponse,
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
  data: z.infer<typeof bannerDetailResponse>;
  message: string;
}> {
  const data = bannerListMock.find((item) => item.id === params.id);

  console.log(params, data);
  return {
    data: data as z.infer<typeof bannerDetailResponse>,
    message: "배너 상세 정보를 성공적으로 조회하였습니다.",
  };
}

const bannerListMock = [
  {
    id: "1",
    title: "[신규회원 혜택] 전제품 체험 패키지 할인 이벤트",
    image:
      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=150&h=100&fit=crop",
    linkUrl: "https://lifeb.kr",
    order: 1,
    createdAt: "2025-01-01 12:00:00",
    updatedAt: "2025-01-01 12:00:00",
  },
  {
    id: "2",
    title: "리뷰 작성 이벤트",
    image:
      "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=150&h=100&fit=crop",
    linkUrl: "https://lifeb.kr",
    order: 2,
    createdAt: "2025-01-01 12:00:00",
    updatedAt: "2025-01-01 12:00:00",
  },
  {
    id: "3",
    title: "특가 이벤트",
    image:
      "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=150&h=100&fit=crop",
    linkUrl: "https://lifeb.kr",
    order: 3,
    createdAt: "2025-01-01 12:00:00",
    updatedAt: "2025-01-01 12:00:00",
  },
];
