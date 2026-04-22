import ChallengeDetailEdit from "@/app/(private)/challenge-list/[challengeId]/_components/challenge-detail-edit";
import ChallengeDetailInfo from "@/app/(private)/challenge-list/[challengeId]/_components/challenge-detail-info";
import { getChallengeDetail } from "@/app/(private)/challenge-list/_action/data";
import { PageHeader } from "@/components/page-header";

type Props = {
  params: Promise<{
    challengeId: string;
  }>;
};

export default async function ChallengeDetailPage({ params }: Props) {
  const { challengeId } = await params;
  const { data } = await getChallengeDetail({ id: challengeId });

  return (
    <div>
      <PageHeader
        title="챌린지 상세 정보"
        description="챌린지 정보를 확인하고 일부 정보를 수정할 수 있습니다."
      />
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2">
          <ChallengeDetailEdit data={data} />
        </div>
        <div className="xl:col-span-1">
          <ChallengeDetailInfo data={data} />
        </div>
      </div>
    </div>
  );
}
