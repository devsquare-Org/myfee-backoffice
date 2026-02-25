import { ReviewList } from "@/app/(private)/challenge-review/_components/review-list";
import { PaginationControls } from "@/components/pagination-controls";
import { ReviewList as ReviewListType } from "@/app/(private)/challenge-review/_action/type";

type Props = {
  reviewList: ReviewListType | null;
  selectedItemId: string;
};

export function ReviewListWrapper({ reviewList, selectedItemId }: Props) {
  if (!reviewList) return null;

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-auto">
        <ReviewList reviewList={reviewList} selectedItemId={selectedItemId} />
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
