"use client";

import { PageHeader } from "@/components/page-header";
import ChallengeCreateForm from "./_components/challenge-create-form";

export default function Page() {
  return (
    <div>
      <div>
        <PageHeader
          title="챌린지 등록"
          description="챌린지를 등록할 수 있습니다."
        />
      </div>

      <ChallengeCreateForm />
    </div>
  );
}
