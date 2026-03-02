import { ChallengeReviewContainer } from "@/app/(private)/challenge-review/_components/challenge-review-container";
import { PageHeader } from "@/components/page-header";
import { DateRangePicker } from "@/components/date-range-picker";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import StatusSelector from "@/app/(private)/challenge-review/_components/status-selector";
import CustomLoading from "@/components/custom-loading";

export default function ChallengeReview() {
  return (
    <div className="flex flex-col">
      <PageHeader
        title="챌린지 인증"
        description="챌린지 인증 관리 페이지입니다."
      />

      <Suspense fallback={<Skeleton className="w-72 h-9 mb-4" />}>
        <div className="flex gap-2 mb-4">
          <StatusSelector />
          <DateRangePicker />
        </div>
      </Suspense>

      <Suspense fallback={<CustomLoading />}>
        <ChallengeReviewContainer />
      </Suspense>
    </div>
  );
}
