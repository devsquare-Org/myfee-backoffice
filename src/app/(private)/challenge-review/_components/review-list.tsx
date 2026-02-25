"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, useRef } from "react";

type Props = {
  reviewList: {
    id: number;
    title: string;
    body: string;
    createdAt: string;
  }[];
};

export function ReviewList({ reviewList }: Props) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [reviewItemId, setReviewItemId] = useState(
    searchParams.get("reviewItemId")?.toString() || ""
  );
  const [status, setStatus] = useState(
    searchParams.get("status")?.toString() || "pending"
  );

  // 스크롤 리셋용 파라미터들
  const statusParam = searchParams.get("status");
  const pageParam = searchParams.get("page");
  const startDateParam = searchParams.get("startDate");
  const endDateParam = searchParams.get("endDate");

  // reviewItemId 변경 시 변경된 값을 저장
  useEffect(() => {
    setReviewItemId(searchParams.get("reviewItemId")?.toString() || "");
  }, [searchParams, pathname]);

  // status 변경 시 변경된 값을 저장
  useEffect(() => {
    setStatus(searchParams.get("status")?.toString() || "pending");
  }, [searchParams, pathname]);

  // reviewItemId 외 파라미터 변경 시 스크롤 최상단 이동
  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = 0;
    }
  }, [statusParam, pageParam, startDateParam, endDateParam]);

  function selectReviewItem(value: string) {
    setReviewItemId(value);
    const params = new URLSearchParams(searchParams);
    params.set("reviewItemId", value);
    replace(`${pathname}?${params.toString()}`);
  }

  return (
    <div ref={scrollContainerRef} className="h-full overflow-y-auto">
      <StatusLabel status={status} length={reviewList.length} />
      {reviewList.map((review) => {
        return (
          <div key={review.id} className="relative">
            <div
              onClick={() => {
                selectReviewItem(review.id.toString());
              }}
            >
              <div className="flex flex-col gap-1 flex-1">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-semibold line-clamp-1">
                    {review.title}
                  </p>
                </div>
                <p className="text-xs text-muted-foreground font-medium line-clamp-1">
                  {review.body}
                </p>
                <p className="text-[10px] text-muted-foreground font-semibold">
                  {review.createdAt}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function StatusLabel({ status, length }: { status: string; length: number }) {
  switch (status) {
    case "pending":
      return (
        <div className="flex items-center gap-2 my-4">
          <div className="min-w-2 min-h-2 max-w-2 max-h-2 rounded-full bg-yellow-500" />
          <p className="text-xs text-muted-foreground font-medium">
            대기중인 인증 {length}건
          </p>
        </div>
      );
    case "approved":
      return (
        <div className="flex items-center gap-2 my-4">
          <div className="min-w-2 min-h-2 max-w-2 max-h-2 rounded-full bg-blue-500" />
          <p className="text-xs text-muted-foreground font-medium">
            완료된 인증 {length}건
          </p>
        </div>
      );
    case "rejected":
      return (
        <div className="flex items-center gap-2 my-4">
          <div className="min-w-2 min-h-2 max-w-2 max-h-2 rounded-full bg-red-500" />
          <p className="text-xs text-muted-foreground font-medium">
            반려된 인증 {length}건
          </p>
        </div>
      );
  }
}
