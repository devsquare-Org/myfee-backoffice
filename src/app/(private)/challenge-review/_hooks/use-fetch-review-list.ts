"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { fetchChallengeReviewList } from "@/app/(private)/challenge-review/_action/data";
import { useState } from "react";
import { ReviewList } from "@/app/(private)/challenge-review/_action/type";

export function useFetchReviewList() {
  const pathname = usePathname();
  const { replace } = useRouter();
  const searchParams = useSearchParams();
  const [reviewList, setReviewList] = useState<ReviewList>();

  // 리뷰 목록 패치에 필요한 파라미터들만 추출 (reviewItemId는 제외)
  const status = searchParams.get("status") || "";
  const startDate = searchParams.get("startDate") || "";
  const endDate = searchParams.get("endDate") || "";
  const page = searchParams.get("page") || "0";

  async function fetchReviewList() {
    const { data } = await fetchChallengeReviewList({
      status,
      startDate,
      endDate,
      page,
    });

    if (data) setReviewList(data);

    // 리뷰 목록이 있으면 첫 번째 리뷰 아이템의 id를 reviewItemId 서치파라미터에 추가
    if (data.contents.length > 0) {
      const params = new URLSearchParams(searchParams);
      params.set("reviewItemId", data.contents[0].feedId.toString());
      replace(`${pathname}?${params.toString()}`);
    }
  }

  return { fetchReviewList, reviewList };
}
