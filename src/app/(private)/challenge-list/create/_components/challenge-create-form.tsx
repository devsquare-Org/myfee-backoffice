import { CreateChallengeProvider } from "../lib/use-create";
import BasicSection from "./basic-section";
import ConditionSettingSection from "./condition-setting-section";
import CertSettingSection from "./cert-setting-section";
import WarningSettingSection from "./warning-setting-section";

export default function ChallengeCreateForm() {
  // hook-form 사용안하고 useAction 사용해서 직접 서버로 전송해서 validation 함수로 체크
  // 함수로 체크 시 에러 객체에 필드명과 에러메세지 추가
  // 모든 필드 메세지 null이면 제출 가능

  // validation 실패하면 에러 객체 반환(throw or return)
  // 에러 객체 예시: { field: "title", message: "제목은 필수 입력 항목입니다." }
  // 에러 객체 받아서 해당 필드에 에러메세지 띄우기

  // validation 성공하면 폼데이터에 제이슨 넣어서 서버로 전송

  return (
    <CreateChallengeProvider>
      <div className="space-y-10 max-w-screen-lg">
        <BasicSection />

        <ConditionSettingSection />

        <CertSettingSection />

        <WarningSettingSection />
      </div>
    </CreateChallengeProvider>
  );
}
