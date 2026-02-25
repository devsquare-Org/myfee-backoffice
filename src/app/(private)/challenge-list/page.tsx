import ChallengeList from "@/app/(private)/challenge-list/_components/challenge-list";
import CustomLoading from "@/components/custom-loading";
import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/lib/routes-config";
import Link from "next/link";
import { Suspense } from "react";

export default async function Page() {
  return (
    <div>
      <div>
        <PageHeader
          title="챌린지 목록"
          description="챌린지 목록을 확인할 수 있습니다."
          button={
            <Link href={ROUTES.CHALLENGE_CREATE}>
              <Button>챌린지 등록</Button>
            </Link>
          }
        />
      </div>

      <Suspense fallback={<CustomLoading />}>
        <ChallengeList />
      </Suspense>
    </div>
  );
}
