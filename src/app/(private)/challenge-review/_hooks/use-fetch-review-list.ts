"use client";

import { useSearchParams } from "next/navigation";
import { fetchChallengeReviewList } from "@/app/(private)/challenge-review/_action/data";
import { useState } from "react";
import { ReviewList } from "@/app/(private)/challenge-review/_action/type";

export function useFetchReviewList() {
  const searchParams = useSearchParams();
  const [reviewList, setReviewList] = useState<ReviewList>();

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
    return data;
  }

  return { fetchReviewList, reviewList };
}
