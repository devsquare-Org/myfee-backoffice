import { PageHeader } from "@/components/page-header";
import { Suspense } from "react";
import { Loader2 } from "lucide-react";
import { Dashboard } from "@/app/(private)/dashboard/_components/dashboard";
import { redirect } from "next/navigation";
import { formatLocalDate } from "@/lib/utils";

type Props = {
  searchParams: Promise<{
    startDate: string;
    endDate: string;
  }>;
};

export default async function Page({ searchParams }: Props) {
  const params = await searchParams;

  if (!params.startDate || !params.endDate) {
    const today = new Date();
    const thirtyDaysAgo = new Date(today);
    thirtyDaysAgo.setDate(today.getDate() - 30);

    const endDate = params.endDate ?? formatLocalDate(today);
    const startDate = params.startDate ?? formatLocalDate(thirtyDaysAgo);

    const queryString = new URLSearchParams();
    queryString.set("startDate", startDate);
    queryString.set("endDate", endDate);

    redirect(`/dashboard?${queryString.toString()}`);
  }

  return (
    <div>
      <PageHeader
        title="대시보드"
        description="마이피 앱 데이터를 확인할 수 있습니다."
      />
      <Suspense
        fallback={
          <div className="flex justify-center items-center h-200">
            <Loader2 size={40} className="animate-spin" />
          </div>
        }
      >
        <Dashboard startDate={params.startDate} endDate={params.endDate} />
      </Suspense>
    </div>
  );
}
