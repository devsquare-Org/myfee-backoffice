import { PageHeader } from "@/components/page-header";
import BasicSection from "./_components/basic-section";
import ConditionSettingSection from "./_components/condition-setting-section";
import CertSettingSection from "./_components/cert-setting-section";
import WarningSettingSection from "./_components/warning-setting-section copy";
import { Button } from "@/components/ui/button";

export default function Page() {
  return (
    <div>
      <div>
        <PageHeader
          title="챌린지 등록"
          description="챌린지를 등록할 수 있습니다."
          button={<Button>등록하기</Button>}
        />
      </div>

      <div className="space-y-10 max-w-screen-lg">
        <BasicSection />

        <ConditionSettingSection />

        <CertSettingSection />

        <WarningSettingSection />
      </div>
    </div>
  );
}
