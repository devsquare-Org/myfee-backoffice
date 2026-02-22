import { PaginationControls } from "@/components/pagination-controls";

type Props = {
  length: number;
  page: number;
  pageSize: number;
  totalItems: number;
};
export default function PaginationWrapper({
  length,
  page,
  pageSize,
  totalItems,
}: Props) {
  return (
    <>
      {length > 10 ? (
        <PaginationControls
          pageSize={pageSize}
          totalItems={totalItems}
        />
      ) : (
        <p className="h-13 text-xs text-muted-foreground font-medium flex items-center justify-center">
          모든 인증 목록을 불러왔습니다.
        </p>
      )}
    </>
  );
}
