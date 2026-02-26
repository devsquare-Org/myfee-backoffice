import { CreateChallengeProvider } from "../lib/use-create";
import BasicSection from "./basic-section";
import ConditionSettingSection from "./condition-setting-section";
import CertSettingSection from "./cert-setting-section";
import WarningSettingSection from "./warning-setting-section";

export default function ChallengeCreateForm() {
  // hook-form과 zod, useAction 사용해서 서버액션으로 전송
  // zod refine 사용해서 validation 체크
  // zod refine 사용해서 에러 객체 반환
  // 모든 필드 validation 성공하면 서버 액션 호출

  return (
    <div className="space-y-10 max-w-screen-lg">
      <BasicSection />

      <ConditionSettingSection />

      <CertSettingSection />

      <WarningSettingSection />
    </div>
  );
}
