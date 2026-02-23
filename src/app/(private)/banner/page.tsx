import BannerList from "@/app/(private)/banner/_components/banner-list";
import { PageHeader } from "@/components/page-header";
import { fetchBannerList } from "@/app/(private)/banner/_action/data";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ROUTES } from "@/lib/routes-config";

export default async function BannerPage() {
  const { data } = await fetchBannerList();

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
      <BannerList bannerList={data} />
    </div>
  );
}
