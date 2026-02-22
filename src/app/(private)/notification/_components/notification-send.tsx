"use client";

import { useAction } from "next-safe-action/hooks";
import { sendNotificationAction } from "@/app/(private)/notification/_action/action";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import * as z from "zod";
import { CustomAlert } from "@/components/custom-alert";
import SendDialog from "@/app/(private)/notification/_components/send-dialog";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import CustomFormLabel from "@/components/custom-form-label";
import { Card } from "@/components/ui/card";
import { sendNotificationParams } from "@/app/(private)/notification/_action/schema";

export default function NotificationSend() {
  const [isSubmit, setIsSubmit] = useState(false);
  const submitRef = useRef<HTMLButtonElement>(null);
  const { execute, isExecuting } = useAction(sendNotificationAction, {
    onSuccess: ({ data }) => {
      toast.success(data.message);
      form.reset();
      setIsSubmit(false);
    },
    onError: ({ error: { serverError } }) => {
      toast.error(serverError?.message);
    },
  });

  const form = useForm<z.infer<typeof sendNotificationParams>>({
    resolver: zodResolver(sendNotificationParams),
    mode: "onChange",
    defaultValues: {
      title: "",
      content: "",
      isAd: false,
    },
  });

  function onSubmit() {
    if (isSubmit) execute(form.getValues());
  }

  async function handleValidate() {
    return await form.trigger();
  }

  useEffect(() => {
    submitRef.current?.click();
    setIsSubmit(false);
  }, [isSubmit]);

  return (
    <div className="grid grid-cols-4">
      <Card className="col-span-3 max-w-xl">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <div className="mb-4">
                  <FormItem>
                    <CustomFormLabel error={form.formState.errors.title}>
                      제목
                    </CustomFormLabel>

                    <FormControl>
                      <Input
                        {...field}
                        placeholder="3글자 이상 20글자 이하로 입력해주세요."
                      />
                    </FormControl>
                  </FormItem>
                </div>
              )}
            />

            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <div className="mb-4">
                  <FormItem>
                    <CustomFormLabel error={form.formState.errors.content}>
                      내용
                    </CustomFormLabel>

                    <FormControl>
                      <Input
                        {...field}
                        placeholder="5글자 이상 40글자 이하로 입력해주세요."
                      />
                    </FormControl>
                  </FormItem>
                </div>
              )}
            />

            <FormField
              control={form.control}
              name="isAd"
              render={({ field }) => (
                <FormItem className="mb-6">
                  <FormLabel>광고 알림 여부</FormLabel>
                  <FormLabel className="border bg-background px-3 py-1 h-9 rounded-md dark:bg-input/30 flex items-center justify-between gap-2 cursor-pointer">
                    <FormLabel className="text-xs text-muted-foreground cursor-pointer">
                      이 옵션을 체크하면 광고 알림으로 발송됩니다.
                    </FormLabel>
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormLabel>
                </FormItem>
              )}
            />

            <Button
              ref={submitRef}
              className="sr-only"
              variant="default"
              type="submit"
              disabled={!form.formState.isValid || isExecuting}
            >
              push notification
            </Button>
          </form>
        </Form>
        <SendDialog
          loading={isExecuting}
          disabled={!form.formState.isValid}
          setIsSubmit={setIsSubmit}
          title={form.getValues("title")}
          content={form.getValues("content")}
          isAd={form.getValues("isAd")}
          onValidate={handleValidate}
        />
      </Card>
      <CustomAlert
        className="mb-4 col-span-1"
        type="destructive"
        title="푸시 알림 발송 주의사항"
        description={
          <ul className="flex flex-col gap-1 mt-2 list-disc list-outside">
            <li>푸시 알림은 즉시 발송됩니다.</li>
            <li>전체 유저를 대상으로 발송됩니다.</li>
            <li>알림 발송 후 수정이 불가능합니다.</li>
            <li>알림 제목은 3글자 이상 20글자 이하로 입력해주세요.</li>
            <li>알림 내용은 5글자 이상 40글자 이하로 입력해주세요.</li>
            <li>
              광고 알림 여부를 체크하면 광고 수신 동의한 유저에게만 발송됩니다.
            </li>
          </ul>
        }
      />
    </div>
  );
}
