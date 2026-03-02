import { PageHeader } from "@/components/page-header";
import { NotificationHistoryWithData } from "@/app/(private)/notification/_components/notification-history-with-data";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { DateRangePicker } from "@/components/date-range-picker";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { redirect } from "next/navigation";
import { formatKSTDate } from "@/lib/utils";
import CustomLoading from "@/components/custom-loading";

type Props = {
  searchParams: Promise<{
    page: string;
    startDate: string;
    endDate: string;
  }>;
};

export default async function Notification({ searchParams }: Props) {
  const { startDate, endDate, page } = await searchParams;

  if (!page || !startDate || !endDate) {
    const today = new Date();
    const thirtyDaysAgo = new Date(today);
    thirtyDaysAgo.setDate(today.getDate() - 30);

    const queryString = new URLSearchParams();
    queryString.set("page", page ?? "0");
    queryString.set("startDate", startDate ?? formatKSTDate(thirtyDaysAgo));
    queryString.set("endDate", endDate ?? formatKSTDate(today));
    redirect(`/notification?${queryString.toString()}`);
  }

  return (
    <div>
      <PageHeader
        title="푸시 알림 발송 내역"
        description="푸시 알림 발송 내역을 확인할 수 있습니다."
        button={
          <Link href="/notification/send">
            <Button>푸시 알림 발송</Button>
          </Link>
        }
      />
      <Suspense fallback={<Skeleton className="w-full h-10" />}>
        <DateRangePicker placeholder="기간을 선택하세요" className="mb-4" />
      </Suspense>

      <Suspense fallback={<CustomLoading />}>
        <NotificationHistoryWithData
          startDate={startDate}
          endDate={endDate}
          page={page}
        />
      </Suspense>
    </div>
  );
}
