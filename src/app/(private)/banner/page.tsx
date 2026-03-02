import { BannerListWithData } from "@/app/(private)/banner/_components/banner-list-with-data";
import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ROUTES } from "@/lib/routes-config";
import { Suspense } from "react";
import CustomLoading from "@/components/custom-loading";

export default async function BannerPage() {
  return (
    <div>
      <PageHeader
        title="배너 관리"
        description="마이피 앱에 노출되는 배너 관리 페이지입니다."
        button={
          <Link href={ROUTES.BANNER_CREATE}>
            <Button>배너 추가</Button>
          </Link>
        }
      />
      <Suspense fallback={<CustomLoading />}>
        <BannerListWithData />
      </Suspense>
    </div>
  );
}
