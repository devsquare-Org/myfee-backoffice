"use client";

import { useAction } from "next-safe-action/hooks";
import { updateUserPointAction } from "@/app/(private)/users/_action/action";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import CustomFormLabel from "@/components/custom-form-label";
import { useEffect, useRef, useState } from "react";
import { updateUserPointParams } from "@/app/(private)/users/_action/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { useForm } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import PointDialog from "@/app/(private)/users/_components/point-dialog";

type Props = {
  userId?: string;
  className?: string;
};
export default function UpdatePointForm({ className, userId }: Props) {
  const [isSubmit, setIsSubmit] = useState(false);
  const submitRef = useRef<HTMLButtonElement>(null);
  const { execute, isExecuting } = useAction(updateUserPointAction, {
    onSuccess: ({ data }) => {
      toast.success(data.message);
      form.reset();
      setIsSubmit(false);
    },
    onError: ({ error: { serverError } }) => {
      toast.error(serverError?.message);
    },
  });

  const form = useForm<z.infer<typeof updateUserPointParams>>({
    resolver: zodResolver(updateUserPointParams),
    mode: "onChange",
    defaultValues: {
      userId: userId || "",
      reason: "",
      points: undefined,
      type: undefined,
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
    <Card className={cn(className, "mb-6 max-w-xl")}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <div className="mb-4">
                <FormItem>
                  <CustomFormLabel error={form.formState.errors.type}>
                    포인트 변경 유형
                  </CustomFormLabel>

                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      value={field.value || ""}
                    >
                      <SelectTrigger className="w-full bg-background">
                        <SelectValue placeholder="유형을 선택해주세요." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem value="add">지급</SelectItem>
                          <SelectItem value="subtract">차감</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormControl>
                </FormItem>
              </div>
            )}
          />
          <FormField
            control={form.control}
            name="points"
            render={({ field }) => (
              <div className="mb-4">
                <FormItem>
                  <CustomFormLabel error={form.formState.errors.points}>
                    포인트
                  </CustomFormLabel>

                  <FormControl>
                    <Input
                      className="bg-background"
                      type="number"
                      value={field.value || ""}
                      onChange={(e) =>
                        field.onChange(
                          e.target.value === "" ? 0 : Number(e.target.value)
                        )
                      }
                      placeholder="포인트를 숫자로 입력해주세요."
                    />
                  </FormControl>
                </FormItem>
              </div>
            )}
          />

          <FormField
            control={form.control}
            name="reason"
            render={({ field }) => (
              <div className="mb-4">
                <FormItem>
                  <CustomFormLabel error={form.formState.errors.reason}>
                    사유
                  </CustomFormLabel>

                  <FormControl>
                    <Input
                      {...field}
                      value={field.value || ""}
                      className="bg-background"
                      placeholder="사유를 입력해주세요."
                    />
                  </FormControl>
                </FormItem>
              </div>
            )}
          />
          <Button
            ref={submitRef}
            className="sr-only"
            variant="default"
            type="submit"
            disabled={!form.formState.isValid || isExecuting}
          >
            point update
          </Button>
        </form>
      </Form>
      <PointDialog
        loading={isExecuting}
        disabled={!form.formState.isValid}
        setIsSubmit={setIsSubmit}
        point={form.getValues("points")}
        reason={form.getValues("reason")}
        type={form.getValues("type")}
        onValidate={handleValidate}
      />
    </Card>
  );
}
