"use client";

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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import z from "zod";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/lib/routes-config";

export default function ChallengeCreateForm() {
  const router = useRouter();
  const { execute, isExecuting } = useAction(challengeCreateAction, {
    onSuccess: ({ data }) => {
      toast.success(data.message);
      form.reset();
      router.push(ROUTES.CHALLENGE_LIST);
    },
    onError: ({ error: { serverError } }) => {
      toast.error(serverError?.message);
    },
  });

  const form = useForm<z.infer<typeof createChallengeParams>>({
    resolver: zodResolver(createChallengeParams),
    defaultValues: {
      title: "",
      startDate: "",
      endDate: "",
      description: "",
      hashtags: [],
      type: "TERM",
      termChallengePeriod: 0,
      termNumOfCert: 0,
      weeklyChallengePeriod: undefined,
      weeklyNumOfDays: undefined,
      limitsPerDay: 1,
      dailyNumOfCert: 1,
      rejoinable: true,
      isMidPoint: false,
      participationPoint: undefined,
      completionPoint: 0,
      warnings: [],
    },
  });

  function onSubmit() {
    execute(form.getValues());
  }

  return (
    <Tabs defaultValue="add">
      <TabsList>
        <TabsTrigger value="add">추가</TabsTrigger>
      </TabsList>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <TabsContent value="add">
            <div className="space-y-10 max-w-screen-lg pt-4">
              <BasicSection form={form} />

              <ConditionSettingSection form={form} />

              <CertSettingSection form={form} />

              <WarningSettingSection form={form} />

              <Button type="submit" disabled={isExecuting}>
                등록하기
              </Button>
            </div>
          </TabsContent>
        </form>
      </Form>
    </Tabs>
  );
}
