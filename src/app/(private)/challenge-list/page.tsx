import { fetchChallengeList } from "@/app/(private)/challenge-list/_action/data";
import ChallengeList from "@/app/(private)/challenge-list/_components/challenge-list";
import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function Page() {
  const { data } = await fetchChallengeList();
  return (
    <div>
      <div>
        <PageHeader
          title="챌린지 목록"
          description="챌린지 목록을 확인할 수 있습니다."
          button={
            <Link href="">
              <Button>챌린지 추가</Button>
            </Link>
          }
        />
      </div>

      <ChallengeList challengeList={data} />
    </div>
  );
}
