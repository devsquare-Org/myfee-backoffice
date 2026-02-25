"use client";

import { useEffect } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { format, subDays } from "date-fns";
import { PreviewCard } from "@/app/(private)/challenge-review/_components/preview-card";
import { ReviewListWrapper } from "@/app/(private)/challenge-review/_components/review-list-wrapper";
import { useFetchReviewList } from "@/app/(private)/challenge-review/_hooks/use-fetch-review-list";

export function ChallengeReviewContainer() {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { fetchReviewList, reviewList } = useFetchReviewList();

  const status = searchParams.get("status") || "";
  const startDate = searchParams.get("startDate") || "";
  const endDate = searchParams.get("endDate") || "";
  const page = searchParams.get("page") || "0";
  const reviewItemId = searchParams.get("reviewItemId") || "";

  useEffect(() => {
    if (!searchParams.get("startDate") && !searchParams.get("endDate")) {
      const params = new URLSearchParams(searchParams.toString());
      params.set("startDate", format(subDays(new Date(), 30), "yyyy-MM-dd"));
      params.set("endDate", format(new Date(), "yyyy-MM-dd"));
      router.replace(`${pathname}?${params.toString()}`);
    }
  }, []);

  async function handleFetchAndSelect() {
    const data = await fetchReviewList();
    if (data && data.contents.length > 0) {
      const params = new URLSearchParams(searchParams.toString());
      params.set("reviewItemId", data.contents[0].feedId.toString());
      router.replace(`${pathname}?${params.toString()}`);
    }
  }

  useEffect(() => {
    if (startDate && endDate) handleFetchAndSelect();
  }, [status, startDate, endDate, page]);

  const selectedItem =
    reviewList?.contents.find(
      (item) => item.feedId.toString() === reviewItemId
    ) ?? null;

  return (
    <div className="flex border-t">
      <div className="w-1/4 border-r pr-4 h-[calc(100vh-230px)]">
        <ReviewListWrapper
          reviewList={reviewList ?? null}
          selectedItemId={reviewItemId}
        />
      </div>

      <div className="w-3/4 h-[calc(100vh-230px)]">
        <PreviewCard
          reviewItem={selectedItem}
          onRefreshAction={handleFetchAndSelect}
        />
      </div>
    </div>
  );
}
