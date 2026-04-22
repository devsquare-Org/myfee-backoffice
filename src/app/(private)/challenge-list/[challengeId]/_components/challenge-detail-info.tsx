import { ChallengeDetailResponse } from "@/app/(private)/challenge-list/_action/type";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";

type Props = {
  data: ChallengeDetailResponse;
};

export default function ChallengeDetailInfo({ data }: Props) {
  const typeLabel = data.type === "TERM" ? "기간 타입" : "주간 타입";
  const termUnit = data.type === "TERM" ? "일" : "주";
  const rejoinLabel = data.rejoinAllowYn === "Y" ? "가능" : "불가";
  const participantLimitLabel =
    data.participantLimitYn === "Y"
      ? `${data.maxParticipantCount.toLocaleString()}명`
      : "제한 없음";
  const midPointLabel =
    data.midPointYn === "Y"
      ? `${(data.midPoint ?? 0).toLocaleString()}P`
      : "미지급";

  return (
    <div className="space-y-4">
      <Card>
        <Label className="text-lg font-semibold mb-4">챌린지 정보</Label>
        <div className="space-y-3 text-xs">
          <InfoRow label="챌린지 ID" value={`#${data.challengeId}`} />
          <InfoRow label="챌린지 타입" value={typeLabel} />
          <InfoRow
            label="게시 기간"
            value={`${data.startDate} ~ ${data.endDate}`}
          />
          <InfoRow
            label="챌린지 기간"
            value={`${data.term.toLocaleString()}${termUnit}`}
          />
          <InfoRow label="재참여" value={rejoinLabel} />
          <InfoRow label="참여자 제한" value={participantLimitLabel} />
        </div>
      </Card>

      <Card>
        <Label className="text-lg font-semibold mb-4">인증 조건</Label>
        <div className="space-y-3 text-xs">
          <InfoRow
            label="필요 인증 횟수"
            value={`${data.requiredCertificationCount.toLocaleString()}회`}
          />
          <InfoRow
            label="하루 인증 횟수"
            value={`${data.dailyCertificationCount.toLocaleString()}회`}
          />
          {data.certificationGuideUrl && (
            <div>
              <p className="text-muted-foreground mb-2">인증 가이드 이미지</p>
              <div className="relative w-full overflow-hidden rounded-md border">
                <Image
                  src={data.certificationGuideUrl}
                  alt="인증 가이드"
                  width={0}
                  height={0}
                  sizes="100vw"
                  className="w-full h-auto"
                />
              </div>
            </div>
          )}
        </div>
      </Card>

      <Card>
        <Label className="text-lg font-semibold mb-4">포인트</Label>
        <div className="space-y-3 text-xs">
          <InfoRow
            label="참여 포인트"
            value={`${data.participationPoint.toLocaleString()}P`}
          />
          <InfoRow label="중간 포인트" value={midPointLabel} />
          {data.midPointYn === "Y" && (
            <>
              <InfoRow
                label="중간 지급 기간"
                value={`${data.midPointPeriodDuration.toLocaleString()}${termUnit}`}
              />
              <InfoRow
                label="중간 지급 인증 횟수"
                value={`${data.midPointRequiredSatisfactionCount.toLocaleString()}회`}
              />
            </>
          )}
          <InfoRow
            label="완주 포인트"
            value={`${data.completionPoint.toLocaleString()}P`}
          />
        </div>
      </Card>

      {data.notices.length > 0 && (
        <Card>
          <Label className="text-lg font-semibold mb-4">주의사항</Label>
          <div className="space-y-4 text-xs">
            {data.notices.map((notice, index) => (
              <div key={`${notice.paragraph}-${index}`} className="space-y-2">
                {index > 0 && <Separator className="my-2" />}
                <p className="font-semibold">
                  단락 {notice.paragraph}. {notice.title}
                </p>
                {notice.subTitle && (
                  <p className="text-muted-foreground">{notice.subTitle}</p>
                )}
                <ul className="space-y-1 list-disc list-outside pl-4">
                  {notice.contents
                    .slice()
                    .sort((a, b) => a.order - b.order)
                    .map((item) => (
                      <li key={item.order}>{item.content}</li>
                    ))}
                </ul>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start justify-between gap-4">
      <span className="text-muted-foreground shrink-0">{label}</span>
      <span className="font-medium text-right break-all">{value}</span>
    </div>
  );
}
