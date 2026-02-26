import BasicSection from "./basic-section";
import ConditionSettingSection from "./condition-setting-section";
import CertSettingSection from "./cert-setting-section";
import WarningSettingSection from "./warning-setting-section";
import { useAction } from "next-safe-action/hooks";
import { challengeCreateAction } from "@/app/(private)/challenge-list/_action/action";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { createChallengeParams } from "@/app/(private)/challenge-list/_action/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import z from "zod";
import { useEffect } from "react";

export default function ChallengeCreateForm() {
  const { execute, isExecuting } = useAction(challengeCreateAction);

  const form = useForm<z.infer<typeof createChallengeParams>>({
    resolver: zodResolver(createChallengeParams),
    defaultValues: {
      title: "",
      startDate: "",
      endDate: "",
      description: "",
      hashtags: [],
      rejoinable: false,
      isMidPoint: false,
      participationPoint: 0,
      completionPoint: 0,
      warnings: [],
    },
  });

  function onSubmit() {
    if (isExecuting) return;
    execute(form.getValues());
  }

  useEffect(() => {
    console.log("ERRORS", form.formState.errors);
    console.log(form.getValues());
  }, [form.formState.errors]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="space-y-10 max-w-screen-lg">
          <BasicSection form={form} />

          <ConditionSettingSection />

          <CertSettingSection form={form} />

          <WarningSettingSection form={form} />

          <Button type="submit" disabled={isExecuting}>
            등록하기
          </Button>
        </div>
      </form>
    </Form>
  );
}
