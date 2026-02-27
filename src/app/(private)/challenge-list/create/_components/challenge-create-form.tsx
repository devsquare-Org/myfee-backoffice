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
      rejoinable: true,
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
              <ConditionSettingSection />
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
