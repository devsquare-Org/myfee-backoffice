"use client";

import { useEffect } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { format, subDays } from "date-fns";
import { ReviewList } from "@/app/(private)/challenge-review/_components/review-list";
import { useFetchReviewList } from "@/app/(private)/challenge-review/_hooks/use-fetch-review-list";
import { PaginationControls } from "@/components/pagination-controls";

export function ReviewListWrapper() {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { fetchReviewList, reviewList } = useFetchReviewList();

  const status = searchParams.get("status") || "";
  const startDate = searchParams.get("startDate") || "";
  const endDate = searchParams.get("endDate") || "";
  const page = searchParams.get("page") || "0";

  useEffect(() => {
    if (!searchParams.get("startDate") && !searchParams.get("endDate")) {
      const params = new URLSearchParams(searchParams.toString());
      params.set("startDate", format(subDays(new Date(), 30), "yyyy-MM-dd"));
      params.set("endDate", format(new Date(), "yyyy-MM-dd"));
      router.replace(`${pathname}?${params.toString()}`);
    }
  }, []);

  useEffect(() => {
    if (startDate && endDate) {
      fetchReviewList();
    }
  }, [status, startDate, endDate, page]);

  if (!reviewList) return null;

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-auto">
        <ReviewList reviewList={reviewList} />
      </div>

      {reviewList.contents.length > 0 && reviewList.totalPages > 1 && (
        <PaginationControls
          pageSize={reviewList.size}
          totalItems={reviewList.totalElements}
        />
      )}
    </div>
  );
}
