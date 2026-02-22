import {
  fetchUserChallengeHistory,
  fetchUserDetail,
  fetchUserPointHistory,
} from "@/app/(private)/users/_action/data";
import BasicInfo from "@/app/(private)/users/_components/basic-info";
import Challenge from "@/app/(private)/users/_components/challenge";

import Point from "@/app/(private)/users/_components/point";
import UpdatePointForm from "@/app/(private)/users/_components/update-point-form";
import { PageHeader } from "@/components/page-header";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type Props = {
  params: Promise<{
    userAlias: string;
  }>;
};

export default async function UserListPage({ params }: Props) {
  const { userAlias } = await params;

  async function fetchData() {
    const [userDetail, pointHistory, challengeHistory] = await Promise.all([
      fetchUserDetail({ userAlias }),
      fetchUserPointHistory({ userId: "1" }),
      fetchUserChallengeHistory({ userId: "1" }),
    ]);

    return { userDetail, pointHistory, challengeHistory };
  }

  const { userDetail, pointHistory, challengeHistory } = await fetchData();

  return (
    <div>
      <PageHeader
        title="유저 상세 정보"
        description="유저 상세 정보를 확인할 수 있습니다."
      />
      <Tabs defaultValue="detail">
        <TabsList>
          <TabsTrigger value="detail">기본 정보</TabsTrigger>
          <TabsTrigger value="point-manage">포인트 관리</TabsTrigger>
          <TabsTrigger value="point">포인트 내역</TabsTrigger>
          <TabsTrigger value="challenge">챌린지 내역</TabsTrigger>
        </TabsList>
        <TabsContent value="detail">
          <BasicInfo userDetail={userDetail.data} />
        </TabsContent>
        <TabsContent value="point-manage">
          <UpdatePointForm userId={userDetail.data.id.toString()} />
        </TabsContent>
        <TabsContent value="point">
          <Point pointHistory={pointHistory.data} />
        </TabsContent>
        <TabsContent value="challenge">
          <Challenge challengeHistory={challengeHistory.data} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
